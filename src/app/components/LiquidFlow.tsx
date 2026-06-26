import { motion } from "motion/react";

export function LiquidFlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="liquidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FF0F8F" }}>
              <animate
                attributeName="stop-color"
                values="#FF0F8F; #8B2BFF; #00D4FF; #FF0F8F"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" style={{ stopColor: "#8B2BFF" }}>
              <animate
                attributeName="stop-color"
                values="#8B2BFF; #00D4FF; #FFD500; #8B2BFF"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" style={{ stopColor: "#00D4FF" }}>
              <animate
                attributeName="stop-color"
                values="#00D4FF; #FFD500; #FF0F8F; #00D4FF"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z"
          fill="url(#liquidGradient1)"
          filter="url(#glow)"
          opacity="0.3"
          animate={{
            d: [
              "M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z",
              "M0,250 Q250,350 500,250 T1000,250 L1000,0 L0,0 Z",
              "M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M0,800 Q250,700 500,800 T1000,800 L1000,1000 L0,1000 Z"
          fill="url(#liquidGradient1)"
          filter="url(#glow)"
          opacity="0.2"
          animate={{
            d: [
              "M0,800 Q250,700 500,800 T1000,800 L1000,1000 L0,1000 Z",
              "M0,850 Q250,750 500,850 T1000,850 L1000,1000 L0,1000 Z",
              "M0,800 Q250,700 500,800 T1000,800 L1000,1000 L0,1000 Z",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
