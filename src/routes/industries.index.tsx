import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero, SectionHeading } from "@/components/marketing";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { industries } from "@/lib/industries-data";
import { resolveImage } from "@/lib/asset-map";
import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema, url } from "@/lib/seo";
import infraImg from "@/assets/service-infra.jpg";

const DESCRIPTION =
  "Industry-specific technology solutions for healthcare, education, SMEs, enterprise, hospitality and religious organisations across Nigeria — infrastructure, security, power, AI and software.";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: pageMeta({
      title: "Industry Solutions — Healthcare, Education, Enterprise & More | Kolytech",
      description: DESCRIPTION,
      path: "/industries",
      ogTitle: "Industry Solutions — Kolytech Communication",
      ogDescription: DESCRIPTION,
    }),
    links: canonical("/industries"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "Industry Solutions",
          description: DESCRIPTION,
          path: "/industries",
        }),
      ),
      ldScript(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]),
      ),
      ldScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Kolytech industry solutions",
        itemListElement: industries.map((i, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: i.name,
          url: url(`/industries/${i.slug}`),
        })),
      }),
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow="Industry solutions"
        title="Built around how"
        accent="your sector works."
        subtitle="The same engineering discipline, sequenced differently for each sector — because a hospital, a campus and a hotel do not fail in the same way."
        image={infraImg}
        imageAlt="Nigerian engineers planning sector-specific technology infrastructure"
        tone="blue"
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
            ]}
          />

          <div className="mt-8">
            <SectionHeading
              title="Choose your"
              accent="sector."
              description="Each page covers the challenges we see, how we solve them and the outcomes clients get."
            />
          </div>

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <StaggerItem key={ind.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: ind.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-glow-blue"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={resolveImage(ind.image)}
                      alt={ind.imageAlt}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-primary">{ind.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {ind.intro}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                      View solutions
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
