import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ChevronRight, ChevronLeft, Check, CreditCard,
  Phone, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// ─── Option Lists ──────────────────────────────────────────────────────────────

const CUISINES = [
  "Indian Vegetarian", "North Indian", "South Indian", "Jain Vegetarian",
  "Continental", "Chinese", "Mediterranean", "Pan-Asian Fusion", "Multi-Cuisine Buffet",
];

const DECOR_THEMES = [
  "Floral Romance", "Royal Maharaja", "Garden Paradise", "Rustic Boho",
  "Modern Minimalist", "Bollywood Glam", "Vintage Elegance", "Cyberpunk Neon", "Custom Theme",
];

const ENTERTAINMENT = [
  "DJ Night", "Live Band", "Classical Music", "Sufi Night",
  "Folk Performers", "Comedian", "Magician & Illusionist", "Multiple Acts",
];

const PHOTOGRAPHY = [
  "Basic Package (₹25,000)", "Premium Package (₹50,000)",
  "Cinematic Highlights (₹75,000)", "Full Cinematic Package (₹1,20,000)",
];

const VENUES = [
  "Banquet Hall", "Heritage Palace", "Garden / Outdoor",
  "Destination Venue", "5-Star Hotel", "Farmhouse",
];

const CORPORATE_EVENT_TYPES = [
  "Conference", "Product Launch", "Team Building", "Annual Gala",
  "Awards Night", "Seminar / Workshop", "Client Entertainment",
];

const CATERING_STYLES = [
  "Buffet", "Sit-down Dinner", "Cocktails & Canapes",
  "High Tea", "Box Lunch", "Gala Dinner",
];

const AV_SETUPS = [
  "Basic (Mic + Screen)", "Advanced (LED Wall + Sound)", "Full Production (Broadcast Quality)",
];

const CONCERT_SCALES = [
  "Club Night (up to 500)", "Medium Venue (500–2,000)", "Large Arena (2,000–10,000)", "Stadium (10,000+)",
];

const SOUND_SYSTEMS = [
  "Standard PA System", "Professional Array System", "World-Class Concert System",
];

const LIGHTING = [
  "Basic Lighting", "Advanced LED Rig", "Full LED + Laser Production",
];

const PARTY_THEMES = [
  "Bollywood Night", "Masquerade Ball", "Retro 70s / 80s", "Garden Party",
  "Beach Party Vibes", "Futuristic Neon", "Black & Gold Gala", "Custom Theme",
];

const EXHIBITION_TYPES = [
  "Art Exhibition", "Trade Show", "Product Display", "Cultural Showcase", "Fashion Show",
];

const BOOTH_DESIGNS = [
  "Standard Booth", "Custom Branded Booth", "Experiential / Interactive Booth", "Luxury Exhibition Pavilion",
];

const WEDDING_SUB_EVENTS: SubEventConfig[] = [
  { id: "engagement",  name: "Engagement Ceremony",    price: 150000, included: false },
  { id: "mehndi",      name: "Mehndi / Bridal Shower", price:  80000, included: false },
  { id: "haldi",       name: "Haldi Ceremony",         price:  60000, included: false },
  { id: "sangeet",     name: "Sangeet Night",          price: 200000, included: false },
  { id: "wedding",     name: "Wedding Ceremony",       price: 500000, included: true  },
  { id: "reception",   name: "Reception Dinner",       price: 300000, included: false },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SubEventConfig {
  id: string;
  name: string;
  price: number;
  included: boolean;
}

export interface ServiceModalData {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
  color: string;
  packageType: "wedding" | "corporate" | "concert" | "exhibition" | "party" | "standard";
  basePrice: number;
}

interface Props {
  service: ServiceModalData;
  onClose: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function formatPrice(p: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(p);
}

function SelectField({
  label, options, value, onChange, color,
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; color: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm bg-card border text-foreground focus:outline-none transition-colors"
        style={{ borderColor: value ? `${color}60` : "rgba(255,255,255,0.1)" }}
      >
        <option value="">— Select —</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Modal ─────────────────────────────────────────────────────────────────

export function ServiceModal({ service, onClose }: Props) {
  const navigate = useNavigate();

  const isWedding   = service.packageType === "wedding";
  const isCorporate = service.packageType === "corporate";
  const isConcert   = service.packageType === "concert";
  const isExhibit   = service.packageType === "exhibition";
  const isParty     = service.packageType === "party";

  const steps = isWedding
    ? ["Overview", "Packages", "Customize", "Summary"]
    : ["Overview", "Options", "Summary"];

  const [step, setStep]   = useState(0);
  const [budget, setBudget] = useState<number>(150000);

  // Wedding state
  const [selectedSubEvents, setSelectedSubEvents] = useState<Record<string, boolean>>(
    Object.fromEntries(WEDDING_SUB_EVENTS.map((e) => [e.id, e.included]))
  );
  const [subEventOptions, setSubEventOptions] = useState<Record<string, Record<string, string>>>({});

  // Other event state
  const [eventOptions, setEventOptions] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "" });

  const totalSubEventPrice = WEDDING_SUB_EVENTS
    .filter((e) => selectedSubEvents[e.id])
    .reduce((sum, e) => sum + e.price, 0);

  const maxStep = steps.length - 1;

  const toggleSubEvent = (id: string) => {
    const ev = WEDDING_SUB_EVENTS.find((e) => e.id === id);
    if (ev?.included) return;
    setSelectedSubEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setSubOpt = (eventId: string, key: string, val: string) =>
    setSubEventOptions((prev) => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || {}), [key]: val },
    }));

  const setOpt = (key: string, val: string) =>
    setEventOptions((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (type: "contact" | "onboarding") => {
    if (!clientInfo.name.trim() || !clientInfo.email.trim() || !clientInfo.phone.trim()) {
      toast.error("Please fill out your contact details (Name, Email, and Phone) in the form above.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const cleanPhone = clientInfo.phone.replace(/[^0-9]/g, "");
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phoneRegex.test(clientInfo.phone.trim()) || cleanPhone.length < 10 || cleanPhone.length > 15) {
      toast.error("Please enter a valid phone number (10 to 15 digits).");
      return;
    }

    const finalBudget = Number(budget);
    if (isNaN(finalBudget) || finalBudget < 1000 || finalBudget > 100000000) {
      toast.error("Budget must be between ₹1,000 and ₹10,00,00,000 (10 Crores).");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: clientInfo.name,
      email: clientInfo.email,
      phone: clientInfo.phone,
      service: service.title,
      packageType: service.packageType,
      budget: finalBudget,
      selectedPackages: isWedding
        ? WEDDING_SUB_EVENTS.filter((e) => selectedSubEvents[e.id]).map((e) => e.name)
        : [],
      customizations: isWedding ? subEventOptions : eventOptions,
      action: type,
      timestamp: new Date().toISOString(),
    };

    console.log("📋 CVC Booking Submission →", JSON.stringify(payload, null, 2));

    if (type === "onboarding") {
      try {
        const response = await fetch("http://localhost:3001/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 299, currency: "INR" }),
        });
        const order = await response.json();

        const options = {
          key: "rzp_test_YourKeyIdHere", // Enter the Key ID generated from the Dashboard
          amount: order.amount,
          currency: order.currency,
          name: "Chitra Vichitra Events",
          description: "Consultation Fee",
          order_id: order.id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("http://localhost:3001/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
              const verifyData = await verifyRes.json();
              
              if (verifyData.message === 'Payment verified successfully') {
                // Post details to the enquiry log CSV
                await fetch("http://localhost:3001/api/enquiry", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...payload,
                    message: `Paid Consultation Fee (₹299) successfully. Payment ID: ${response.razorpay_payment_id}`,
                  }),
                });

                toast.success(
                  "🎉 Payment Successful! Our planning team will contact you within 24 hours.",
                  { duration: 6000 }
                );
                onClose();
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (err) {
              toast.error("An error occurred while verifying the payment.");
            }
          },
          prefill: {
            name: clientInfo.name,
            email: clientInfo.email,
            contact: clientInfo.phone
          },
          theme: {
            color: service.color
          }
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error("Razorpay Error:", error);
        toast.error("Could not initiate payment. Please try again later.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            message: `Consultation request for ${service.title}.`,
          }),
        });

        if (response.ok) {
          toast.success("🎉 Request received! Redirecting to WhatsApp...");

          const formattedCustoms = isWedding 
            ? Object.keys(selectedSubEvents).filter(k => selectedSubEvents[k]).join(", ")
            : Object.entries(eventOptions).map(([k, v]) => `${k}: ${v}`).join(", ");

          const messageText = `Hello! I would like to inquire about *${service.title}* services.\n\n` +
            `*Name:* ${clientInfo.name}\n` +
            `*Email:* ${clientInfo.email}\n` +
            `*Phone:* ${clientInfo.phone}\n` +
            `*Budget:* ₹${finalBudget}\n` +
            `*Details:* ${formattedCustoms || 'N/A'}`;

          const whatsappUrl = `https://wa.me/917702640801?text=${encodeURIComponent(messageText)}`;
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");

          onClose();
        } else {
          toast.error("Failed to submit request. Please try again.");
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Unable to connect to the server.");
      }
    }

    setIsSubmitting(false);
  };

  // ─── Step renders ────────────────────────────────────────────────────────────

  const renderOverview = () => (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
          style={{ background: `${service.color}20`, border: `2px solid ${service.color}40` }}
        >
          <service.icon className="w-8 h-8" style={{ color: service.color }} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">{service.title}</h2>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed text-foreground/80 p-4 rounded-xl"
        style={{ background: `${service.color}08`, border: `1px solid ${service.color}20` }}
      >
        {service.details}
      </p>

      <div className="space-y-4 pt-2">
        <label className="text-sm font-semibold block">Your Target Budget (₹)</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">₹</span>
          <input
            type="number"
            value={budget || ""}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBudget(val >= 0 ? val : 0);
            }}
            className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-primary focus:outline-none font-bold text-sm text-white focus:ring-2 focus:ring-primary/20"
            placeholder="Enter your custom budget"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter a custom budget between ₹1,000 and ₹10,00,00,000.
        </p>
        {isWedding && (
          <p className="text-xs text-muted-foreground mt-2">
            Wedding ceremony is included. You can customize details and select additional events in the next steps.
          </p>
        )}
      </div>
    </div>
  );

  const renderWeddingPackages = () => (
    <div className="space-y-4">
      <div className="mb-2">
        <h3 className="text-lg font-bold">Select Your Events</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose which ceremonies you would like us to manage. The wedding ceremony is always included.
        </p>
      </div>

      {WEDDING_SUB_EVENTS.map((ev) => (
        <div
          key={ev.id}
          onClick={() => toggleSubEvent(ev.id)}
          className="flex items-center justify-between p-4 rounded-xl transition-all"
          style={{
            cursor: ev.included ? "default" : "pointer",
            background: selectedSubEvents[ev.id] ? `${service.color}12` : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${selectedSubEvents[ev.id] ? service.color : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center"
              style={{
                background: selectedSubEvents[ev.id] ? service.color : "rgba(255,255,255,0.05)",
                border: `1.5px solid ${service.color}60`,
              }}
            >
              {selectedSubEvents[ev.id] && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <div>
              <div className="font-semibold text-sm">{ev.name}</div>
              {ev.included && (
                <div className="text-xs" style={{ color: service.color }}>Included in base package</div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div
        className="mt-2 p-4 rounded-xl text-center"
        style={{ background: `${service.color}10`, border: `1px solid ${service.color}30` }}
      >
        <span className="text-xs text-muted-foreground">Custom package compiled. Final quotation given after consultation.</span>
      </div>
    </div>
  );

  const renderWeddingCustomize = () => {
    const activeEvents = WEDDING_SUB_EVENTS.filter((e) => selectedSubEvents[e.id]);
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold">Customize Each Event</h3>
        {activeEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-4 rounded-xl space-y-4"
            style={{ background: `${service.color}06`, border: `1px solid ${service.color}25` }}
          >
            <h4 className="font-bold text-base" style={{ color: service.color }}>{ev.name}</h4>
            <SelectField label="Catering Cuisine" options={CUISINES}
              value={subEventOptions[ev.id]?.catering || ""}
              onChange={(v) => setSubOpt(ev.id, "catering", v)} color={service.color} />
            <SelectField label="Decor Theme" options={DECOR_THEMES}
              value={subEventOptions[ev.id]?.decor || ""}
              onChange={(v) => setSubOpt(ev.id, "decor", v)} color={service.color} />
            <SelectField label="Entertainment" options={ENTERTAINMENT}
              value={subEventOptions[ev.id]?.entertainment || ""}
              onChange={(v) => setSubOpt(ev.id, "entertainment", v)} color={service.color} />
            <SelectField label="Photography Package" options={PHOTOGRAPHY}
              value={subEventOptions[ev.id]?.photography || ""}
              onChange={(v) => setSubOpt(ev.id, "photography", v)} color={service.color} />
            <SelectField label="Venue Type" options={VENUES}
              value={subEventOptions[ev.id]?.venue || ""}
              onChange={(v) => setSubOpt(ev.id, "venue", v)} color={service.color} />

            {subEventOptions[ev.id]?.venue === "Destination Venue" && (
              <div className="space-y-3 pt-2 pl-4 border-l-2" style={{ borderColor: service.color }}>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-widest" style={{ color: service.color }}>
                    Destination City
                  </label>
                  <select
                    value={subEventOptions[ev.id]?.destCityType || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSubOpt(ev.id, "destCityType", val);
                      if (val !== "Other") {
                        setSubOpt(ev.id, "destinationCity", val);
                      } else {
                        setSubOpt(ev.id, "destinationCity", "");
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-card border text-foreground focus:outline-none transition-colors"
                    style={{ borderColor: `${service.color}60` }}
                  >
                    <option value="">— Select Destination City —</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Goa">Goa</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Mussoorie">Mussoorie</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Mahabalipuram">Mahabalipuram</option>
                    <option value="Other">Other (Enter Manually)</option>
                  </select>
                </div>

                {subEventOptions[ev.id]?.destCityType === "Other" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Enter City Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manali, Shimla"
                      value={subEventOptions[ev.id]?.destinationCity || ""}
                      onChange={(e) => setSubOpt(ev.id, "destinationCity", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-card border text-foreground focus:outline-none transition-colors focus:border-primary"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStandardOptions = () => {
    if (isCorporate) return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold mb-1">Customize Your Event</h3>
        <SelectField label="Event Type" options={CORPORATE_EVENT_TYPES}
          value={eventOptions.eventType || ""} onChange={(v) => setOpt("eventType", v)} color={service.color} />
        <SelectField label="Catering Style" options={CATERING_STYLES}
          value={eventOptions.catering || ""} onChange={(v) => setOpt("catering", v)} color={service.color} />
        <SelectField label="AV & Production Setup" options={AV_SETUPS}
          value={eventOptions.av || ""} onChange={(v) => setOpt("av", v)} color={service.color} />
        <SelectField label="Decor Theme" options={DECOR_THEMES}
          value={eventOptions.decor || ""} onChange={(v) => setOpt("decor", v)} color={service.color} />
      </div>
    );

    if (isConcert) return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold mb-1">Production Details</h3>
        <SelectField label="Event Scale" options={CONCERT_SCALES}
          value={eventOptions.scale || ""} onChange={(v) => setOpt("scale", v)} color={service.color} />
        <SelectField label="Sound System" options={SOUND_SYSTEMS}
          value={eventOptions.sound || ""} onChange={(v) => setOpt("sound", v)} color={service.color} />
        <SelectField label="Lighting & Visuals" options={LIGHTING}
          value={eventOptions.lighting || ""} onChange={(v) => setOpt("lighting", v)} color={service.color} />
        <SelectField label="Catering" options={CATERING_STYLES}
          value={eventOptions.catering || ""} onChange={(v) => setOpt("catering", v)} color={service.color} />
      </div>
    );

    if (isExhibit) return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold mb-1">Exhibition Details</h3>
        <SelectField label="Exhibition Type" options={EXHIBITION_TYPES}
          value={eventOptions.type || ""} onChange={(v) => setOpt("type", v)} color={service.color} />
        <SelectField label="Booth / Display Design" options={BOOTH_DESIGNS}
          value={eventOptions.booth || ""} onChange={(v) => setOpt("booth", v)} color={service.color} />
        <SelectField label="Catering" options={CATERING_STYLES}
          value={eventOptions.catering || ""} onChange={(v) => setOpt("catering", v)} color={service.color} />
        <SelectField label="Decor Theme" options={DECOR_THEMES}
          value={eventOptions.decor || ""} onChange={(v) => setOpt("decor", v)} color={service.color} />
      </div>
    );

    if (isParty) return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold mb-1">Party Details</h3>
        <SelectField label="Party Theme" options={PARTY_THEMES}
          value={eventOptions.theme || ""} onChange={(v) => setOpt("theme", v)} color={service.color} />
        <SelectField label="Catering Cuisine" options={CUISINES}
          value={eventOptions.catering || ""} onChange={(v) => setOpt("catering", v)} color={service.color} />
        <SelectField label="Entertainment" options={ENTERTAINMENT}
          value={eventOptions.entertainment || ""} onChange={(v) => setOpt("entertainment", v)} color={service.color} />
        <SelectField label="Decor Style" options={DECOR_THEMES}
          value={eventOptions.decor || ""} onChange={(v) => setOpt("decor", v)} color={service.color} />
        <SelectField label="Photography" options={PHOTOGRAPHY}
          value={eventOptions.photography || ""} onChange={(v) => setOpt("photography", v)} color={service.color} />
      </div>
    );

    return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold mb-1">Customize Your Event</h3>
        <SelectField label="Catering Cuisine" options={CUISINES}
          value={eventOptions.catering || ""} onChange={(v) => setOpt("catering", v)} color={service.color} />
        <SelectField label="Decor Theme" options={DECOR_THEMES}
          value={eventOptions.decor || ""} onChange={(v) => setOpt("decor", v)} color={service.color} />
        <SelectField label="Entertainment" options={ENTERTAINMENT}
          value={eventOptions.entertainment || ""} onChange={(v) => setOpt("entertainment", v)} color={service.color} />
        <SelectField label="Photography" options={PHOTOGRAPHY}
          value={eventOptions.photography || ""} onChange={(v) => setOpt("photography", v)} color={service.color} />
      </div>
    );
  };

  const renderSummary = () => {
    const selectedEvents = WEDDING_SUB_EVENTS.filter((e) => selectedSubEvents[e.id]);

    return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Your Event Summary</h3>

        <div
          className="p-5 rounded-xl space-y-3"
          style={{ background: `${service.color}10`, border: `1px solid ${service.color}30` }}
        >
          <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: `${service.color}25` }}>
            <service.icon className="w-5 h-5 flex-shrink-0" style={{ color: service.color }} />
            <span className="font-bold">{service.title}</span>
          </div>

          {isWedding ? (
            <div className="space-y-3">
              {selectedEvents.map((ev) => {
                const opts = subEventOptions[ev.id] || {};
                const customSummary = Object.entries(opts)
                  .filter(([k, v]) => v && k !== "destCityType")
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ");
                return (
                  <div key={ev.id} className="text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <div className="font-semibold text-foreground">{ev.name}</div>
                    {customSummary && (
                      <div className="text-xs text-muted-foreground mt-1 capitalize">
                        {customSummary}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1.5">
              {Object.entries(eventOptions)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm gap-4">
                    <span className="text-muted-foreground capitalize">{k}</span>
                    <span className="font-semibold text-right text-xs max-w-[55%]">{v}</span>
                  </div>
                ))}
            </div>
          )}

          <div className="pt-3 border-t border-dashed flex items-center justify-between" style={{ borderColor: `${service.color}20` }}>
            <span className="text-sm font-semibold">Your Custom Budget</span>
            <div className="relative w-44">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-semibold">₹</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
                className="w-full pl-6 pr-2 py-1 rounded-lg bg-black/40 border border-white/10 focus:border-primary focus:outline-none text-right font-bold text-sm text-white"
                style={{ color: service.color }}
                placeholder="Target budget"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Form */}
        <div className="p-4 rounded-xl border border-white/5 space-y-3 bg-white/[0.01]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Contact Details</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-sm focus:outline-none focus:border-primary text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Final pricing confirmed after consultation. Getting our team contacted for consultation costs ₹299 which includes GST.
          <br />
          <span className="font-semibold mt-1 block">* Upon exiting the consultation and quotation, if you dislike our service, you will get a refund of ₹250 (excluding taxes).</span>
        </p>

        <div className="space-y-3 pt-1">
          <button
            onClick={() => handleSubmit("onboarding")}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${service.color}, #8B2BFF)`,
              boxShadow: `0 0 30px ${service.color}35`,
            }}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CreditCard className="w-5 h-5" />
            )}
            Pay Consultation Fee — ₹299
          </button>

          <button
            onClick={() => handleSubmit("contact")}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-80"
            style={{
              background: "transparent",
              border: `2px solid ${service.color}`,
              color: service.color,
            }}
          >
            <Phone className="w-5 h-5" />
            Contact Us for Further Details
          </button>
        </div>
      </div>
    );
  };

  const getStepContent = () => {
    if (isWedding) {
      if (step === 0) return renderOverview();
      if (step === 1) return renderWeddingPackages();
      if (step === 2) return renderWeddingCustomize();
      return renderSummary();
    } else {
      if (step === 0) return renderOverview();
      if (step === 1) return renderStandardOptions();
      return renderSummary();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #0e1018, #050505)",
            border: `1px solid ${service.color}35`,
            boxShadow: `0 0 80px ${service.color}18, 0 30px 80px rgba(0,0,0,0.9)`,
          }}
        >
          {/* Sticky Header */}
          <div
            className="flex-shrink-0 px-6 pt-5 pb-4"
            style={{ borderBottom: `1px solid ${service.color}15` }}
          >
            <div className="flex items-center justify-between mb-3">
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: i === step ? 1.4 : 1 }}
                      className="rounded-full"
                      style={{
                        width: i === step ? 10 : 7,
                        height: i === step ? 10 : 7,
                        background: i <= step ? service.color : "rgba(255,255,255,0.15)",
                        boxShadow: i === step ? `0 0 8px ${service.color}` : "none",
                      }}
                    />
                    {i < steps.length - 1 && (
                      <div className="w-5 h-px" style={{ background: i < step ? service.color : "rgba(255,255,255,0.1)" }} />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length} — <span className="font-semibold" style={{ color: service.color }}>{steps[step]}</span>
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.18 }}
              >
                {getStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Nav Footer */}
          {step < maxStep && (
            <div
              className="flex-shrink-0 px-6 py-4"
              style={{ borderTop: `1px solid ${service.color}15` }}
            >
              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex-1 py-3 rounded-xl border font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5"
                    style={{ borderColor: `${service.color}40`, color: service.color }}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, #8B2BFF)`,
                    boxShadow: `0 0 20px ${service.color}30`,
                  }}
                >
                  {step === maxStep - 1 ? (
                    <><Sparkles className="w-4 h-4" /> Review & Confirm</>
                  ) : (
                    <>Continue <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
