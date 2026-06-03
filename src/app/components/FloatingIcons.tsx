import { motion } from "motion/react";
import { Circle, Lightbulb, Ticket } from "lucide-react";

const items = [
  { Icon: Circle, top: "18%", left: "8%", delay: 0, color: "#FF0F8F" },
  { Icon: Lightbulb, top: "28%", right: "10%", delay: 0.5, color: "#00D4FF" },
  { Icon: Ticket, bottom: "32%", left: "12%", delay: 1, color: "#FFD500" },
  { Icon: Circle, bottom: "22%", right: "14%", delay: 1.5, color: "#8B2BFF" },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      {items.map(({ Icon, delay, color, ...pos }, i) => (
        <motion.div
          key={i}
          className="absolute p-4 rounded-2xl backdrop-blur-md border border-white/10"
          style={{
            ...pos,
            background: "rgba(11, 13, 18, 0.4)",
            boxShadow: `0 0 30px ${color}40`,
          }}
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{
            duration: 4 + i,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8 opacity-70" style={{ color }} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
