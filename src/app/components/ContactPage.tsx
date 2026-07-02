import { motion } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Facebook, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { GlowCard } from "./GlowCard";
import { NeonButton } from "./NeonButton";
import { StarField } from "./StarField";
import { toast } from "sonner";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} style={props.style}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
      if (isNaN(budgetNum) || budgetNum < 1000 || budgetNum > 100000000) {
        toast.error("Budget must be between ₹1,000 and ₹10,00,00,000 (10 Crores).");
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
      value: "+91 7702640801",
      color: "#FF0F8F",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@chitravichitraevents.com",
      color: "#8B2BFF",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Secunderabad, India",
      color: "#00D4FF",
    },
  ];

  const socialLinks = [
    { icon: Instagram, color: "#D91CFF", label: "Instagram" },
    { icon: Facebook, color: "#00D4FF", label: "Facebook" },
    { icon: XIcon, color: "#8B2BFF", label: "X" },
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
                      placeholder="+91 7702640801"
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
                    <label className="block text-sm font-semibold mb-2">Budget (₹)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      min={1000}
                      max={100000000}
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter target budget"
                    />
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
                      {info.label === "Location" ? (
                        <a
                          href="https://maps.app.goo.gl/H38iuQenAsi1FQ3K8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline"
                          style={{ color: info.color }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-semibold">{info.value}</div>
                      )}
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
                href="https://wa.me/917702640801"
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
              <a href="https://maps.app.goo.gl/H38iuQenAsi1FQ3K8" target="_blank" rel="noopener noreferrer" className="block outline-none">
                <GlowCard className="p-6 transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-[#FF0F8F]15 border border-[#FF0F8F]30">
                      <MapPin className="w-5 h-5 text-[#FF0F8F]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Corporate Office</h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-16">
                    Plot No. 777, H. No.37– 18/38,<br/>
                    Defence Colony, Sainikpuri,<br/>
                    Secunderabad - 500094
                  </p>
                </GlowCard>
              </a>

              <GlowCard className="p-6 opacity-75">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-lg bg-[#8B2BFF]15 border border-[#8B2BFF]30">
                    <MapPin className="w-5 h-5 text-[#8B2BFF]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Expansion</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-16">
                  Mumbai and other branch offices are to be updated soon.
                </p>
              </GlowCard>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
