import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Zap, ShieldCheck, Leaf, HomeIcon, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import solarImg from "@/assets/service-solar.jpg";

export const Route = createFileRoute("/solar")({
  head: () => ({
    meta: [
      { title: "Solar Systems Installation — KolyTech Communications" },
      {
        name: "description",
        content:
          "High-performance solar power systems for homes, businesses and institutions across Nigeria. Reliable. Sustainable. Cost-effective.",
      },
      { property: "og:title", content: "Solar Systems Installation" },
      { property: "og:description", content: "Reliable, sustainable, cost-effective solar power installations." },
    ],
  }),
  component: SolarPage,
});

const solutions = [
  { title: "Residential & Commercial Solar", body: "Turn-key rooftop installations sized to your load profile." },
  { title: "Inverter & Battery Backup", body: "Modern lithium storage and inverters for silent, clean power." },
  { title: "Hybrid & Off-Grid Systems", body: "Grid-tied hybrids and full off-grid arrays for remote sites." },
  { title: "System Maintenance", body: "Performance monitoring, panel cleaning and preventive care." },
];

const why = [
  { icon: Zap, label: "Lower energy costs" },
  { icon: ShieldCheck, label: "Reliable power supply" },
  { icon: Leaf, label: "Environmentally friendly" },
  { icon: HomeIcon, label: "Increase property value" },
];

function SolarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Solar Systems Installation"
        title="Powered by clean energy."
        accent="Built for reliability."
        subtitle="We design and install high-performance solar power systems for homes, businesses and institutions across Nigeria. Reliable. Sustainable. Cost-effective."
        image={solarImg}
        imageAlt="Technician installing solar panels"
        tone="orange"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
        >
          Free consultation & site assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Our Solar Solutions"
            title="Clean energy,"
            accent="engineered end-to-end."
            description="From single-home rooftop kits to commercial-scale hybrid plants — designed, installed, monitored and maintained by our own engineers."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {solutions.map((s) => (
              <GlassCard key={s.title}>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-orange-gradient shrink-0 grid place-items-center shadow-glow-orange">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Why go solar?"
            title="Four reasons"
            accent="to make the switch."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: Icon, label }) => (
              <div key={label} className="glass rounded-3xl p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-orange-gradient grid place-items-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4 text-sm font-semibold tracking-wide uppercase text-primary">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
