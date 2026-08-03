import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { industries } from "@/lib/industries-data";
import { knowledgeArticles } from "@/lib/knowledge-data";
import { caseStudies } from "@/lib/case-studies-data";

const BASE_URL = "https://koytechcommunications.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/ai", changefreq: "monthly", priority: "0.9" },
  { path: "/cctv", changefreq: "monthly", priority: "0.8" },
  { path: "/solar", changefreq: "monthly", priority: "0.8" },
  { path: "/healthcare", changefreq: "monthly", priority: "0.8" },
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  ...industries.map((i) => ({
    path: `/industries/${i.slug}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  { path: "/knowledge", changefreq: "weekly", priority: "0.8" },
  ...knowledgeArticles.map((a) => ({
    path: `/knowledge/${a.slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
  ...caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    changefreq: "yearly" as const,
    priority: "0.6",
  })),
  { path: "/about", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path === "/" ? "/" : e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
