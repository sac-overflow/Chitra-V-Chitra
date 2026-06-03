import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hoverGlow?: boolean;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "#8B2BFF",
  hoverGlow = true,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={
        hoverGlow
          ? {
              y: -8,
              scale: 1.03,
              boxShadow: `0 20px 50px ${glowColor}35, 0 0 40px ${glowColor}25`,
            }
          : undefined
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl backdrop-blur-md bg-card/50 border border-border overflow-hidden ${className}`}
      style={{
        boxShadow: `0 0 30px ${glowColor}18`,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}18, transparent 70%)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
