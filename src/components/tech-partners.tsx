import { motion } from "framer-motion";
import { SectionHeading } from "@/components/marketing";
import { staggerParent, fadeUp, viewportOnce } from "@/lib/motion";

const partners = [
  "Microsoft",
  "Cisco",
  "MikroTik",
  "Ubiquiti",
  "Hikvision",
  "Dahua",
  "Dell",
  "HP",
  "Lenovo",
];

export function TechPartners() {
  const loop = [...partners, ...partners];
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Technology partners"
          title="We build with"
          accent="the industry's best."
          description="Vendor-neutral by design — we deploy and support technology from the platforms our clients trust."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerParent(0.05)}
          className="mt-12 hidden md:grid grid-cols-3 lg:grid-cols-9 gap-3"
        >
          {partners.map((p) => (
            <motion.div
              key={p}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              title={p}
              className="group glass rounded-2xl px-4 py-5 text-center hover:shadow-glow-blue"
            >
              <span className="block text-sm font-bold tracking-wide text-muted-foreground grayscale group-hover:grayscale-0 group-hover:text-brand-orange transition-colors duration-300">
                {p}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden mt-10 overflow-hidden">
          <div className="flex gap-3 animate-marquee w-max">
            {loop.map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="glass rounded-2xl px-5 py-4 whitespace-nowrap text-sm font-bold text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

