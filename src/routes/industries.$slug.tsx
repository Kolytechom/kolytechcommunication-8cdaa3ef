import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, Wrench } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PageHero } from "@/components/marketing";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { KolyAssistCTA } from "@/components/kolyassist";
import { industries, type Industry } from "@/lib/industries-data";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import { resolveImage } from "@/lib/asset-map";
import { pageMeta, canonical, ldScript, breadcrumbSchema, serviceSchema } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Industry not found — Kolytech Communication" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { industry } = loaderData;
    const path = `/industries/${industry.slug}`;
    const title = `${industry.name} IT Solutions in Nigeria | Kolytech Communication`;
    return {
      meta: pageMeta({ title, description: industry.intro, path }),
      links: canonical(path),
      scripts: [
        ldScript(
          serviceSchema({
            name: `${industry.name} technology solutions`,
            description: industry.intro,
            path,
            serviceType: `${industry.name} IT solutions`,
            offers: industry.solutions.map((s) => s.title),
          }),
        ),
        ldScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: IndustryNotFound,
  component: IndustryPage,
});

function IndustryNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="text-3xl font-black">That industry page isn't available</h1>
        <Link
          to="/industries"
          className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white"
        >
          All industries <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function IndustryPage() {
  const { industry } = Route.useLoaderData() as { industry: Industry };
  const related = services.filter((s) => industry.services.includes(s.slug));
  const stories = caseStudies
    .filter((c) => c.sector.toLowerCase().includes(industry.name.split(" ")[0].toLowerCase()))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <PageHero
        eyebrow={industry.eyebrow}
        title={industry.headline}
        accent={industry.accent}
        subtitle={industry.intro}
        image={resolveImage(industry.image)}
        imageAlt={industry.imageAlt}
        tone="mixed"
      >
        <div className="flex flex-wrap gap-3">
          <KolyAssistCTA label="Get a tailored plan" />
          <Link
            to="/contact"
            className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
          >
            Book an assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]}
          />

          <Reveal className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Challenges we see in <span className="gradient-text-brand">{industry.name.toLowerCase()}.</span>
            </h2>
          </Reveal>
          <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-3">
            {industry.challenges.map((c) => (
              <StaggerItem
                key={c.title}
                className="rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <AlertTriangle className="h-5 w-5 text-brand-orange" aria-hidden />
                <h3 className="mt-3 text-base font-bold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              How we <span className="gradient-text-brand">solve them.</span>
            </h2>
          </Reveal>
          <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-3">
            {industry.solutions.map((s) => (
              <StaggerItem
                key={s.title}
                className="rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-white">
                  <Wrench className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 text-base font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16 rounded-3xl border border-border bg-card p-7">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Outcomes clients get
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {industry.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {related.length > 0 && (
            <Reveal className="mt-16">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Services involved
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      to="/services"
                      className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/50"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-primary">{s.title}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{s.short}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          )}

          {stories.length > 0 && (
            <Reveal className="mt-16">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Related case studies
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {stories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/case-studies/$slug"
                    params={{ slug: c.slug }}
                    className="group rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/50"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {c.sector} · {c.location}
                    </p>
                    <p className="mt-1.5 text-sm font-bold text-primary">{c.title}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                      Read the case study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-16 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-black tracking-tight">
              Ready for a <span className="gradient-text-brand">{industry.name.toLowerCase()} plan?</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              KolyAssist builds a phased, sector-aware recommendation in about two minutes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <KolyAssistCTA label="Start consultation" />
              <Link
                to="/contact"
                className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
