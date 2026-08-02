/** Shared FAQ content — rendered on the homepage and emitted as FAQPage JSON-LD. */

export type Faq = { q: string; a: string; category: string };

export const faqCategories = ["General", "Delivery", "Support", "AI & Software"] as const;

export const faqs: Faq[] = [
  {
    category: "General",
    q: "Do you handle both design and installation?",
    a: "Yes. Every project starts with an on-site assessment and design, then our own engineers handle installation, commissioning and handover.",
  },
  {
    category: "General",
    q: "Which regions do you cover?",
    a: "We serve clients across Nigeria from our Lagos base, with project teams that mobilize nationwide for larger deployments.",
  },
  {
    category: "General",
    q: "How long has Kolytech Communication been operating?",
    a: "We have delivered IT infrastructure, security, power and digital projects for over 18 years, across healthcare, education, enterprise, hospitality and public sector clients.",
  },
  {
    category: "Support",
    q: "Do you provide ongoing maintenance?",
    a: "We offer preventive and corrective maintenance contracts, 24/7 monitoring options and periodic health checks for every system we install.",
  },
  {
    category: "Delivery",
    q: "Can you work with our existing vendors and equipment?",
    a: "Absolutely. We are vendor-neutral and regularly integrate with existing infrastructure, cabling and hardware.",
  },
  {
    category: "Delivery",
    q: "Can a project be delivered in phases?",
    a: "Yes. Most engagements are phased so that value lands early and budget can be approved in stages. Your consultation report includes a suggested implementation order.",
  },
  {
    category: "AI & Software",
    q: "Where does AI actually make sense for our business?",
    a: "AI pays for itself fastest on high-volume, rule-bound work — enquiry triage, document extraction, scheduling and internal support. We assess readiness before recommending anything.",
  },
  {
    category: "AI & Software",
    q: "Do you build websites and custom software as well?",
    a: "Yes. Web, mobile, SaaS and custom software sit inside our AI Solutions & Digital Innovation practice, alongside UI/UX design and business automation.",
  },
];

export const faqsByCategory = (category: string) => faqs.filter((f) => f.category === category);
