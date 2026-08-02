import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import { CheckCircle2 } from "lucide-react";
import infraImg from "@/assets/service-infra.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: "About Kolytech Communication — IT Infrastructure, AI & Digital Solutions",
      description:
        "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering enterprise-grade infrastructure, network & security, AI, automation and software development across Nigeria.",
      path: "/about",
      ogTitle: "About Kolytech Communication",
      ogDescription: "Powering Infrastructure. Securing Systems. Driving Innovation.",
    }),
    links: canonical("/about"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "About Kolytech Communication",
          description:
            "Who we are: an IT Infrastructure, AI & Digital Solutions company serving organisations across Nigeria.",
          path: "/about",
        }),
      ),
      ldScript(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])),
    ],
  }),
  component: AboutPage,
});

const values = [
  "IT Infrastructure & network administration",
  "Network & security solutions",
  "AI solutions, chatbots & assistants",
  "Business & workflow automation",
  "Custom software, SaaS, web & mobile development",
  "Digital innovation & transformation",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="About Kolytech"
        title="IT Infrastructure, AI &"
        accent="Digital Solutions."
        subtitle="Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company — delivering enterprise-grade infrastructure, network & security, AI, business automation and software development to help organizations stay connected, intelligent and future-ready."
        image={infraImg}
        imageAlt="Enterprise infrastructure"
        tone="mixed"
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-xl font-bold">Our mission</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              To empower businesses across Nigeria and beyond with resilient
              infrastructure, modern security and clean energy — engineered by people
              who care about uptime, safety and outcomes.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-bold">Our approach</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We assess, design, deploy and support. Every project ends with clear
              documentation, trained users and a maintenance plan — because reliability
              is a promise, not a feature.
            </p>
          </GlassCard>
        </div>

        <div className="mx-auto max-w-6xl px-6 mt-14">
          <SectionHeading title="What we" accent="stand for." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map((v) => (
              <div key={v} className="glass rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
