import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Phone, Search, PenTool, Wrench, LifeBuoy, Plus, Minus, Compass } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-globe.jpg";
import infraImg from "@/assets/service-infra.jpg";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { GlassCard, SectionHeading } from "@/components/marketing";
import { FeaturedCarousel } from "@/components/carousel";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { services, capabilities } from "@/lib/services-data";
import { YEARS_EXPERIENCE_SHORT } from "@/lib/company";
import { KolyAssistCTA } from "@/components/kolyassist";
import { AnimatedStats } from "@/components/animated-stats";
import { Portfolio } from "@/components/portfolio";
import { TechPartners } from "@/components/tech-partners";
import { WhyChoose } from "@/components/why-choose";

import { faqs } from "@/lib/faq-data";
import { pageMeta, canonical, ldScript, webPageSchema, faqSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({
      title: "Kolytech Communication — IT Infrastructure, AI & Digital Solutions",
      description:
        "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering network & security, AI, business automation, software development, CCTV, solar and healthcare IT across Nigeria.",
      path: "/",
      ogDescription:
        "IT Infrastructure, AI, business automation, software development, CCTV, solar and healthcare IT across Nigeria.",
    }),
    links: canonical("/"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "Kolytech Communication — IT Infrastructure, AI & Digital Solutions",
          description:
            "IT Infrastructure, AI, business automation, software development, CCTV, solar and healthcare IT across Nigeria.",
          path: "/",
        }),
      ),
      ldScript(faqSchema(faqs)),
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <Marquee />
      <Reveal><About /></Reveal>
      <Reveal><ServicesGrid /></Reveal>
      <Reveal><FeaturedCarousel /></Reveal>
      <Reveal><FeatureSplit /></Reveal>
      <Reveal><WhyChoose /></Reveal>
      <Reveal><Process /></Reveal>

      <Reveal><AnimatedStats /></Reveal>
      <Reveal><Portfolio /></Reveal>
      <Reveal><TechPartners /></Reveal>
      <Reveal><Industries /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><CTA /></Reveal>
      <SiteFooter />
    </div>
  );
}


function Hero() {
  const reduce = useReducedMotion();
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <motion.div className="text-foreground" initial="hidden" animate="show" variants={parent}>
            <motion.span variants={item} className="pill glass text-primary">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              IT Infrastructure · AI · Digital Solutions
            </motion.span>
            <motion.h1 variants={item} className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black leading-[0.92] tracking-tight text-primary">
              Powering
              <br />
              <span className="gradient-text-brand">infrastructure.</span>
              <br />
              Securing systems.
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Kolytech Communication is an IT Infrastructure, AI & Digital Solutions
              company — delivering enterprise-grade infrastructure, network & security,
              AI, business automation and software development to keep organizations
              connected, intelligent and future-ready.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-press inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white"
              >
                Book a free consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <KolyAssistCTA variant="glass" label="✨ Talk to KolyAssist" />
              <Link
                to="/services"
                className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary hover:bg-white"
              >
                Explore services
              </Link>
            </motion.div>

            <motion.dl variants={item} className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: YEARS_EXPERIENCE_SHORT, v: "Years experience" },
                { k: "24/7", v: "Support" },
                { k: "100%", v: "Client-first" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-3 py-3 text-center">
                  <dt className="text-2xl font-black text-primary">{s.k}</dt>
                  <dd className="text-[11px] text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-brand-orange/10 blur-3xl" aria-hidden />
            <div className="relative animate-floaty">
              <div className="glass rounded-[2.5rem] p-3 shadow-glow-blue">
                <img
                  src={heroImg}
                  alt="Nigerian IT engineer in a modern Lagos server room"
                  className="w-full rounded-[2rem]"
                  width={1600}
                  height={1200}
                />
              </div>
              <div className="glass absolute -left-4 top-8 rounded-2xl px-3 py-2 text-xs font-semibold text-primary hidden sm:block">
                Enterprise-grade
              </div>
              <div className="glass absolute -right-3 bottom-10 rounded-2xl px-3 py-2 text-xs font-semibold text-primary hidden sm:block">
                AI · Automation · Security
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["IT Infrastructure", "AI Solutions", "Automation", "Software", "CCTV & Security", "Solar Systems", "Healthcare IT"];
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
          description="IT infrastructure, AI, automation, software development, CCTV, solar and healthcare IT — delivered end-to-end."
        />

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem
                key={s.slug}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={
                    s.slug === "solar" ? "/solar" :
                    s.slug === "cctv" ? "/cctv" :
                    s.slug === "healthcare" ? "/healthcare" :
                    s.slug === "ai" ? "/ai" : "/services"
                  }
                  className="group glass rounded-3xl p-6 relative overflow-hidden block hover:shadow-glow-blue transition-shadow duration-300"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/5 blur-3xl group-hover:bg-brand-orange/15 transition-colors duration-500" />
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-primary">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {s.short}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                      <span className="transition-transform duration-300 group-hover:-translate-x-0.5">Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
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
          <span className="pill bg-orange-gradient text-white">Why Kolytech</span>
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
              "Certified engineers across networking, virtualization & AI systems",
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
    { icon: Compass, title: "Discover", body: "We listen first — objectives, constraints, budget position and what success looks like for your organisation." },
    { icon: Search, title: "Assess", body: "On-site survey, load audit and requirements capture with your team. Nothing is quoted from a questionnaire alone." },
    { icon: PenTool, title: "Design", body: "Detailed drawings, BOQ and a documented, phased rollout plan you can take to approval." },
    { icon: Wrench, title: "Deploy", body: "Clean installation by our engineers, with commissioning, testing and handover documentation." },
    { icon: LifeBuoy, title: "Support & Optimisation", body: "Training, monitoring, preventive maintenance and periodic reviews as your needs grow." },
  ];
  return (
    <section className="relative py-20 sm:py-28 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Our delivery methodology"
          title="A five-stage method,"
          accent="documented end-to-end."
          description="Every engagement follows the same disciplined path — no surprises, no shortcuts."
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <StaggerItem
              key={s.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="relative h-full">
                <div className="absolute -top-3 -left-3 h-9 w-9 rounded-full bg-orange-gradient grid place-items-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div className="h-11 w-11 rounded-2xl bg-brand-gradient grid place-items-center">
                  <s.icon className="h-5 w-5 text-white" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
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
      q: "Kolytech rebuilt our clinic network and EMR rollout. Zero downtime since day one.",
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

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Answers to what" accent="most clients ask." />
        <div className="mt-10 grid gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <button
                key={f.q}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="glass rounded-2xl p-5 text-left transition-all hover:shadow-glow-blue"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-primary">{f.q}</div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0"
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-brand-orange" aria-hidden />
                    ) : (
                      <Plus className="h-4 w-4 text-brand-orange" aria-hidden />
                    )}
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Looking for more depth? Read our{" "}
          <Link to="/knowledge" className="font-semibold text-brand-orange hover:underline">
            Knowledge Centre
          </Link>
          , browse{" "}
          <Link to="/industries" className="font-semibold text-brand-orange hover:underline">
            industry solutions
          </Link>{" "}
          or see recent{" "}
          <Link to="/case-studies" className="font-semibold text-brand-orange hover:underline">
            case studies
          </Link>
          .
        </p>
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
                Free consultation and professional assessment for IT Infrastructure,
                AI Solutions, Business Automation, CCTV, Healthcare IT, Web & Software
                Development, and Solar Power Solutions.
              </p>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg">
                Not sure where to start? KolyAssist walks you through a short consultation
                and produces a costed direction you can share internally.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <KolyAssistCTA variant="solid" label="✨ Launch KolyAssist" />
              <Link
                to="/contact"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-blue-gradient px-6 py-3 text-sm font-semibold text-white"
              >
                Book a consultation
              </Link>
              <a
                href="tel:+2348139135880"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4 text-brand-orange" /> +234 813 913 5880
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
