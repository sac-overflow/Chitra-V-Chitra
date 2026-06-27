import { motion } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { GlowCard } from "./GlowCard";
import { NeonButton } from "./NeonButton";
import { StarField } from "./StarField";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(formData.phone.trim()) || cleanPhone.length < 10 || cleanPhone.length > 15) {
      toast.error("Please enter a valid phone number (10 to 15 digits).");
      return;
    }

    // Budget validation
    if (formData.budget !== "") {
      const budgetNum = Number(formData.budget);
      if (!isNaN(budgetNum) && budgetNum <= 0) {
        toast.error("Budget must be a positive number greater than 0.");
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3001/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          action: "contact",
        }),
      });

      if (response.ok) {
        toast.success("🎉 Enquiry sent! Our team will get back to you shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          budget: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      color: "#FF0F8F",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hello@chitravichitra.events",
      color: "#8B2BFF",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      color: "#00D4FF",
    },
  ];

  const socialLinks = [
    { icon: Instagram, color: "#D91CFF", label: "Instagram" },
    { icon: Facebook, color: "#00D4FF", label: "Facebook" },
    { icon: Twitter, color: "#8B2BFF", label: "Twitter" },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <StarField />

      {/* Hero Section */}
      <section className="px-6 mb-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              fontStyle: "italic",
            }}
          >
            Let's Create Something
            <br />
            Unforgettable
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            Tell us about your event, and we'll bring your vision to life
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <GlowCard className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent">
                Send Us an Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Event Type</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="concert">Concert/Live Show</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="party">Private Party</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select budget</option>
                      <option value="5-10L">₹5-10 Lakhs</option>
                      <option value="10-25L">₹10-25 Lakhs</option>
                      <option value="25-50L">₹25-50 Lakhs</option>
                      <option value="50L+">₹50 Lakhs+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your event vision..."
                  />
                </div>

                <div className="pt-4">
                  <NeonButton variant="primary" size="lg" disabled={isSubmitting}>
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </NeonButton>
                </div>
              </form>
            </GlowCard>
          </motion.div>

          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <GlowCard className="p-8">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        background: `${info.color}15`,
                        border: `1px solid ${info.color}30`,
                      }}
                    >
                      <info.icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
                      <div className="font-semibold">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>

            {/* Social Media */}
            <GlowCard className="p-8">
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.button
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl transition-all"
                    style={{
                      background: `${social.color}15`,
                      border: `1px solid ${social.color}30`,
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" style={{ color: social.color }} />
                  </motion.button>
                ))}
              </div>
            </GlowCard>

            {/* WhatsApp Contact */}
            <GlowCard className="p-8">
              <h3 className="text-xl font-bold mb-4">Chat on WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-6">Need quick answers? Message us directly.</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                <MessageCircle className="w-5 h-5" />
                Connect via WhatsApp
              </a>
            </GlowCard>

            {/* Location Cards */}
            <div className="grid grid-cols-1 gap-6">
              <a href="https://maps.google.com/?q=Bandra+Kurla+Complex,+Mumbai" target="_blank" rel="noopener noreferrer" className="block outline-none">
                <GlowCard className="p-6 transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-[#FF0F8F]15 border border-[#FF0F8F]30">
                      <MapPin className="w-5 h-5 text-[#FF0F8F]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Mumbai Head Office</h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-16">
                    Bandra Kurla Complex (BKC),<br/>Mumbai, Maharashtra 400051
                  </p>
                </GlowCard>
              </a>

              <a href="https://maps.google.com/?q=Connaught+Place,+New+Delhi" target="_blank" rel="noopener noreferrer" className="block outline-none">
                <GlowCard className="p-6 transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-[#00D4FF]15 border border-[#00D4FF]30">
                      <MapPin className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Delhi Branch</h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-16">
                    Connaught Place,<br/>New Delhi, Delhi 110001
                  </p>
                </GlowCard>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
