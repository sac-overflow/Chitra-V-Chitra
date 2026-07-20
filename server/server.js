require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyIdHere',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourKeySecretHere',
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency || 'INR',
      receipt: receipt || `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YourKeySecretHere')
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database logic here if needed
    res.json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid Signature' });
  }
});

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const enquiriesCsvPath = path.join(__dirname, 'enquiries.csv');

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEnquiryEmail(enquiryData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ SMTP_USER or SMTP_PASS not set in environment. Skipping email dispatch.');
    return;
  }

  const { name, email, phone, eventType, eventDate, budget, message, service, packageType, selectedPackages, customizations, action } = enquiryData;

  const mailOptions = {
    from: `"Chitra V Chitra Enquiry" <${process.env.SMTP_USER}>`,
    to: 'mahahitu080104@gmail.com',
    subject: `New Enquiry Received from ${name}`,
    text: `New Enquiry Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Event Type: ${eventType || 'N/A'}
Event Date: ${eventDate || 'N/A'}
Budget: ${budget || 'N/A'}
Service: ${service || 'N/A'}
Package Type: ${packageType || 'N/A'}
Selected Packages: ${selectedPackages || 'N/A'}
Customizations: ${customizations || 'N/A'}
Action: ${action || 'N/A'}
Message: ${message}
`,
    html: `
      <h2>New Customer Enquiry</h2>
      <table border="1" cellpadding="5" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Event Type</strong></td><td>${eventType || 'N/A'}</td></tr>
        <tr><td><strong>Event Date</strong></td><td>${eventDate || 'N/A'}</td></tr>
        <tr><td><strong>Budget</strong></td><td>${budget || 'N/A'}</td></tr>
        <tr><td><strong>Service</strong></td><td>${service || 'N/A'}</td></tr>
        <tr><td><strong>Package Type</strong></td><td>${packageType || 'N/A'}</td></tr>
        <tr><td><strong>Selected Packages</strong></td><td>${selectedPackages || 'N/A'}</td></tr>
        <tr><td><strong>Customizations</strong></td><td>${customizations || 'N/A'}</td></tr>
        <tr><td><strong>Action</strong></td><td>${action || 'N/A'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message}</td></tr>
      </table>
    `,
    attachments: []
  };

  if (fs.existsSync(enquiriesCsvPath)) {
    mailOptions.attachments.push({
      filename: 'enquiries.csv',
      path: enquiriesCsvPath
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Enquiry email sent successfully to mahahitu080104@gmail.com');
  } catch (error) {
    console.error('❌ Failed to send enquiry email:', error);
  }
}

app.post('/api/enquiry', (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, budget, message, service, packageType, selectedPackages, customizations, action } = req.body;
    
    // Server-side validations for edge cases
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Email is required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: "Phone number is required." });
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(phone.trim()) || cleanPhone.length < 10 || cleanPhone.length > 15) {
      return res.status(400).json({ error: "Please enter a valid phone number (10 to 15 digits)." });
    }
    if (budget !== undefined && budget !== null && budget !== "") {
      const budgetNum = Number(budget);
      if (isNaN(budgetNum) || budgetNum < 1000 || budgetNum > 100000000) {
        return res.status(400).json({ error: "Budget must be between ₹1,000 and ₹10,00,00,000." });
      }
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const timestamp = new Date().toISOString();
    
    // Helper to escape values for CSV format
    const csvEscape = (val) => {
      if (val === null || val === undefined) return '""';
      let stringVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return `"${stringVal.replace(/"/g, '""')}"`;
    };

    const row = [
      timestamp,
      name,
      email,
      phone,
      eventType,
      eventDate,
      budget,
      message,
      service,
      packageType,
      selectedPackages,
      customizations,
      action
    ].map(csvEscape).join(',') + '\n';

    const fileExists = fs.existsSync(enquiriesCsvPath);
    if (!fileExists) {
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Event Type',
        'Event Date',
        'Budget',
        'Message',
        'Service',
        'Package Type',
        'Selected Packages',
        'Customizations',
        'Action'
      ].join(',') + '\n';
      fs.writeFileSync(enquiriesCsvPath, headers, 'utf8');
    }

    fs.appendFileSync(enquiriesCsvPath, row, 'utf8');

    // Trigger email sending asynchronously
    sendEnquiryEmail(req.body);

    // Styled console notification for the admin
    console.log('\n=============================================');
    console.log('🚨 NEW CUSTOMER INQUIRY RECEIVED 🚨');
    console.log(`👤 Name: ${name || 'N/A'}`);
    console.log(`📧 Email: ${email || 'N/A'}`);
    console.log(`📞 Phone: ${phone || 'N/A'}`);
    console.log(`💰 Budget: ${budget || 'N/A'}`);
    console.log(`📁 Service/Event: ${service || eventType || 'N/A'}`);
    console.log(`💬 Message: ${message || 'N/A'}`);
    console.log('=============================================\n');

    res.status(200).json({ success: true, message: 'Enquiry saved successfully' });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
});

app.get('/api/enquiries', (req, res) => {
  try {
    if (!fs.existsSync(enquiriesCsvPath)) {
      return res.status(404).json({ error: 'No enquiries logged yet.' });
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=enquiries.csv');
    fs.createReadStream(enquiriesCsvPath).pipe(res);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Razorpay Server listening on port ${PORT}`);
});
