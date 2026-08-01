import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import { services } from "@/lib/services-data";
import infraImg from "@/assets/service-infra.jpg";
import { KolyAssistCTA } from "@/components/kolyassist";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: pageMeta({
      title: "IT, AI, CCTV & Solar Services — KolyTech Communications",
      description:
        "IT Infrastructure, AI & Digital Solutions services: network administration, systems support, AI & automation, software development, CCTV security, solar power and healthcare IT.",
      path: "/services",
      ogTitle: "KolyTech Services — Infrastructure, AI, Security, Solar",
      ogDescription: "IT Infrastructure, AI, automation, software, CCTV, solar and healthcare IT services.",
    }),
    links: canonical("/services"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "KolyTech Services",
          description:
            "The full KolyTech service portfolio across infrastructure, support, AI, security, solar and healthcare IT.",
          path: "/services",
        }),
      ),
      ldScript(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])),
      ...services.map((s) =>
        ldScript(
          serviceSchema({
            name: s.title,
            description: s.short,
            path: "/services",
            offers: s.bullets,
          }),
        ),
      ),
    ],
  }),
  component: ServicesPage,
});

/** Services that have a dedicated deep-dive page. */
const detailPages = {
  ai: "/ai",
  cctv: "/cctv",
  solar: "/solar",
  healthcare: "/healthcare",
} as const;

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Our services"
        title="A full technology"
        accent="stack for your business."
        subtitle="From core infrastructure to solar power and clinical IT — one team, one accountable partner, delivered with enterprise discipline."
        image={infraImg}
        imageAlt="Enterprise infrastructure"
        tone="mixed"
      >
        <KolyAssistCTA label="✨ Talk to KolyAssist" />
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Everything KolyTech"
            accent="does under one roof."
            description="Every engagement starts with a site assessment and ends with documentation, training and ongoing support."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <GlassCard key={s.slug} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center shadow-glow-blue">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.short}</p>
                    </div>
                  </div>
                  <ul className="grid gap-2 mt-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {s.slug in detailPages && (
                    <Link
                      to={detailPages[s.slug as keyof typeof detailPages]}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline"
                    >
                      Explore {s.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
