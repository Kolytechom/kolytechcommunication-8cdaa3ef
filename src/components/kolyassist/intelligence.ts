import { services, type Service } from "@/lib/services-data";
import {
  labelForNeed,
  budgetOptions,
  confidenceOptions,
  driverOptions,
  maturityOptions,
  objectiveOptions,
} from "./data";

export { budgetOptions, confidenceOptions, driverOptions, maturityOptions, objectiveOptions };

/* -------------------------------------------------------------------------- */
/*  Industry intelligence                                                     */
/* -------------------------------------------------------------------------- */


export type IndustryProfile = {
  id: string;
  label: string;
  /** Consultation language used in the advisor note. */
  language: string;
  /** Service slugs in the order they should normally be delivered. */
  priority: string[];
  benefits: string[];
  complementary: string[];
};

const INDUSTRY_PROFILES: Record<string, IndustryProfile> = {
  healthcare: {
    id: "healthcare",
    label: "Healthcare",
    language:
      "Clinical environments cannot tolerate downtime, so we sequence work around patient care and protect records at every step.",
    priority: ["healthcare", "infrastructure", "solar", "cctv", "support", "ai"],
    benefits: [
      "Continuous availability for clinical systems",
      "Protected patient records and audit trails",
      "Faster patient throughput across departments",
    ],
    complementary: ["Backup power resilience", "Records digitisation", "Staff IT training"],
  },
  education: {
    id: "education",
    label: "Education",
    language:
      "Campuses need broad coverage on a tight budget, so we prioritise shared infrastructure that serves every faculty.",
    priority: ["infrastructure", "cctv", "solar", "ai", "support", "healthcare"],
    benefits: [
      "Reliable campus-wide connectivity",
      "Safer premises for students and staff",
      "Lower recurring running costs",
    ],
    complementary: ["Campus Wi-Fi expansion", "E-learning portal", "Access control"],
  },
  corporate: {
    id: "corporate",
    label: "Corporate",
    language:
      "Enterprise operations depend on governance and uptime, so we build with documentation, controls and scale in mind.",
    priority: ["infrastructure", "support", "ai", "cctv", "solar", "healthcare"],
    benefits: [
      "Measurable productivity gains across teams",
      "Consolidated, well-governed IT estate",
      "Predictable support and escalation paths",
    ],
    complementary: ["Business continuity planning", "Workflow automation", "Managed support"],
  },
  hospitality: {
    id: "hospitality",
    label: "Hospitality",
    language:
      "Guest experience is the product, so we prioritise visible reliability — power, Wi-Fi and security that guests notice.",
    priority: ["solar", "infrastructure", "cctv", "ai", "support", "healthcare"],
    benefits: [
      "Uninterrupted guest services",
      "Stronger property security",
      "Better online booking experience",
    ],
    complementary: ["Guest Wi-Fi portal", "Booking platform", "CCTV monitoring"],
  },
  manufacturing: {
    id: "manufacturing",
    label: "Manufacturing",
    language:
      "Production lines are the priority, so we design for continuity, monitoring and safe plant-floor coverage.",
    priority: ["infrastructure", "solar", "cctv", "ai", "support", "healthcare"],
    benefits: [
      "Reduced unplanned production downtime",
      "Real-time visibility across the plant",
      "Lower energy and maintenance costs",
    ],
    complementary: ["Inventory automation", "Plant surveillance", "Power monitoring"],
  },
  retail: {
    id: "retail",
    label: "Retail",
    language:
      "Retail runs on throughput and loss prevention, so we focus on fast, secure customer-facing systems.",
    priority: ["cctv", "infrastructure", "ai", "solar", "support", "healthcare"],
    benefits: [
      "Reduced shrinkage and loss",
      "Faster checkout and stock visibility",
      "More sales through digital channels",
    ],
    complementary: ["E-commerce storefront", "Stock management", "Customer analytics"],
  },
  government: {
    id: "government",
    label: "Government & Public Sector",
    language:
      "Public sector delivery is accountability driven, so we document every stage and design for compliance and audit.",
    priority: ["infrastructure", "cctv", "support", "ai", "solar", "healthcare"],
    benefits: [
      "Audit-ready systems and documentation",
      "Secure handling of citizen data",
      "Improved service delivery to the public",
    ],
    complementary: ["Access control", "Records digitisation", "Continuity planning"],
  },
  religious: {
    id: "religious",
    label: "Religious Organisation",
    language:
      "Congregational facilities need dependable, affordable systems that volunteers can operate confidently.",
    priority: ["cctv", "solar", "infrastructure", "ai", "support", "healthcare"],
    benefits: [
      "Safer premises during gatherings",
      "Reliable power for services and media",
      "Wider reach through digital channels",
    ],
    complementary: ["Media streaming setup", "Backup power", "Volunteer IT training"],
  },
  sme: {
    id: "sme",
    label: "Small & Medium Business",
    language:
      "Lean teams need quick wins, so we stage delivery to keep costs controlled while value lands early.",
    priority: ["infrastructure", "ai", "cctv", "solar", "support", "healthcare"],
    benefits: [
      "Immediate day-to-day efficiency gains",
      "Costs staged across phases",
      "A platform that grows with the business",
    ],
    complementary: ["Business website", "Process automation", "Remote support plan"],
  },
};

/** Maps the organisation answer to an industry profile. */
const ORG_TO_INDUSTRY: Record<string, string> = {
  healthcare: "healthcare",
  education: "education",
  enterprise: "corporate",
  government: "government",
  hospitality: "hospitality",
  manufacturing: "manufacturing",
  retail: "retail",
  religious: "religious",
  sme: "sme",
  startup: "sme",
};

export function industryFor(organisation: string): IndustryProfile {
  return INDUSTRY_PROFILES[ORG_TO_INDUSTRY[organisation] ?? "sme"] ?? INDUSTRY_PROFILES.sme;
}

/* -------------------------------------------------------------------------- */
/*  Recommendation engine                                                     */
/* -------------------------------------------------------------------------- */

export type ConsultationContext = {
  needs: string[];
  organisation: string;
  scale: string;
  timeline: string;
  objectives: string[];
  maturity: string;
  confidence: string;
  driver: string;
  budget: string;
};

export type Recommendation = {
  industry: IndustryProfile;
  headline: string;
  advisorNote: string;
  solutions: Service[];
  rationale: string[];
  benefits: string[];
  order: { service: Service; phase: string; note: string }[];
  complementary: string[];
  estimate: string;
  nextStep: string;
  /** 0–100 — how complete the captured context is. */
  confidenceScore: number;
  confidenceReasons: string[];
};

const needToSlug: Record<string, string> = {
  ai: "ai",
  website: "ai",
  mobile: "ai",
  software: "ai",
  cctv: "cctv",
  network: "infrastructure",
  solar: "solar",
  healthcare: "healthcare",
  strategy: "support",
};

const OBJECTIVE_BENEFIT: Record<string, string> = {
  security: "Tighter physical and digital security posture",
  productivity: "Teams spend less time on manual, repetitive work",
  cost: "Lower recurring operating and energy costs",
  modernise: "A modern, supportable technology foundation",
  cx: "A noticeably better experience for your customers",
  automate: "Automated processes with fewer handoffs and errors",
  expansion: "Capacity to open new sites without rebuilding",
  compliance: "Evidence and controls that stand up to audit",
};

const MATURITY_NOTE: Record<string, string> = {
  manual: "Because most work is still manual, we start with foundations and quick, visible wins.",
  partial:
    "With systems partly digital, we focus on joining what already works before adding anything new.",
  digital:
    "As a mostly digital organisation, the value is in optimisation, integration and automation.",
  automated:
    "Already highly automated, so we target advanced AI, analytics and resilience improvements.",
};

const DRIVER_NOTE: Record<string, string> = {
  new: "This is a greenfield build, so we design once and size it for growth.",
  expansion: "Expansion is the trigger, so every element is specified to replicate at new sites.",
  upgrade: "This is an upgrade, so we protect what works and phase out only what limits you.",
  compliance: "Compliance is the driver, so documentation and controls lead the delivery plan.",
  emergency:
    "This is an urgent replacement, so we prioritise a rapid stabilisation phase before optimisation.",
};

const CONFIDENCE_NOTE: Record<string, string> = {
  full: "We'll keep every explanation in plain business language.",
  moderate: "We'll balance business outcomes with the technical detail behind them.",
  technical: "Our engineers will go straight into architecture and specifications with you.",
};

function estimateTimeline(ctx: ConsultationContext, count: number): string {
  let weeks = 2 + count * 2;
  if (ctx.scale === "multi") weeks += 3;
  if (ctx.scale === "national") weeks += 6;
  if (ctx.driver === "emergency") weeks = Math.max(1, Math.round(weeks * 0.6));
  const low = Math.max(1, weeks - 2);
  const high = weeks + 3;
  return `Approximately ${low}–${high} weeks from approval (estimate only — confirmed after site assessment).`;
}

export function buildRecommendation(ctx: ConsultationContext): Recommendation {
  const industry = industryFor(ctx.organisation);

  const slugs = new Set(ctx.needs.map((n) => needToSlug[n]).filter(Boolean));
  if (ctx.organisation === "healthcare") slugs.add("healthcare");
  if (ctx.objectives.includes("security")) slugs.add("cctv");
  if (ctx.objectives.includes("automate") || ctx.objectives.includes("cx")) slugs.add("ai");
  if (ctx.objectives.includes("cost")) slugs.add("solar");
  if (slugs.size === 0) slugs.add("ai");

  const ordered = industry.priority
    .filter((s) => slugs.has(s))
    .concat([...slugs].filter((s) => !industry.priority.includes(s)));

  const solutions = ordered
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
    .slice(0, 4);

  /* Why it fits */
  const rationale: string[] = [];
  if (ctx.needs.length)
    rationale.push(
      `You asked about ${ctx.needs.map(labelForNeed).join(", ").toLowerCase()}, which maps directly to the solutions below.`,
    );
  rationale.push(industry.language);
  if (MATURITY_NOTE[ctx.maturity]) rationale.push(MATURITY_NOTE[ctx.maturity]);
  if (DRIVER_NOTE[ctx.driver]) rationale.push(DRIVER_NOTE[ctx.driver]);
  if (CONFIDENCE_NOTE[ctx.confidence]) rationale.push(CONFIDENCE_NOTE[ctx.confidence]);

  /* Benefits */
  const objectiveBenefits = ctx.objectives.map((o) => OBJECTIVE_BENEFIT[o]).filter(Boolean);
  const benefits = [...new Set([...objectiveBenefits, ...industry.benefits])].slice(0, 5);

  /* Implementation order */
  const phases = ["Phase 1 — Foundation", "Phase 2 — Build", "Phase 3 — Extend", "Phase 4 — Optimise"];
  const order = solutions.map((service, i) => ({
    service,
    phase: phases[i] ?? `Phase ${i + 1}`,
    note:
      i === 0
        ? "Site assessment, design sign-off and the core deployment this project depends on."
        : i === solutions.length - 1
          ? "Delivered last, with documentation, training and handover."
          : "Layered on once the previous phase is stable and accepted.",
  }));

  /* Confidence indicator */
  const signals: [boolean, string][] = [
    [ctx.needs.length > 0, "Services you selected"],
    [!!ctx.organisation, "Organisation and industry profile"],
    [ctx.objectives.length > 0, "Primary business objectives"],
    [!!ctx.maturity, "Current digital maturity"],
    [!!ctx.driver, "What is driving the project"],
    [!!ctx.scale, "Number of locations"],
    [!!ctx.timeline, "Preferred start timeline"],
    [!!ctx.budget, "Budget position"],
  ];
  const met = signals.filter(([ok]) => ok);
  const confidenceScore = Math.round((met.length / signals.length) * 100);

  const budgetLine =
    ctx.budget === "unknown"
      ? " We'll include phased costing options so budget can be approved in stages."
      : "";

  return {
    industry,
    headline: `${industry.label} technology plan`,
    advisorNote: `${industry.language}${budgetLine}`,
    solutions,
    rationale,
    benefits,
    order,
    complementary: industry.complementary,
    estimate: estimateTimeline(ctx, solutions.length),
    nextStep:
      ctx.driver === "emergency" || ctx.timeline === "urgent"
        ? "Request a call today — we can schedule an emergency site assessment within 48 hours."
        : "Book a free consultation so a Kolytech specialist can validate this plan on site.",
    confidenceScore,
    confidenceReasons: met.map(([, label]) => label),
  };
}
