import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Network, Lock, Server, Headphones, ShieldCheck, TrendingUp, KeyRound, Handshake, Building2, Cross, FlaskConical, Activity, Stethoscope, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import healthImg from "@/assets/service-healthcare.jpg";

export const Route = createFileRoute("/healthcare")({
  head: () => ({
    meta: [
      { title: "Healthcare IT Solutions — KolyTech Communications" },
      {
        name: "description",
        content:
          "Secure, reliable healthcare IT: EMR deployment, hospital networking, data security and compliance, healthcare infrastructure and 24/7 support.",
      },
      { property: "og:title", content: "Healthcare IT Solutions" },
      { property: "og:description", content: "Connecting care. Powering health. Enterprise IT built for healthcare." },
    ],
  }),
  component: HealthcarePage,
});

const services = [
  { icon: HeartPulse, title: "EMR Deployment & Support", body: "Implementation and support for Electronic Medical Records systems that streamline patient management." },
  { icon: Network, title: "Hospital Networking", body: "Design and deployment of secure, high-performance networks that connect every part of your facility." },
  { icon: Lock, title: "Data Security & Compliance", body: "Protecting patient data with advanced security measures and ensuring compliance with industry standards." },
  { icon: Server, title: "Healthcare Infrastructure", body: "Server, storage, virtualization and backup solutions built for the demands of healthcare." },
  { icon: Headphones, title: "IT Support & Maintenance", body: "Reliable 24/7 support and proactive maintenance to ensure uninterrupted healthcare operations." },
];

const benefits = [
  { icon: ShieldCheck, label: "Improve Patient Safety" },
  { icon: TrendingUp, label: "Increase Operational Efficiency" },
  { icon: KeyRound, label: "Protect Sensitive Data" },
  { icon: Handshake, label: "Enhance Patient Experience" },
];

const idealFor = [
  { icon: Building2, label: "Hospitals" },
  { icon: Cross, label: "Clinics" },
  { icon: FlaskConical, label: "Laboratories" },
  { icon: Activity, label: "Health Centers" },
  { icon: Stethoscope, label: "Dental Centers" },
];

function HealthcarePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Healthcare IT Solutions"
        title="Connecting care."
        accent="Powering health."
        subtitle="We provide innovative, secure and reliable IT solutions that empower healthcare providers to deliver quality care, improve efficiency, and protect patient data."
        image={healthImg}
        imageAlt="Healthcare worker at an EMR workstation"
        tone="blue"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
        >
          Talk to a healthcare IT specialist <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Our Healthcare IT Services" title="Built for" accent="clinical reality." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
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
          <SectionHeading eyebrow="Benefits" title="Impact on your" accent="healthcare facility." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label} className="glass rounded-3xl p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-orange-gradient grid place-items-center shadow-glow-orange">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4 text-sm font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Ideal for" title="Facilities we" accent="proudly serve." />
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

      <SiteFooter />
    </div>
  );
}
