import { motion } from "motion/react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from "lucide-react";
import { useState } from "react";
import { GlowCard } from "./GlowCard";
import { NeonButton } from "./NeonButton";
import { StarField } from "./StarField";
import { Slider } from "./ui/slider";

const BUDGET_TIERS = [
  "Under ₹5 Lakhs",
  "₹5–10 Lakhs",
  "₹10–25 Lakhs",
  "₹25–50 Lakhs",
  "₹50 Lakhs+",
];

export function ContactPage() {
  const [budgetIndex, setBudgetIndex] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you shortly.");
    setBudgetIndex(2);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 98765 43210", color: "#FF0F8F" },
    { icon: Mail, label: "Email", value: "hello@chitravichitra.events", color: "#8B2BFF" },
    { icon: MapPin, label: "Location", value: "Mumbai, India", color: "#00D4FF" },
  ];

  const socialLinks = [
    { icon: Instagram, color: "#D91CFF", label: "Instagram" },
    { icon: Facebook, color: "#00D4FF", label: "Facebook" },
    { icon: Twitter, color: "#8B2BFF", label: "Twitter" },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <StarField />

      <section className="px-4 sm:px-6 mb-24">
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

      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8"
          >
            <GlowCard className="p-8 md:p-10" hoverGlow={false}>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent">
                Send Us an Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name
                    </label>
                    <input
                      id="name"
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
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      id="email"
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
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
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
                    <label htmlFor="eventType" className="block text-sm font-semibold mb-2">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="concert">Concert / Live Show</option>
                      <option value="exhibition">Exhibition</option>
                      <option value="party">Private Party</option>
                      <option value="launch">Product Launch</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold mb-2">
                      Event Date
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold mb-2">
                      Budget Range
                    </label>
                    <p
                      id="budget"
                      className="mb-4 text-sm font-semibold bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent"
                    >
                      {BUDGET_TIERS[budgetIndex]}
                    </p>
                    <Slider
                      value={[budgetIndex]}
                      onValueChange={(v) => setBudgetIndex(v[0] ?? 0)}
                      min={0}
                      max={BUDGET_TIERS.length - 1}
                      step={1}
                      className="[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[#FF0F8F] [&_[data-slot=slider-range]]:to-[#8B2BFF] [&_[data-slot=slider-thumb]]:border-[#FF0F8F] [&_[data-slot=slider-thumb]]:shadow-[0_0_12px_rgba(255,15,143,0.5)]"
                      aria-labelledby="budget"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-wide">
                      <span>Low</span>
                      <span>Premium</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your event vision..."
                  />
                </div>

                <div className="pt-2">
                  <NeonButton variant="primary" size="lg" type="submit">
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </NeonButton>
                </div>
              </form>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <GlowCard className="p-8" hoverGlow={false}>
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg shrink-0"
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

            <GlowCard className="p-8" hoverGlow={false}>
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.button
                    key={social.label}
                    type="button"
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

            <GlowCard className="p-0 overflow-hidden min-h-[200px]" hoverGlow={false}>
              <div
                className="relative h-full min-h-[220px] flex items-center justify-center p-8"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(0,212,255,0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,15,143,0.12), transparent 50%), rgba(11,13,18,0.5)",
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-40"
                  viewBox="0 0 200 200"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F5FF" />
                      <stop offset="50%" stopColor="#8B2BFF" />
                      <stop offset="100%" stopColor="#FF0F8F" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="90" r="40" fill="none" stroke="url(#mapGrad)" strokeWidth="1" />
                  <circle cx="100" cy="90" r="8" fill="#FF0F8F" opacity="0.8" />
                  {[0, 45, 90, 135].map((deg) => (
                    <line
                      key={deg}
                      x1="100"
                      y1="90"
                      x2={100 + 50 * Math.cos((deg * Math.PI) / 180)}
                      y2={90 + 50 * Math.sin((deg * Math.PI) / 180)}
                      stroke="url(#mapGrad)"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  ))}
                </svg>
                <div className="relative text-center z-10">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-[#00D4FF]" />
                  <p className="text-sm text-muted-foreground">
                    Serving events across
                    <br />
                    <span className="font-semibold text-foreground">Mumbai & Beyond</span>
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
