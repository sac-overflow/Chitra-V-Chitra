import { motion } from "motion/react";
import { Link } from "react-router";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="px-3 py-2 rounded-lg backdrop-blur-md border border-white/10"
          style={{
            background: "rgba(11, 13, 18, 0.6)",
            boxShadow:
              "0 0 24px rgba(0, 245, 255, 0.35), 0 0 40px rgba(139, 43, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="font-black text-xl tracking-widest"
            style={{ fontStyle: "italic", fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "#FF0F8F", textShadow: "0 0 12px rgba(255,15,143,0.8)" }}>
              C
            </span>
            <span style={{ color: "#FFD500", textShadow: "0 0 12px rgba(255,213,0,0.8)" }}>
              V
            </span>
            <span style={{ color: "#FFFFFF", textShadow: "0 0 12px rgba(255,255,255,0.6)" }}>
              C
            </span>
          </span>
        </div>
      </motion.div>
      {!compact && (
        <div className="hidden sm:block">
          <div className="font-bold text-base md:text-lg leading-tight bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent">
            Chitra Vichitra
          </div>
          <div className="text-xs text-muted-foreground tracking-wide">Events</div>
        </div>
      )}
    </Link>
  );
}
