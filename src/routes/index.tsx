import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Phone, Search, PenTool, Wrench, LifeBuoy, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-globe.jpg";
import infraImg from "@/assets/service-infra.jpg";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { GlassCard, SectionHeading } from "@/components/marketing";
import { FeaturedCarousel } from "@/components/carousel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { services, capabilities } from "@/lib/services-data";
import { AnimatedStats } from "@/components/animated-stats";
import { Portfolio } from "@/components/portfolio";
import { TechPartners } from "@/components/tech-partners";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KolyTech Communications — ICT, CCTV, Solar & Healthcare IT" },
      {
        name: "description",
        content:
          "KolyTech Communications delivers enterprise-grade IT infrastructure, CCTV, hardware, software, cloud and solar power installations across Nigeria.",
      },
      { property: "og:title", content: "KolyTech Communications — ICT, CCTV, Solar & Healthcare IT" },
      {
        property: "og:description",
        content:
          "KolyTech Communications delivers enterprise-grade IT infrastructure, CCTV, hardware, software, cloud and solar power installations across Nigeria.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <Marquee />
      <div className="reveal"><About /></div>
      <div className="reveal"><ServicesGrid /></div>
      <div className="reveal"><FeaturedCarousel /></div>
      <div className="reveal"><FeatureSplit /></div>
      <div className="reveal"><Process /></div>
      <div className="reveal"><AnimatedStats /></div>
      <div className="reveal"><Portfolio /></div>
      <div className="reveal"><TechPartners /></div>
      <div className="reveal"><Industries /></div>
      <div className="reveal"><Testimonials /></div>
      <div className="reveal"><FAQ /></div>
      <div className="reveal"><Stats /></div>
      <div className="reveal"><CTA /></div>
      <SiteFooter />
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="text-foreground">
            <span className="pill glass text-primary">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              ICT · CCTV · Solar · Healthcare IT
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black leading-[0.92] tracking-tight text-primary">
              Powering
              <br />
              <span className="gradient-text-brand">infrastructure.</span>
              <br />
              Securing systems.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              KolyTech Communications is a technology-driven company delivering
              enterprise-grade IT infrastructure, network solutions, intelligent
              power systems and modern security — built to keep organizations
              connected, optimized and future-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white hover:scale-[1.03] transition-transform"
              >
                Book a free consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary hover:bg-white transition-colors"
              >
                Explore services
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "10+", v: "Years experience" },
                { k: "24/7", v: "Support" },
                { k: "100%", v: "Client-first" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-3 py-3 text-center">
                  <dt className="text-2xl font-black text-primary">{s.k}</dt>
                  <dd className="text-[11px] text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-brand-orange/10 blur-3xl" aria-hidden />
            <div className="relative animate-floaty">
              <div className="glass rounded-[2.5rem] p-3 shadow-glow-blue">
                <img
                  src={heroImg}
                  alt="Nigerian IT engineer working in a modern server room"
                  className="w-full rounded-[2rem]"
                  width={1600}
                  height={1200}
                />
              </div>
              <div className="glass absolute -left-4 top-8 rounded-2xl px-3 py-2 text-xs font-semibold text-primary hidden sm:block">
                Enterprise-grade
              </div>
              <div className="glass absolute -right-3 bottom-10 rounded-2xl px-3 py-2 text-xs font-semibold text-primary hidden sm:block">
                Cloud · Solar · Security
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["ICT Services", "Enterprise IT", "Solar Systems", "CCTV & Security", "Healthcare IT", "Cloud", "Networking"];
  return (
    <div className="relative -mt-8 mb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass rounded-full px-4 py-3 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {items.map((t, i) => (
            <div key={t} className="flex items-center gap-6 whitespace-nowrap text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              {t.toUpperCase()}
              {i < items.length - 1 && <span className="h-1 w-1 rounded-full bg-brand-orange" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Enterprise IT,"
          accent="built for what's next."
          description="From healthcare systems to corporate networks, we design, deploy and manage scalable IT environments — helping organizations achieve high availability, security, and operational efficiency."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {capabilities.map(({ icon: Icon, label }) => (
            <GlassCard key={label} className="flex flex-col items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-gradient grid place-items-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">{label}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Master-planned {label.toLowerCase()} designed for scale, security and uptime.
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="relative py-20 sm:py-28 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Six practices."
          accent="One trusted partner."
          description="A full-stack technology company covering everything from cabling and cameras to cloud and clinical IT."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to={
                  s.slug === "solar" ? "/solar" :
                  s.slug === "cctv" ? "/cctv" :
                  s.slug === "healthcare" ? "/healthcare" : "/services"
                }
                className="group glass rounded-3xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/5 blur-3xl group-hover:bg-brand-orange/15 transition-colors" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.short}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureSplit() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -inset-6 rounded-[3rem] bg-brand-blue/5 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] shadow-glow-blue">
            <img
              src={infraImg}
              alt="Enterprise server room"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={1400}
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="pill bg-orange-gradient text-white">Why KolyTech</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-primary">
            High-availability, <span className="gradient-text-brand">by design.</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We specialize in designing, deploying and managing scalable IT environments —
            engineered for security, performance and operational efficiency across every
            department of your organization.
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              "Certified engineers across networking, virtualization & cloud",
              "Vendor-neutral procurement and lifecycle management",
              "Documented policies, compliance and audit readiness",
              "24/7 monitoring, preventive and corrective maintenance",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: Search, title: "Assess", body: "On-site survey, load audit and requirements capture with your team." },
    { icon: PenTool, title: "Design", body: "Detailed drawings, BOQ and a documented rollout plan you can approve." },
    { icon: Wrench, title: "Deploy", body: "Clean installation by certified engineers with commissioning and testing." },
    { icon: LifeBuoy, title: "Support", body: "Handover, training, monitoring and ongoing preventive maintenance." },
  ];
  return (
    <section className="relative py-20 sm:py-28 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title="A four-step process,"
          accent="documented end-to-end."
          description="Every engagement follows the same disciplined path — no surprises, no shortcuts."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <GlassCard key={s.title} className="relative">
              <div className="absolute -top-3 -left-3 h-9 w-9 rounded-full bg-orange-gradient grid place-items-center text-white text-sm font-bold">
                {i + 1}
              </div>
              <div className="h-11 w-11 rounded-2xl bg-brand-gradient grid place-items-center">
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const items = [
    "Healthcare & Hospitals",
    "Corporate Offices",
    "Government & Public Sector",
    "Education",
    "Retail & Hospitality",
    "Manufacturing",
    "Residential Estates",
    "SMBs & Startups",
  ];
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Trusted across"
          accent="every sector we serve."
        />
        <div className="mt-12 grid gap-3 grid-cols-2 md:grid-cols-4">
          {items.map((label) => (
            <div key={label} className="glass rounded-2xl p-4 text-center text-sm font-semibold text-primary">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      q: "KolyTech rebuilt our clinic network and EMR rollout. Zero downtime since day one.",
      a: "Medical Director, Lagos private hospital",
    },
    {
      q: "The solar hybrid system halved our diesel bill and just… works. Professional team.",
      a: "Facility Manager, corporate HQ",
    },
    {
      q: "Their CCTV and access control gave us real visibility across three branches.",
      a: "Operations Lead, retail chain",
    },
  ];
  return (
    <section className="relative py-20 sm:py-28 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Client stories" title="Reliable work," accent="reliable relationships." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map((t) => (
            <GlassCard key={t.a} className="flex flex-col">
              <div className="text-4xl leading-none text-brand-orange font-black">"</div>
              <p className="mt-2 text-sm text-foreground leading-relaxed">{t.q}</p>
              <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                {t.a}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Do you handle both design and installation?",
      a: "Yes. Every project starts with an on-site assessment and design, then our own engineers handle installation, commissioning and handover.",
    },
    {
      q: "Which regions do you cover?",
      a: "We serve clients across Nigeria from our Lagos base, with project teams that mobilize nationwide for larger deployments.",
    },
    {
      q: "Do you provide ongoing maintenance?",
      a: "We offer preventive and corrective maintenance contracts, 24/7 monitoring options and periodic health checks for every system we install.",
    },
    {
      q: "Can you work with our existing vendors and equipment?",
      a: "Absolutely. We are vendor-neutral and regularly integrate with existing infrastructure, cabling and hardware.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Answers to what" accent="most clients ask." />
        <div className="mt-10 grid gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="glass rounded-2xl p-5 text-left transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-primary">{f.q}</div>
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-brand-orange shrink-0" />
                  ) : (
                    <Plus className="h-4 w-4 text-brand-orange shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const rows = [
    { k: "Enterprise", v: "Multi-department IT support" },
    { k: "Healthcare", v: "EMR deployment & compliance" },
    { k: "Public Sector", v: "Networking & infrastructure" },
    { k: "SMB & Homes", v: "Solar, CCTV & connectivity" },
  ];
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass rounded-[2rem] p-6 sm:p-10 grid gap-6 md:grid-cols-4">
          {rows.map((r) => (
            <div key={r.k}>
              <div className="text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
                {r.k}
              </div>
              <div className="mt-2 font-bold text-lg text-primary">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass p-8 sm:p-14 text-foreground">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-primary">
                Let's power your world with{" "}
                <span className="gradient-text-brand">clean, reliable technology.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg">
                Free consultation and site assessment for enterprise IT, CCTV, healthcare
                IT and solar installations.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+2348139135880"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" /> +234 813 913 5880
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-gradient px-6 py-3 text-sm font-semibold text-white"
              >
                Send us a message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
