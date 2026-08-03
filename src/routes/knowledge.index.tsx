import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, SectionHeading } from "@/components/marketing";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { EASE } from "@/lib/motion";
import { knowledgeArticles, knowledgeCategories } from "@/lib/knowledge-data";
import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema, url } from "@/lib/seo";
import aiImg from "@/assets/service-ai.jpg";

const TITLE = "Knowledge Centre — IT, AI, Security & Power Guides | Kolytech Communication";
const DESCRIPTION =
  "Practical guides on IT infrastructure, CCTV design, AI and automation, hybrid solar sizing and healthcare IT — written by the engineers who deliver these projects in Nigeria.";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      path: "/knowledge",
      ogTitle: "Kolytech Knowledge Centre",
      ogDescription: DESCRIPTION,
    }),
    links: canonical("/knowledge"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "Kolytech Knowledge Centre",
          description: DESCRIPTION,
          path: "/knowledge",
        }),
      ),
      ldScript(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Knowledge Centre", path: "/knowledge" },
        ]),
      ),
      ldScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Kolytech Knowledge Centre articles",
        itemListElement: knowledgeArticles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: a.title,
          url: url(`/knowledge/${a.slug}`),
        })),
      }),
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const [category, setCategory] = useState("all");
  const filtered = useMemo(
    () =>
      category === "all"
        ? knowledgeArticles
        : knowledgeArticles.filter((a) => a.category === category),
    [category],
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Engineering guidance,"
        accent="not marketing copy."
        subtitle="Field-tested guidance on infrastructure, security, AI, power and healthcare IT — written from projects delivered across Nigeria."
        image={aiImg}
        imageAlt="Nigerian engineers reviewing network documentation in a Lagos office"
        tone="mixed"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Knowledge Centre", path: "/knowledge" },
            ]}
          />

          <div className="mt-8">
            <SectionHeading
              title="Browse by"
              accent="topic."
              description="Every article ends with the services and next steps it relates to."
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <FilterChip
              label="All topics"
              active={category === "all"}
              onClick={() => setCategory("all")}
            />
            {knowledgeCategories.map((c) => (
              <FilterChip
                key={c.id}
                label={c.title}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              />
            ))}
          </div>

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((a) => (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE.out }}
                >
                  <StaggerItem>
                    <Link
                      to="/knowledge/$slug"
                      params={{ slug: a.slug }}
                      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-glow-blue"
                    >
                      <span className="pill bg-brand-gradient text-white w-fit">
                        {knowledgeCategories.find((c) => c.id === a.category)?.title ?? "Guide"}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-primary leading-snug">{a.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                        {a.summary}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-brand-orange" /> {a.readMinutes} min read
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-orange">
                          Read guide
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerGroup>

          <Reveal className="mt-14 rounded-3xl border border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-brand-orange" aria-hidden />
            <h3 className="mt-4 text-2xl font-black tracking-tight">
              Want this applied to <span className="gradient-text-brand">your site?</span>
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Every guide reflects how we actually deliver. Book an assessment and we will apply it
              to your environment.
            </p>
            <Link
              to="/contact"
              className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
        active
          ? "border-brand-orange bg-orange-gradient text-white shadow-glow-orange"
          : "border-border bg-card text-muted-foreground hover:text-foreground hover:-translate-y-0.5"
      }`}
    >
      {label}
    </button>
  );
}
