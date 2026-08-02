import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/marketing";
import cctvImg from "@/assets/service-cctv.jpg";
import solarImg from "@/assets/service-solar.jpg";
import healthcareImg from "@/assets/service-healthcare.jpg";
import infraImg from "@/assets/service-infra.jpg";
import aiImg from "@/assets/service-ai.jpg";
import schoolImg from "@/assets/project-school-wifi.jpg";
import retailImg from "@/assets/project-retail-it.jpg";
import webdevImg from "@/assets/project-webdev.jpg";
import clinicSolarImg from "@/assets/project-clinic-solar.jpg";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    title: "Enterprise LAN Rollout",
    category: "Networking",
    description: "Structured cabling and managed switching for a multi-floor corporate HQ in Lagos.",
    image: infraImg,
  },
  {
    title: "Multi-branch Surveillance",
    category: "CCTV",
    description: "IP camera network with centralized NVR and remote viewing across three branches.",
    image: cctvImg,
  },
  {
    title: "Hospital EMR Deployment",
    category: "Hospitals",
    description: "Clinical network, EMR rollout and 24/7 monitoring for a private hospital group.",
    image: healthcareImg,
  },
  {
    title: "Hybrid Solar for Office HQ",
    category: "Solar",
    description: "20kVA hybrid inverter with lithium storage — diesel usage cut by more than half.",
    image: solarImg,
  },
  {
    title: "School Campus Wi-Fi",
    category: "Schools",
    description: "Mesh Wi-Fi, filtering and cabling for an academic campus with 800+ users.",
    image: schoolImg,
  },
  {
    title: "SMB Business Website",
    category: "Websites",
    description: "Responsive marketing site with CMS, contact automation and SEO foundations.",
    image: webdevImg,
  },
  {
    title: "Retail Chain IT Support",
    category: "Businesses",
    description: "Managed IT support and POS network across a growing retail brand.",
    image: retailImg,
  },
  {
    title: "Clinic Solar Backup",
    category: "Hospitals",
    description: "Uninterrupted power for critical care equipment with hybrid solar + battery.",
    image: clinicSolarImg,
  },
  {
    title: "AI Workflow Automation",
    category: "Businesses",
    description: "Document intelligence and enquiry triage automating repetitive back-office work.",
    image: aiImg,
  },
];


const CATEGORIES = [
  "All",
  "Networking",
  "CCTV",
  "Websites",
  "Solar",
  "Hospitals",
  "Schools",
  "Businesses",
] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const reduce = useReducedMotion();
  void reduce;
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work"
          accent="across every practice."
          description="A snapshot of recent deployments — filter by the practice that matters to you."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow-blue"
                    : "border border-border bg-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group glass rounded-3xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-3 top-3 pill bg-card/90 text-primary text-[11px]">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange"
                  >
                    View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <div className="col-span-full text-center text-sm text-muted-foreground py-10">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
