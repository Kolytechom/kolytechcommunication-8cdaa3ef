import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, SectionHeading } from "@/components/marketing";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { caseStudies } from "@/lib/case-studies-data";
import { resolveImage } from "@/lib/asset-map";
import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema, url } from "@/lib/seo";
import retailImg from "@/assets/project-retail-it.jpg";

const DESCRIPTION =
  "Real Kolytech Communication projects across Nigeria — the challenge, what we delivered and the measurable outcome, for enterprise, healthcare, retail, education and SME clients.";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: pageMeta({
      title: "Case Studies — Delivered IT, Security & Solar Projects | Kolytech",
      description: DESCRIPTION,
      path: "/case-studies",
      ogTitle: "Kolytech Case Studies",
      ogDescription: DESCRIPTION,
    }),
    links: canonical("/case-studies"),
    scripts: [
      ldScript(
        webPageSchema({ name: "Case Studies", description: DESCRIPTION, path: "/case-studies" }),
      ),
      ldScript(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]),
      ),
      ldScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Kolytech Communication case studies",
        itemListElement: caseStudies.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: url(`/case-studies/${c.slug}`),
        })),
      }),
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Case studies"
        title="Projects, outcomes"
        accent="and the evidence."
        subtitle="Challenge, solution and measurable outcome for work delivered across Lagos and the wider country."
        image={retailImg}
        imageAlt="Nigerian IT engineers reviewing a completed project deployment"
        tone="orange"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
            ]}
          />

          <div className="mt-8">
            <SectionHeading
              title="Selected"
              accent="engagements."
              description="Client names are withheld where confidentiality applies; the figures are not."
            />
          </div>

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {caseStudies.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-glow-orange"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={resolveImage(c.image)}
                      alt={c.imageAlt}
                      loading="lazy"
                      width={900}
                      height={506}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {c.sector} · {c.location} · {c.duration}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-primary leading-snug">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {c.summary}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {c.outcome.map((o) => (
                        <div key={o.label} className="rounded-2xl bg-secondary p-2.5 text-center">
                          <div className="text-sm font-black text-brand-orange">{o.metric}</div>
                          <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                            {o.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                      Read the full story
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
