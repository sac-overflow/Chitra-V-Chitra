import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = "", glowColor = "#8B2BFF" }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl backdrop-blur-md bg-card/50 border border-border overflow-hidden ${className}`}
      style={{
        boxShadow: `0 0 30px ${glowColor}20`,
      }}
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}15, transparent 70%)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
