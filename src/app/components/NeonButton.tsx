import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  onClick?: () => void;
  className?: string;
  to?: string;
  type?: "button" | "submit";
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  to,
  type = "button",
}: NeonButtonProps) {
  const isPrimary = variant === "primary";
  const isLarge = size === "lg";

  const baseClass = `rounded-full relative overflow-hidden group inline-flex items-center justify-center gap-2 font-semibold transition-all ${
    isLarge ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
  } ${className}`;

  const primaryStyle = {
    background: "linear-gradient(135deg, #FF0F8F, #8B2BFF, #00D4FF)",
    boxShadow: "0 0 30px rgba(255, 15, 143, 0.45), 0 0 60px rgba(139, 43, 255, 0.2)",
    color: "#FFFFFF",
  };

  const secondaryClass =
    "bg-transparent border border-[#8B2BFF]/60 hover:border-[#FF0F8F] text-foreground hover:shadow-[0_0_24px_rgba(139,43,255,0.4)] backdrop-blur-sm";

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#8B2BFF] via-[#00D4FF] to-[#FFD500]"
          initial={{ x: "100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.35 }}
        />
      )}
      {!isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FF0F8F]/10 via-[#8B2BFF]/10 to-[#00D4FF]/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex">
        <Link
          to={to}
          className={`${baseClass} ${!isPrimary ? secondaryClass : ""}`}
          style={isPrimary ? primaryStyle : undefined}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClass} ${!isPrimary ? secondaryClass : ""}`}
      style={isPrimary ? primaryStyle : undefined}
    >
      {inner}
    </motion.button>
  );
}
