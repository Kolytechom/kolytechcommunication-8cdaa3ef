import { motion } from "framer-motion";
import { SectionHeading } from "@/components/marketing";
import { staggerParent, fadeUp, viewportOnce } from "@/lib/motion";

/**
 * Technology ecosystem we genuinely deploy and support.
 * Deliberately worded as capability areas — no partnership or certification is
 * implied by any name listed here.
 */
const ecosystem: { group: string; items: string[] }[] = [
  {
    group: "Platforms & Server",
    items: ["Microsoft", "Windows Server", "Active Directory", "VMware"],
  },
  {
    group: "Networking & Connectivity",
    items: ["Enterprise Networking", "Structured Cabling", "Wireless & Radio Links"],
  },
  {
    group: "Security & Surveillance",
    items: ["Security Systems", "CCTV & Access Control", "Network Security"],
  },
  {
    group: "Power & Sector Technology",
    items: ["Solar Technologies", "Backup Power", "Healthcare Technology", "AI Platforms"],
  },
];

export function TechPartners() {
  const loop = ecosystem.flatMap((g) => g.items);
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Technology ecosystem"
          title="The technologies"
          accent="we work with."
          description="Vendor-neutral by design — we deploy and support the platforms our clients depend on, selected on merit for each project."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerParent(0.06)}
          className="mt-12 hidden md:grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ecosystem.map((g) => (
            <motion.div
              key={g.group}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-6 hover:shadow-glow-blue transition-shadow duration-300"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
                {g.group}
              </h3>
              <ul className="mt-4 grid gap-2">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden mt-10 overflow-hidden">
          <div className="flex gap-3 animate-marquee w-max">
            {[...loop, ...loop].map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="glass rounded-2xl px-5 py-4 whitespace-nowrap text-sm font-bold text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Technology names are listed to describe the environments we support. No official
          partnership, endorsement or certification is implied.
        </p>
      </div>
    </section>
  );
}
