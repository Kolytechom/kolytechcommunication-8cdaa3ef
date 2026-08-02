import { pageMeta, canonical, ldScript, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Brain, Bot, Code2, Palette, Film } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, GlassCard, SectionHeading } from "@/components/marketing";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { aiCategories } from "@/lib/services-data";
import aiImg from "@/assets/service-ai.jpg";
import { KolyAssistCTA } from "@/components/kolyassist";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: pageMeta({
      title: "AI Solutions & Digital Innovation in Nigeria — Kolytech",
      description:
        "Practical AI for Nigerian businesses: AI strategy and assessment, chatbots and assistants, workflow automation, SaaS, web and mobile development, UI/UX design and digital transformation.",
      path: "/ai",
      ogTitle: "AI Solutions & Digital Innovation",
      ogDescription:
        "AI strategy, chatbots, workflow automation, software products, design and digital transformation.",
    }),
    links: canonical("/ai"),
    scripts: [
      ldScript(
        serviceSchema({
          name: "AI Solutions & Digital Innovation",
          serviceType: "Artificial intelligence and software development",
          description:
            "AI strategy and readiness assessment, AI chatbots and assistants, workflow automation, SaaS, web and mobile products, UI/UX design and digital transformation.",
          path: "/ai",
          offers: [
            "AI strategy & readiness assessment",
            "AI chatbots & assistants",
            "Business & workflow automation",
            "SaaS, web & mobile development",
            "UI/UX design & branding",
            "AI media & digital transformation",
          ],
        }),
      ),
      ldScript(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "AI Solutions & Digital Innovation", path: "/ai" },
        ]),
      ),
    ],
  }),
  component: AIPage,
});

const categoryIcons = [Brain, Bot, Code2, Palette, Film];

function AIPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="AI Solutions & Digital Innovation"
        title="Intelligent systems."
        accent="Real business outcomes."
        subtitle="Empower your organisation with practical Artificial Intelligence, automation, software development and digital solutions that improve productivity, streamline operations and accelerate business growth."
        image={aiImg}
        imageAlt="Nigerian AI engineer working with neural network visualisations"
        tone="mixed"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="btn-press inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
          >
            Book a free AI consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <KolyAssistCTA variant="glass" label="✨ Talk to KolyAssist" />
        </div>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we deliver"
            title="AI, automation and"
            accent="digital innovation."
            description="Five focused practices — from strategy through build, launch and transformation."
          />

          <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aiCategories.map((cat, i) => {
              const Icon = categoryIcons[i % categoryIcons.length];
              return (
                <StaggerItem
                  key={cat.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassCard className="group h-full flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl group-hover:bg-brand-orange/20 transition-colors duration-500" />
                    <div className="relative flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center shadow-glow-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-primary">{cat.title}</h3>
                    </div>
                    <ul className="relative grid gap-2 mt-1">
                      {cat.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-auto pt-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange"
                      >
                        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                          Learn more
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-16 bg-secondary/60">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <SectionHeading
            eyebrow="Ready to build?"
            title="Let's design your"
            accent="AI advantage."
            description="From readiness assessment to production rollout, our team helps you adopt AI with confidence."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="btn-press inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
            >
              Talk to our AI team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
            >
              All services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
