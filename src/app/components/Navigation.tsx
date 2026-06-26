import { Moon, Sun, Download, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import cvcLogo from "@/imports/Screenshot_2026-06-23_085918.png";

function downloadBrochure() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chitra Vichitra Events — Brochure</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, sans-serif; background: #050505; color: #fff; padding: 48px; max-width: 800px; margin: 0 auto; }
    h1 { font-family: Orbitron, sans-serif; font-size: 2.2rem; background: linear-gradient(135deg,#FF0F8F,#8B2BFF,#00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px; }
    .tagline { color: #FFD500; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
    .sub { color: rgba(255,255,255,0.4); font-size: 0.78rem; margin-bottom: 36px; }
    .divider { height: 2px; background: linear-gradient(90deg,#FF0F8F,#8B2BFF,#00D4FF); border-radius: 2px; margin: 28px 0; }
    h2 { font-family: Orbitron, sans-serif; font-size: 1rem; color: #8B2BFF; margin-bottom: 18px; letter-spacing: 1px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
    .card { border: 1px solid rgba(139,43,255,0.3); border-radius: 10px; padding: 18px; background: rgba(139,43,255,0.05); }
    .card-title { color: #FF0F8F; font-weight: 700; font-size: 0.9rem; margin-bottom: 3px; }
    .card-price { color: #FFD500; font-size: 0.72rem; font-weight: 600; margin-bottom: 7px; }
    .card-desc { color: rgba(255,255,255,0.58); font-size: 0.75rem; line-height: 1.6; }
    .contact-row { display: flex; gap: 8px; align-items: center; color: rgba(255,255,255,0.7); font-size: 0.83rem; margin-bottom: 10px; }
    .contact-label { color: #00D4FF; font-weight: 600; min-width: 80px; }
    .footer { color: rgba(255,255,255,0.25); font-size: 0.68rem; text-align: center; margin-top: 44px; }
  </style>
</head>
<body>
  <h1>CHITRA VICHITRA EVENTS</h1>
  <div class="tagline">We Don't Plan Events. We Create Experiences.</div>
  <div class="sub">Premium Event Management · Mumbai, India</div>
  <div class="divider"></div>
  <h2>OUR SERVICES</h2>
  <div class="grid">
    <div class="card"><div class="card-title">Wedding Planning</div><div class="card-price">Starting ₹5,00,000</div><div class="card-desc">Full packages — Engagement, Mehndi, Haldi, Sangeet, Ceremony & Reception. Fully customizable.</div></div>
    <div class="card"><div class="card-title">Corporate Events</div><div class="card-price">Starting ₹1,50,000</div><div class="card-desc">Conferences, product launches, team building, galas & awards nights.</div></div>
    <div class="card"><div class="card-title">Concerts & Live Shows</div><div class="card-price">Starting ₹3,00,000</div><div class="card-desc">Full-scale production — stage, sound, lighting, artist coordination & security.</div></div>
    <div class="card"><div class="card-title">Private Parties</div><div class="card-price">Starting ₹80,000</div><div class="card-desc">Birthdays, anniversaries, themed celebrations with personalized decor & entertainment.</div></div>
    <div class="card"><div class="card-title">Exhibitions</div><div class="card-price">Starting ₹1,00,000</div><div class="card-desc">Art shows, trade fairs, product displays & cultural showcases with premium booth design.</div></div>
    <div class="card"><div class="card-title">Stage Design</div><div class="card-price">Starting ₹80,000</div><div class="card-desc">Custom stage architecture, lighting design, backdrops & immersive visual environments.</div></div>
  </div>
  <div class="divider"></div>
  <h2>ONBOARDING PROCESS</h2>
  <p style="color:rgba(255,255,255,0.7);font-size:0.83rem;line-height:2;margin-bottom:28px;">
    1. <strong style="color:#FF0F8F">Free Consultation</strong> — Share your vision with our planning team<br/>
    2. <strong style="color:#8B2BFF">Custom Proposal</strong> — Receive a detailed plan within 48 hours<br/>
    3. <strong style="color:#00D4FF">Onboarding Fee ₹299</strong> — Lock your date & begin planning<br/>
    4. <strong style="color:#FFD500">Flawless Execution</strong> — We handle every detail to perfection
  </p>
  <div class="divider"></div>
  <h2>CONTACT US</h2>
  <div class="contact-row"><span class="contact-label">Phone</span> +91 98765 43210</div>
  <div class="contact-row"><span class="contact-label">Email</span> hello@chitravichitra.events</div>
  <div class="contact-row"><span class="contact-label">Location</span> Mumbai, Maharashtra, India</div>
  <div class="footer">© ${new Date().getFullYear()} Chitra Vichitra Events · All rights reserved</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "Chitra-Vichitra-Events-Brochure.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Brochure downloaded! Open in browser and Ctrl+P to save as PDF.", { duration: 5000 });
}

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/",         label: "Home"       },
    { path: "/about",    label: "About"      },
    { path: "/services", label: "Services"   },
    { path: "/contact",  label: "Contact Us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border"
      style={{ boxShadow: "0 0 30px rgba(139, 43, 255, 0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => window.location.reload()}
        >
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <img
              src={cvcLogo}
              alt="CVC — Chitra Vichitra Events"
              className="h-14 w-14 object-contain rounded-xl"
              style={{ boxShadow: "0 0 22px rgba(255,15,143,0.4)" }}
            />
          </motion.div>
          <div>
            <div className="font-bold text-base bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent leading-tight">
              Chitra Vichitra
            </div>
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase">Events</div>
          </div>
        </Link>

        {/* Nav Links — Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="relative group">
              <span
                className={`transition-colors ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent font-semibold"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </span>
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #FF0F8F, #8B2BFF, #00D4FF)",
                    boxShadow: "0 0 10px rgba(139, 43, 255, 0.6)",
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Brochure */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadBrochure}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all"
            style={{
              borderColor: "rgba(0,212,255,0.4)",
              color: "#00D4FF",
              background: "rgba(0,212,255,0.06)",
            }}
            title="Download Brochure"
          >
            <Download className="w-4 h-4" />
            Brochure
          </motion.button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-neon-yellow" />
            ) : (
              <Moon className="w-5 h-5 text-neon-purple" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border backdrop-blur-xl bg-background/95"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { downloadBrochure(); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-full flex items-center justify-center gap-2 font-semibold border transition-all"
                style={{ borderColor: "rgba(0,212,255,0.4)", color: "#00D4FF" }}
              >
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
