import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { services } from "@/lib/services-data";
import { knowledgeArticles } from "@/lib/knowledge-data";
import { industries } from "@/lib/industries-data";
import { caseStudies } from "@/lib/case-studies-data";

type Result = { title: string; description: string; to: string; category: string };

const PAGES: Result[] = [
  { title: "Home", description: "Kolytech — IT Infrastructure, AI & Digital Solutions.", to: "/", category: "Page" },
  { title: "Services", description: "IT infrastructure, networking, AI & automation, software, CCTV, solar and healthcare IT.", to: "/services", category: "Page" },
  { title: "AI Solutions & Digital Innovation", description: "AI strategy, automation, chatbots, custom software, SaaS, UI/UX and digital transformation.", to: "/ai", category: "Page" },
  { title: "Solar Systems Installation", description: "Residential and commercial solar, hybrid and off-grid.", to: "/solar", category: "Page" },
  { title: "CCTV & Security Systems", description: "Smart security and complete protection for homes and business.", to: "/cctv", category: "Page" },
  { title: "Healthcare IT Solutions", description: "EMR deployment, clinical networks and data security.", to: "/healthcare", category: "Page" },
  { title: "About", description: "About Kolytech Communication.", to: "/about", category: "Page" },
  { title: "Contact", description: "Free consultation for IT Infrastructure, AI & Digital Solutions.", to: "/contact", category: "Page" },
  { title: "KolyAssist", description: "Your Intelligent Business Technology Advisor — a guided consultation that recommends the right solutions. Powered by Kolytech Communication.", to: "/ai", category: "Page" },

];

const FAQS: Result[] = [
  { title: "Do you handle both design and installation?", description: "Every project starts with an on-site assessment and design, then our engineers handle install and handover.", to: "/#faq", category: "FAQ" },
  { title: "Which regions do you cover?", description: "We serve clients across Nigeria from our Lagos base, with mobile project teams for larger deployments.", to: "/#faq", category: "FAQ" },
  { title: "Do you provide ongoing maintenance?", description: "Preventive and corrective maintenance contracts, 24/7 monitoring options, and periodic health checks.", to: "/#faq", category: "FAQ" },
];

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-brand-orange/20 text-brand-orange rounded px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const index: Result[] = useMemo(() => {
    const svc: Result[] = services.map((s) => ({
      title: s.title,
      description: s.short,
      to:
        s.slug === "solar" ? "/solar" :
        s.slug === "cctv" ? "/cctv" :
        s.slug === "healthcare" ? "/healthcare" : "/services",
      category: "Service",
    }));
    const guides: Result[] = knowledgeArticles.map((a) => ({
      title: a.title,
      description: a.summary,
      to: `/knowledge/${a.slug}`,
      category: "Guide",
    }));
    const sectors: Result[] = industries.map((i) => ({
      title: `${i.name} solutions`,
      description: i.intro,
      to: `/industries/${i.slug}`,
      category: "Industry",
    }));
    const stories: Result[] = caseStudies.map((c) => ({
      title: c.title,
      description: c.summary,
      to: `/case-studies/${c.slug}`,
      category: "Case study",
    }));
    return [...PAGES, ...svc, ...guides, ...sectors, ...stories, ...FAQS];
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Result[];
    return index
      .filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.category.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [q, index]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-foreground/70 hover:text-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 bg-background/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl border border-border bg-card shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, guides, industries, case studies…"
                className="flex-1 bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                aria-label="Search"
              />

              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {q.trim() === "" && (
                <div className="p-6 text-sm text-muted-foreground">
                  Try “AI”, “automation”, “software”, “solar”, “CCTV” or “EMR”.
                </div>
              )}
              {q.trim() !== "" && results.length === 0 && (
                <div className="p-6 text-sm text-muted-foreground">
                  No matches for “{q}”.
                </div>
              )}
              <ul>
                {results.map((r) => (
                  <li key={`${r.category}-${r.title}`}>
                    <Link
                      to={r.to}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 px-5 py-3 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-brand-orange">
                          {r.category}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {highlight(r.title, q)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {highlight(r.description, q)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:flex items-center justify-end gap-2 border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5">Esc</kbd>
              to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
