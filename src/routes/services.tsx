import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import { services } from "@/lib/services-data";
import infraImg from "@/assets/service-infra.jpg";
import { KolyAssistCTA } from "@/components/kolyassist";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — KolyTech Communications" },
      {
        name: "description",
        content:
          "IT Infrastructure, AI & Digital Solutions: network administration, systems support, AI & automation, software development, CCTV, solar and healthcare IT.",
      },
      { property: "og:title", content: "KolyTech Services" },
      { property: "og:description", content: "IT Infrastructure, AI, automation, software, CCTV, solar and healthcare IT services." },
    ],
  }),
  component: ServicesPage,
});

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
