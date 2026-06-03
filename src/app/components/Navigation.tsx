import { Moon, Sun, Sparkles, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";

export function Navigation() {
  const { setTheme, resolvedTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border"
      style={{ boxShadow: "0 4px 30px rgba(139, 43, 255, 0.12), inset 0 -1px 0 rgba(0, 245, 255, 0.15)" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Logo />

          <div className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative group py-1">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent"
                      : "text-foreground/75 hover:text-foreground"
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
                      boxShadow: "0 0 12px rgba(0, 245, 255, 0.7)",
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2.5 rounded-xl bg-card/80 border border-border hover:border-primary/40 transition-all backdrop-blur-sm"
              aria-label="Toggle dark or light theme"
            >
              {mounted && (isDark ? (
                <Sun className="w-5 h-5 text-[#FFD500]" />
              ) : (
                <Moon className="w-5 h-5 text-[#8B2BFF]" />
              ))}
            </button>

            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF0F8F, #8B2BFF)",
                boxShadow: "0 0 25px rgba(255, 15, 143, 0.4)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Plan Your Event
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-card/80 border border-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

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
                  className={`block py-2 text-lg ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #FF0F8F, #8B2BFF)",
                  boxShadow: "0 0 25px rgba(255, 15, 143, 0.4)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Plan Your Event
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
