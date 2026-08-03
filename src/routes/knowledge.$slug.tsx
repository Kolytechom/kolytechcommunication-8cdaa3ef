import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/motion";
import { KolyAssistCTA } from "@/components/kolyassist";
import { knowledgeArticles, knowledgeCategories, type KnowledgeArticle } from "@/lib/knowledge-data";
import { services } from "@/lib/services-data";
import { pageMeta, canonical, ldScript, breadcrumbSchema, url, SITE_URL, SITE_NAME } from "@/lib/seo";

const findArticle = (slug: string) => knowledgeArticles.find((a) => a.slug === slug);

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const article = findArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guide not found — Kolytech Communication" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const path = `/knowledge/${article.slug}`;
    return {
      meta: pageMeta({
        title: `${article.title} | Kolytech Knowledge Centre`,
        description: article.summary,
        path,
        ogType: "article",
      }),
      links: canonical(path),
      scripts: [
        ldScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          url: url(path),
          inLanguage: "en",
          author: { "@type": "Organization", name: SITE_NAME, "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: url(path),
        }),
        ldScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Knowledge Centre", path: "/knowledge" },
            { name: article.title, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="text-3xl font-black">That guide isn't available</h1>
        <p className="mt-3 text-muted-foreground">
          It may have been renamed. Browse the Knowledge Centre for the current library.
        </p>
        <Link
          to="/knowledge"
          className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white"
        >
          Knowledge Centre <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: KnowledgeArticle };
  const category = knowledgeCategories.find((c) => c.id === article.category);
  const related = services.filter((s) => article.relatedServices.includes(s.slug));
  const more = knowledgeArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Knowledge Centre", path: "/knowledge" },
              { name: category?.title ?? "Guide", path: "/knowledge" },
            ]}
          />

          <Reveal>
            <span className="pill mt-6 inline-block bg-brand-gradient text-white">
              {category?.title ?? "Guide"}
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-primary">
              {article.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{article.summary}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-orange" /> {article.readMinutes} min read
              </span>
              <span>Updated {article.updated}</span>
            </div>
          </Reveal>

          <Reveal className="mt-10 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Key takeaways
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {article.keyTakeaways.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="text-muted-foreground leading-relaxed">{k}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-10">
            {article.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {s.heading}
                </h2>
                <div className="mt-3 grid gap-4">
                  {s.body.map((p) => (
                    <p key={p} className="text-[15px] leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
                {s.points && (
                  <ul className="mt-4 grid gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                        <span className="text-muted-foreground leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>

          {related.length > 0 && (
            <Reveal className="mt-14">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Related services
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

          <Reveal className="mt-14 rounded-3xl border border-border bg-card p-7 text-center">
            <h2 className="text-2xl font-black tracking-tight">
              Apply this to <span className="gradient-text-brand">your organisation.</span>
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Run a two-minute KolyAssist consultation and get a tailored plan, or speak to an
              engineer directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <KolyAssistCTA label="Start a consultation" />
              <Link
                to="/contact"
                className="btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
              >
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              More from the Knowledge Centre
            </h2>
            <div className="mt-4 grid gap-3">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  to="/knowledge/$slug"
                  params={{ slug: a.slug }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand-orange/50"
                >
                  <span className="text-sm font-semibold text-foreground">{a.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-orange transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <Link
              to="/knowledge"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All guides
            </Link>
          </Reveal>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
