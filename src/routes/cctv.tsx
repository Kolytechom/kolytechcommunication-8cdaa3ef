import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, HardDrive, Smartphone, Lock, Wrench, Building2, Factory, Store, School, HomeIcon, Eye, ShieldCheck, UserCheck, Settings, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import cctvImg from "@/assets/service-cctv.jpg";

export const Route = createFileRoute("/cctv")({
  head: () => ({
    meta: [
      { title: "CCTV System Installation — KolyTech Communications" },
      {
        name: "description",
        content:
          "Smart security. Complete protection. Advanced CCTV, access control and intrusion detection with 24/7 visibility and remote viewing.",
      },
      { property: "og:title", content: "CCTV & Security Systems" },
      { property: "og:description", content: "24/7 visibility, safety and peace of mind." },
    ],
  }),
  component: CCTVPage,
});

const solutions = [
  { icon: Camera, title: "HD CCTV Cameras", body: "Crystal-clear monitoring day and night, indoor and outdoor." },
  { icon: HardDrive, title: "DVR / NVR Recording", body: "Reliable recording, storage and instant playback." },
  { icon: Smartphone, title: "Remote Viewing", body: "Monitor your property in real-time from phone or computer." },
  { icon: Lock, title: "Access Control & Intrusion", body: "Advanced access systems and smart alerts for total security." },
  { icon: Wrench, title: "Professional Installation", body: "Expert installation and ongoing maintenance support." },
];

const idealFor = [
  { icon: HomeIcon, label: "Homes" },
  { icon: Building2, label: "Offices" },
  { icon: Factory, label: "Factories" },
  { icon: Store, label: "Shops" },
  { icon: School, label: "Schools" },
];

const why = [
  { icon: ShieldCheck, label: "High quality equipment" },
  { icon: Eye, label: "24/7 monitoring" },
  { icon: UserCheck, label: "Expert installers" },
  { icon: Settings, label: "Reliable after-sales support" },
];

function CCTVPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="CCTV System Installation"
        title="Smart security."
        accent="Complete protection."
        subtitle="We design, supply and install advanced CCTV and security systems that give you 24/7 visibility, safety and peace of mind."
        image={cctvImg}
        imageAlt="Technician installing a CCTV camera"
        tone="blue"
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
          <SectionHeading eyebrow="Our CCTV Solutions" title="Cameras, storage," accent="control — all in one." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <GlassCard key={s.title}>
                <div className="h-11 w-11 rounded-2xl bg-brand-gradient grid place-items-center shadow-glow-blue">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Ideal for" title="Every space" accent="you protect." />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {idealFor.map(({ icon: Icon, label }) => (
              <div key={label} className="glass rounded-3xl p-6 text-center">
                <Icon className="h-8 w-8 mx-auto text-primary" />
                <div className="mt-3 text-sm font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Why choose us?" title="Complete security." accent="Total peace of mind." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
