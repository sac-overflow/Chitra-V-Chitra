import { motion } from "motion/react";
import { useState } from "react";
import {
  Heart, Briefcase, Music, Image, PartyPopper, Rocket,
  Cake, GraduationCap, Palette, Mic, Sparkles, Coffee, ArrowRight,
} from "lucide-react";
import { GlowCard } from "./GlowCard";
import { StarField } from "./StarField";
import { ServiceModal, ServiceModalData } from "./ServiceModal";

const services: ServiceModalData[] = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "From intimate ceremonies to grand celebrations, we create magical moments.",
    details:
      "Complete wedding planning including venue selection, decor, catering, entertainment, and coordination across all your ceremonies — Engagement, Mehndi, Haldi, Sangeet, Wedding & Reception. We handle every detail so you can enjoy your special day stress-free.",
    color: "#FF0F8F",
    packageType: "wedding",
    basePrice: 500000,
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Professional events that reflect your brand's excellence and vision.",
    details:
      "Conferences, product launches, team building, annual meetings, and corporate galas. We deliver polished, impactful events that strengthen your brand and leave lasting impressions on every stakeholder.",
    color: "#8B2BFF",
    packageType: "corporate",
    basePrice: 150000,
  },
  {
    icon: Music,
    title: "Concerts & Live Shows",
    description: "Electrifying performances with world-class production and staging.",
    details:
      "Full-scale concert production including stage design, sound systems, lighting, artist coordination, security, and audience management for unforgettable live experiences from club nights to stadium shows.",
    color: "#00D4FF",
    packageType: "concert",
    basePrice: 300000,
  },
  {
    icon: Image,
    title: "Exhibitions",
    description: "Curated showcases that captivate and engage your audience.",
    details:
      "Art exhibitions, trade shows, product displays, and cultural showcases. We design immersive experiences that tell compelling stories and turn visitors into long-term advocates.",
    color: "#FFD500",
    packageType: "exhibition",
    basePrice: 100000,
  },
  {
    icon: PartyPopper,
    title: "Private Parties",
    description: "Exclusive celebrations tailored to your unique style and preferences.",
    details:
      "Birthday parties, anniversaries, engagement parties, and social gatherings. Personalized themes, entertainment, catering, and decor that reflect your personality and delight every guest.",
    color: "#D91CFF",
    packageType: "party",
    basePrice: 80000,
  },
  {
    icon: Rocket,
    title: "Product Launches",
    description: "Launch your product with impact and create lasting buzz.",
    details:
      "Strategic event design, media coordination, influencer management, interactive demonstrations, and post-event promotion for maximum market impact and brand recall.",
    color: "#00F5FF",
    packageType: "corporate",
    basePrice: 200000,
  },
  {
    icon: Cake,
    title: "Birthday Celebrations",
    description: "Make every birthday unforgettable with our creative planning.",
    details:
      "Themed parties, custom decorations, entertainment, catering, and activities for all ages. From intimate kids' parties to landmark milestone celebrations — every birthday deserves magic.",
    color: "#FF9F1A",
    packageType: "party",
    basePrice: 50000,
  },
  {
    icon: GraduationCap,
    title: "College & Cultural Events",
    description: "Vibrant campus events that create lasting memories.",
    details:
      "College fests, cultural programs, talent shows, tech fests, and sports events. Youth-focused high-energy design with professional production that wows students and faculty alike.",
    color: "#8B2BFF",
    packageType: "standard",
    basePrice: 75000,
  },
  {
    icon: Palette,
    title: "Stage Design",
    description: "Stunning stage setups that become the centrepiece of your event.",
    details:
      "Custom stage architecture, lighting design, backdrops, props, and visual effects. We create immersive environments that wow your guests and make every performance unforgettable.",
    color: "#FF0F8F",
    packageType: "standard",
    basePrice: 80000,
  },
  {
    icon: Mic,
    title: "Artist Management",
    description: "Seamless coordination with top performers and entertainers.",
    details:
      "Artist booking, contract negotiation, logistics, technical requirements, and on-site coordination. Access to a curated network of premium talent across music, comedy, and live performance.",
    color: "#00D4FF",
    packageType: "standard",
    basePrice: 50000,
  },
  {
    icon: Sparkles,
    title: "Decor & Theme Design",
    description: "Transform any space into a breathtaking visual experience.",
    details:
      "Custom themes, floral arrangements, lighting, centrepieces, draping, and ambient design. Every element curated to perfection — we turn ordinary spaces into extraordinary worlds.",
    color: "#D91CFF",
    packageType: "standard",
    basePrice: 60000,
  },
  {
    icon: Coffee,
    title: "Hospitality & Guest Management",
    description: "Ensure every guest feels welcomed and well cared for.",
    details:
      "Guest coordination, RSVP management, seating arrangements, catering services, and personalised guest experiences from arrival to departure. White-glove service for every attendee.",
    color: "#FFD500",
    packageType: "standard",
    basePrice: 40000,
  },
];

const PACKAGE_LABELS: Record<string, string> = {
  wedding:    "Full Wedding Suite",
  corporate:  "Corporate Package",
  concert:    "Live Production",
  exhibition: "Exhibition Package",
  party:      "Party Package",
  standard:   "Custom Package",
};

function formatBase(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

export function ServicesPage() {
  const [activeModal, setActiveModal] = useState<ServiceModalData | null>(null);

  return (
    <div className="relative pt-32 pb-24">
      <StarField />

      {/* Hero */}
      <section className="px-6 mb-24">
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
            Comprehensive event solutions tailored to bring your vision to life.
            <br className="hidden md:block" />
            <span className="text-base text-muted-foreground/70">
              Click any service to explore packages, customise your event, and begin planning.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <GlowCard className="p-8 h-full flex flex-col" glowColor={service.color}>
                  {/* Icon */}
                  <div
                    className="w-14 h-14 mb-5 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
                      border: `2px solid ${service.color}40`,
                    }}
                  >
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>

                  <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Badge + price */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${service.color}12`,
                        color: service.color,
                        border: `1px solid ${service.color}35`,
                      }}
                    >
                      {PACKAGE_LABELS[service.packageType]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      from{" "}
                      <span className="font-bold" style={{ color: service.color }}>
                        {formatBase(service.basePrice)}
                      </span>
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveModal(service)}
                    className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}18, ${service.color}06)`,
                      border: `1.5px solid ${service.color}50`,
                      color: service.color,
                    }}
                  >
                    Explore & Book
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {activeModal && (
        <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
