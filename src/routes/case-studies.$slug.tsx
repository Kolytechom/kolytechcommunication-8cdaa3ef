import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Target } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { KolyAssistCTA } from "@/components/kolyassist";
import { caseStudies, type CaseStudy } from "@/lib/case-studies-data";
import { resolveImage } from "@/lib/asset-map";
import { pageMeta, canonical, ldScript, breadcrumbSchema, url, SITE_URL, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Kolytech Communication" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { study } = loaderData;
    const path = `/case-studies/${study.slug}`;
    return {
      meta: pageMeta({
        title: `${study.title} | Kolytech Case Study`,
        description: study.summary,
        path,
        ogType: "article",
      }),
      links: canonical(path),
      scripts: [
        ldScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.summary,
          url: url(path),
          inLanguage: "en",
          author: { "@type": "Organization", name: SITE_NAME, "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: url(path),
        }),
        ldScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: study.title, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: StudyNotFound,
  component: CaseStudyPage,
});

function StudyNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="text-3xl font-black">That case study isn't available</h1>
        <Link
          to="/case-studies"
          className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white"
        >
          All case studies <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: study.sector, path: "/case-studies" },
            ]}
          />

          <Reveal>
            <span className="pill mt-6 inline-block bg-orange-gradient text-white">
              {study.sector}
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-primary">
              {study.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{study.summary}</p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <Meta label="Client" value={study.client} />
              <Meta label="Location" value={study.location} />
              <Meta label="Duration" value={study.duration} />
            </dl>
          </Reveal>

          <Reveal className="mt-10 overflow-hidden rounded-[2rem] border border-border">
            <img
              src={resolveImage(study.image)}
              alt={study.imageAlt}
              loading="lazy"
              width={1400}
              height={790}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">
              The <span className="gradient-text-brand">challenge.</span>
            </h2>
            <div className="mt-3 grid gap-3">
              {study.challenge.map((c) => (
                <p key={c} className="text-[15px] leading-relaxed text-muted-foreground">
                  {c}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">
              Our <span className="gradient-text-brand">solution.</span>
            </h2>
          </Reveal>
          <StaggerGroup className="mt-5 grid gap-4 md:grid-cols-3">
            {study.solution.map((s) => (
              <StaggerItem
                key={s.title}
                className="rounded-3xl border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white">
                  <Target className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-black tracking-tight">
              The <span className="gradient-text-brand">outcome.</span>
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {study.outcome.map((o) => (
                <div
                  key={o.label}
                  className="rounded-3xl border border-border bg-card p-5 text-center"
                >
                  <div className="text-2xl font-black text-brand-orange">{o.metric}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{o.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {study.outcomeNarrative.map((n) => (
                <p key={n} className="text-[15px] leading-relaxed text-muted-foreground">
                  {n}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Services delivered
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {study.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-black tracking-tight">
              Have a similar <span className="gradient-text-brand">requirement?</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Start a KolyAssist consultation and we will map this approach onto your environment.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <KolyAssistCTA label="Start consultation" />
              <Link
                to="/contact"
                className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
              >
                Book an assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              More case studies
            </h2>
            <div className="mt-4 grid gap-3">
              {more.map((c) => (
                <Link
                  key={c.slug}
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand-orange/50"
                >
                  <span className="text-sm font-semibold text-foreground">{c.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-orange transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <Link
              to="/case-studies"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All case studies
            </Link>
          </Reveal>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
