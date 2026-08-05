import { motion } from "framer-motion";
import {
  Award,
  Server,
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  SunMedium,
  Compass,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/marketing";
import { staggerParent, fadeUp, viewportOnce, EASE, DUR } from "@/lib/motion";
import { YEARS_EXPERIENCE_SHORT } from "@/lib/company";

const reasons = [
  {
    icon: Award,
    title: `${YEARS_EXPERIENCE_SHORT} Years Experience`,
    body: "Nearly two decades delivering and supporting technology for Nigerian organisations.",
  },
  {
    icon: Server,
    title: "Enterprise IT Infrastructure",
    body: "Networks, servers, virtualisation and structured cabling designed for uptime.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Digital Solutions",
    body: "Automation, chatbots, software and digital products built around your workflow.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Technology",
    body: "Hospital networks, EMR readiness and clinical systems support.",
  },
  {
    icon: ShieldCheck,
    title: "CCTV & Security",
    body: "Surveillance, access control and monitoring across single and multi-site estates.",
  },
  {
    icon: SunMedium,
    title: "Solar & Backup Power",
    body: "Hybrid solar, inverter and backup systems engineered for Nigerian load profiles.",
  },
  {
    icon: Compass,
    title: "Technical Leadership Consulting",
    body: "Advisory and IT strategy for teams without an in-house technology lead.",
  },
  {
    icon: MapPin,
    title: "Nigerian Business Expertise",
    body: "Local engineers who understand local conditions, procurement and support realities.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Kolytech"
          title="Why choose"
          accent="Kolytech Communication."
          description="One accountable partner across infrastructure, AI, security and power — with the field experience to deliver and keep it running."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerParent(0.06)}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: DUR.fast, ease: EASE.out }}
              className="group glass rounded-3xl p-6 hover:shadow-glow-blue transition-shadow duration-300"
            >
              <div className="h-11 w-11 rounded-2xl bg-brand-gradient grid place-items-center transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5 text-white" aria-hidden />
              </div>
              <h3 className="mt-4 font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
