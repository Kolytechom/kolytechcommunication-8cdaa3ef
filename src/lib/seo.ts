/** Central SEO helpers: canonical URLs, per-page meta and JSON-LD builders. */

export const SITE_URL = "https://koytechcommunications.lovable.app";
export const SITE_NAME = "Kolytech Communication";

export const BUSINESS = {
  name: SITE_NAME,
  email: "kolytechcom@yahoo.com",
  telephone: "+2348139135880",
  city: "Lagos",
  country: "NG",
  areaServed: "Nigeria",
  description:
    "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering network & security, AI, business automation, software development, CCTV, solar power and healthcare IT across Nigeria.",
};

export const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

type MetaTag = Record<string, string>;

/** Builds a complete, unique meta set for a leaf route. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}): MetaTag[] {
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:url", content: url(opts.path) },
    { property: "og:type", content: opts.ogType ?? "website" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
  ];
}

export const canonical = (path: string) => [{ rel: "canonical", href: url(path) }];

/* ------------------------------- JSON-LD ---------------------------------- */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: BUSINESS.description,
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  areaServed: BUSINESS.areaServed,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressCountry: BUSINESS.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    areaServed: BUSINESS.areaServed,
    availableLanguage: "English",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  description: BUSINESS.description,
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressCountry: BUSINESS.country,
  },
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "City", name: "Lagos" },
  ],
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

export function webPageSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url(opts.path)}#webpage`,
    name: opts.name,
    description: opts.description,
    url: url(opts.path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: url(t.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  offers?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: url(opts.path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Nigeria" },
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o },
            })),
          },
        }
      : {}),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const ldScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
