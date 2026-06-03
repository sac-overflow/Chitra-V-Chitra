import { motion } from "motion/react";
import { Sparkles, Music, Briefcase, Heart, Users, Palette, Lightbulb, CheckCircle2, Target, Rocket } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { NeonButton } from "./NeonButton";
import { StarField } from "./StarField";
import { LiquidFlow } from "./LiquidFlow";
import { FloatingIcons } from "./FloatingIcons";
import { Grid12, Col } from "./Grid12";

export function HomePage() {
  const experiences = [
    { icon: Heart, title: "Weddings", color: "#FF0F8F" },
    { icon: Briefcase, title: "Corporate Events", color: "#8B2BFF" },
    { icon: Music, title: "Concerts & Live Shows", color: "#00D4FF" },
    { icon: Palette, title: "Exhibitions", color: "#FFD500" },
    { icon: Users, title: "Private Parties", color: "#D91CFF" },
  ];

  const whyUs = [
    {
      icon: Lightbulb,
      title: "Creative Concepts",
      description: "Innovative ideas that transform your vision into extraordinary experiences.",
    },
    {
      icon: CheckCircle2,
      title: "End-to-End Management",
      description: "From planning to execution, we handle every detail with precision.",
    },
    {
      icon: Target,
      title: "Premium Production",
      description: "Top-tier vendors, cutting-edge technology, and flawless execution.",
    },
    {
      icon: Sparkles,
      title: "Personalized Experience",
      description: "Every event is unique, crafted specifically for your needs and dreams.",
    },
  ];

  const processSteps = [
    { title: "Imagine", description: "Share your vision and dreams with us" },
    { title: "Design", description: "We craft a unique concept tailored for you" },
    { title: "Manage", description: "Seamless coordination of every detail" },
    { title: "Deliver", description: "An unforgettable experience brought to life" },
  ];

  return (
    <div className="relative">
      <StarField />
      <LiquidFlow />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-24">
        <FloatingIcons />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1
              className="mb-6 bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              We Don't Plan Events.
              <br />
              We Create Experiences.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From weddings to concerts, corporate events to private celebrations,
              Chitra Vichitra turns every idea into a story worth remembering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <NeonButton variant="primary" size="lg" to="/contact">
              <Sparkles className="w-5 h-5" />
              Plan Your Event
            </NeonButton>
            <NeonButton variant="secondary" size="lg" to="/services">
              <Rocket className="w-5 h-5" />
              Explore Services
            </NeonButton>
          </motion.div>

          {/* Floating geometric decorations */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #FF0F8F, transparent)",
              filter: "blur(20px)",
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #00D4FF, transparent)",
              filter: "blur(30px)",
            }}
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* Experience Highlights */}
      <section className="py-24 px-6 relative">
        <div className="max-w-[1440px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic" }}
          >
            Experience Highlights
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <GlowCard className="text-center p-8 h-full" glowColor={exp.color}>
                  <exp.icon className="w-12 h-12 mx-auto mb-4" style={{ color: exp.color }} />
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Chitra Vichitra */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-gradient-to-r from-[#00F5FF] via-[#D91CFF] to-[#FF9F1A] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic" }}
          >
            Why Chitra Vichitra?
          </motion.h2>

          <Grid12>
            {whyUs.map((item, index) => (
              <Col key={item.title} span={3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <GlowCard className="p-8 h-full">
                    <item.icon className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </GlowCard>
                </motion.div>
              </Col>
            ))}
          </Grid12>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 bg-gradient-to-r from-[#FF0F8F] via-[#8B2BFF] to-[#00D4FF] bg-clip-text text-transparent"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, fontStyle: "italic" }}
          >
            Our Process
          </motion.h2>

          <div className="relative">
            {/* Flowing line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden lg:block">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF0F8F, #8B2BFF, #00D4FF, #FFD500)",
                  boxShadow: "0 0 20px rgba(139, 43, 255, 0.5)",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="relative z-10">
                    <GlowCard className="p-8 text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
                        style={{
                          background: "linear-gradient(135deg, #FF0F8F, #8B2BFF)",
                          boxShadow: "0 0 30px rgba(255, 15, 143, 0.5)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </GlowCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div
            className="relative overflow-hidden rounded-3xl p-16 text-center backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255, 15, 143, 0.1), rgba(139, 43, 255, 0.1), rgba(0, 212, 255, 0.1))",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #FF0F8F, #8B2BFF, #00D4FF) 1",
              boxShadow: "0 0 60px rgba(139, 43, 255, 0.3)",
            }}
          >
            <motion.h2
              className="mb-4 bg-gradient-to-r from-[#FFD500] via-[#FF0F8F] to-[#8B2BFF] bg-clip-text text-transparent"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 800, fontStyle: "italic" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Big Ideas. Bigger Experiences.
              <br />
              Unforgettable Every Time.
            </motion.h2>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
