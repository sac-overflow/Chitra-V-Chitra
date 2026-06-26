import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="px-3 py-1.5 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #FF0F8F, #8B2BFF, #00D4FF)",
                  boxShadow: "0 0 20px rgba(255, 15, 143, 0.3)",
                }}
              >
                <span className="font-bold text-sm text-white tracking-wider" style={{ fontStyle: "italic" }}>
                  CVC
                </span>
              </div>
              <div>
                <div className="font-bold bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  Chitra Vichitra
                </div>
                <div className="text-xs text-muted-foreground">Events</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating unforgettable experiences through innovative event management and premium production.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                hello@chitravichitra.events
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Mumbai, India
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, color: "#D91CFF" },
                { icon: Facebook, color: "#00D4FF" },
                { icon: Twitter, color: "#8B2BFF" },
              ].map((social, index) => (
                <button
                  key={index}
                  className="p-3 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: `${social.color}15`,
                    border: `1px solid ${social.color}30`,
                  }}
                >
                  <social.icon className="w-5 h-5" style={{ color: social.color }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Chitra Vichitra Events. Crafted with <Heart className="w-4 h-4 text-primary" /> for unforgettable moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
