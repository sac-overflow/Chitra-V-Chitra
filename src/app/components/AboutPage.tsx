import { motion } from "motion/react";
import { Lightbulb, Palette, Users, Rocket, CheckCircle2, Star } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { StarField } from "./StarField";

export function AboutPage() {
  const journeySteps = [
    {
      icon: Lightbulb,
      title: "Vision",
      description: "Every great event starts with a spark of imagination",
      color: "#FFD500",
    },
    {
      icon: Palette,
      title: "Concept",
      description: "We transform your ideas into stunning visual stories",
      color: "#FF0F8F",
    },
    {
      icon: Users,
      title: "Planning",
      description: "Meticulous coordination of every detail and vendor",
      color: "#8B2BFF",
    },
    {
      icon: Rocket,
      title: "Execution",
      description: "Flawless delivery that exceeds all expectations",
      color: "#00D4FF",
    },
    {
      icon: Star,
      title: "Experience",
      description: "Unforgettable moments that last a lifetime",
      color: "#D91CFF",
    },
  ];

  return (
    <div className="relative pt-32 pb-24">
      <StarField />

      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              fontStyle: "italic",
            }}
          >
            Beyond Ordinary.
            <br />
            Beyond Imagination.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            At Chitra Vichitra Events, we don't just organize occasions—we craft unforgettable stories.
            Each event is a canvas, and we paint it with creativity, precision, and passion.
          </motion.p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic" }}
          >
            Our Journey to Excellence
          </motion.h2>

          <div className="relative">
            {/* Flowing curved line */}
            <svg
              className="absolute top-0 left-0 w-full h-full hidden lg:block opacity-30"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#FFD500" }} />
                  <stop offset="25%" style={{ stopColor: "#FF0F8F" }} />
                  <stop offset="50%" style={{ stopColor: "#8B2BFF" }} />
                  <stop offset="75%" style={{ stopColor: "#00D4FF" }} />
                  <stop offset="100%" style={{ stopColor: "#D91CFF" }} />
                </linearGradient>
              </defs>
              <motion.path
                d="M 50 100 Q 200 50, 350 100 T 650 100 T 950 100"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <GlowCard className="p-8 text-center h-full" glowColor={step.color}>
                    <div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, ${step.color}80)`,
                        boxShadow: `0 0 30px ${step.color}50`,
                      }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3" style={{ color: step.color }}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255, 15, 143, 0.08), rgba(139, 43, 255, 0.08), rgba(0, 212, 255, 0.08))",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #FF0F8F, #8B2BFF, #00D4FF) 1",
              boxShadow: "0 0 60px rgba(139, 43, 255, 0.3)",
            }}
          >
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2
                className="mb-6 bg-gradient-to-r from-[#00F5FF] via-[#D91CFF] to-[#FF9F1A] bg-clip-text text-transparent"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700 }}
              >
                Our Commitment
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We believe every event tells a unique story. Whether it's the joy of a wedding,
                the energy of a concert, or the professionalism of a corporate gathering, we bring
                your vision to life with unmatched creativity and precision. Our team of passionate
                professionals ensures that every moment is perfect, every detail is handled, and
                every experience is extraordinary.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Locations */}
      <section className="px-6 mt-32">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic" }}
          >
            Our Locations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <a href="https://maps.google.com/?q=Bandra+Kurla+Complex,+Mumbai" target="_blank" rel="noopener noreferrer" className="block outline-none">
                <GlowCard className="p-8 transition-all hover:scale-[1.02]" glowColor="#FF0F8F">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-[#FF0F8F]15 border border-[#FF0F8F]30">
                      <Star className="w-6 h-6 text-[#FF0F8F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Mumbai Head Office</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-20">
                    Bandra Kurla Complex (BKC),<br/>Mumbai, Maharashtra 400051
                  </p>
                </GlowCard>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <a href="https://maps.google.com/?q=Connaught+Place,+New+Delhi" target="_blank" rel="noopener noreferrer" className="block outline-none">
                <GlowCard className="p-8 transition-all hover:scale-[1.02]" glowColor="#00D4FF">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-[#00D4FF]15 border border-[#00D4FF]30">
                      <Star className="w-6 h-6 text-[#00D4FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Delhi Branch</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-20">
                    Connaught Place,<br/>New Delhi, Delhi 110001
                  </p>
                </GlowCard>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
