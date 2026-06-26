import { motion } from "motion/react";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: NeonButtonProps) {
  const isPrimary = variant === "primary";
  const isLarge = size === "lg";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-full relative overflow-hidden group inline-flex items-center gap-2 font-semibold transition-all ${
        isLarge ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } ${className}`}
      style={
        isPrimary
          ? {
              background: "linear-gradient(135deg, #FF0F8F, #8B2BFF)",
              boxShadow: "0 0 30px rgba(255, 15, 143, 0.4)",
              color: "#FFFFFF",
            }
          : {
              background: "transparent",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #FF0F8F, #8B2BFF, #00D4FF) 1",
              boxShadow: "0 0 20px rgba(139, 43, 255, 0.3)",
            }
      }
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#8B2BFF] to-[#00D4FF]"
          initial={{ x: "100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {!isPrimary && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(255, 15, 143, 0.1), rgba(139, 43, 255, 0.1))",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
