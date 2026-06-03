import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Heart,
  Briefcase,
  Music,
  Image,
  PartyPopper,
  Rocket,
  Cake,
  GraduationCap,
  Palette,
  Mic,
  Sparkles,
  Coffee,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { GlowCard } from "./GlowCard";
import { StarField } from "./StarField";
import { Grid12, Col } from "./Grid12";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
  color: string;
}

export function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services: Service[] = [
    {
      icon: Heart,
      title: "Wedding Planning",
      description: "From intimate ceremonies to grand celebrations, we create magical moments.",
      details:
        "Complete wedding planning including venue selection, decor, catering, entertainment, and coordination. We handle every detail so you can enjoy your special day stress-free.",
      color: "#FF0F8F",
    },
    {
      icon: Briefcase,
      title: "Corporate Events",
      description: "Professional events that reflect your brand's excellence and vision.",
      details:
        "Conferences, product launches, team building, annual meetings, and corporate galas. We deliver polished, impactful events that strengthen your brand.",
      color: "#8B2BFF",
    },
    {
      icon: Music,
      title: "Concerts & Live Shows",
      description: "Electrifying performances with world-class production and staging.",
      details:
        "Full-scale concert production including stage design, sound systems, lighting, artist coordination, security, and audience management for unforgettable live experiences.",
      color: "#00D4FF",
    },
    {
      icon: Image,
      title: "Exhibitions",
      description: "Curated showcases that captivate and engage your audience.",
      details:
        "Art exhibitions, trade shows, product displays, and cultural showcases. We design immersive experiences that tell compelling stories.",
      color: "#FFD500",
    },
    {
      icon: PartyPopper,
      title: "Private Parties",
      description: "Exclusive celebrations tailored to your unique style and preferences.",
      details:
        "Birthday parties, anniversaries, engagement parties, and social gatherings. Personalized themes, entertainment, catering, and decor that reflect your personality.",
      color: "#D91CFF",
    },
    {
      icon: Rocket,
      title: "Product Launches",
      description: "Launch your product with impact and create lasting buzz.",
      details:
        "Strategic event design, media coordination, influencer management, interactive demonstrations, and post-event promotion for maximum market impact.",
      color: "#00F5FF",
    },
    {
      icon: Cake,
      title: "Birthday Celebrations",
      description: "Make every birthday unforgettable with our creative planning.",
      details:
        "Themed parties, custom decorations, entertainment, catering, and activities for all ages. From kids' parties to milestone celebrations.",
      color: "#FF9F1A",
    },
    {
      icon: GraduationCap,
      title: "College & Cultural Events",
      description: "Vibrant campus events that create lasting memories.",
      details:
        "College fests, cultural programs, talent shows, tech fests, and sports events. Youth-focused design with high-energy entertainment.",
      color: "#8B2BFF",
    },
    {
      icon: Palette,
      title: "Stage Design",
      description: "Stunning stage setups that become the centerpiece of your event.",
      details:
        "Custom stage architecture, lighting design, backdrops, props, and visual effects. We create immersive environments that wow your guests.",
      color: "#FF0F8F",
    },
    {
      icon: Mic,
      title: "Artist Management",
      description: "Seamless coordination with top performers and entertainers.",
      details:
        "Artist booking, contract negotiation, logistics, technical requirements, and on-site coordination. Access to a network of premium talent.",
      color: "#00D4FF",
    },
    {
      icon: Sparkles,
      title: "Decor & Theme Design",
      description: "Transform any space into a breathtaking visual experience.",
      details:
        "Custom themes, floral arrangements, lighting, centerpieces, draping, and ambient design. Every element curated to perfection.",
      color: "#D91CFF",
    },
    {
      icon: Coffee,
      title: "Hospitality & Guest Management",
      description: "Ensure every guest feels welcomed and well cared for.",
      details:
        "Guest coordination, RSVP management, seating arrangements, catering services, and personalized guest experiences from arrival to departure.",
      color: "#FFD500",
    },
  ];

  const isOpen = (title: string) =>
    expandedService === title || hoveredService === title;

  return (
    <div className="relative pt-32 pb-24">
      <StarField />

      <section className="px-4 sm:px-6 mb-24">
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
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            Comprehensive event solutions tailored to bring your vision to life
          </motion.p>
        </div>
      </section>

      <section className="px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <Grid12 className="gap-8">
            {services.map((service, index) => (
              <Col key={service.title} span={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.08 }}
                  onMouseEnter={() => setHoveredService(service.title)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="h-full"
                >
                  <GlowCard
                    className="p-8 h-full flex flex-col"
                    glowColor={service.color}
                    hoverGlow
                  >
                    <div
                      className="w-14 h-14 mb-5 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}25, ${service.color}08)`,
                        border: `1px solid ${service.color}50`,
                      }}
                    >
                      <service.icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>

                    <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedService(
                          expandedService === service.title ? null : service.title
                        )
                      }
                      className="flex items-center gap-2 text-sm font-semibold transition-colors w-fit"
                      style={{ color: service.color }}
                    >
                      View Details
                      <motion.div
                        animate={{ rotate: isOpen(service.title) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen(service.title) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden mt-4 pt-4 border-t"
                          style={{ borderColor: `${service.color}35` }}
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlowCard>
                </motion.div>
              </Col>
            ))}
          </Grid12>
        </div>
      </section>
    </div>
  );
}
