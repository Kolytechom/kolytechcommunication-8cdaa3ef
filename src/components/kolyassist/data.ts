import { services, type Service } from "@/lib/services-data";

export type Option = { id: string; label: string; hint?: string };

/** All services a visitor can pick in step 2. */
export const needOptions: Option[] = [
  { id: "ai", label: "AI Solutions & Automation", hint: "Chatbots, assistants, workflow automation" },
  { id: "cctv", label: "CCTV & Security", hint: "IP cameras, access control, monitoring" },
  { id: "network", label: "Network Infrastructure", hint: "LAN/WAN, Wi-Fi, servers, cabling" },
  { id: "healthcare", label: "Healthcare IT", hint: "HMIS/EMR, clinical networks, uptime" },
  { id: "solar", label: "Solar & Power Backup", hint: "Inverters, batteries, hybrid systems" },
  { id: "website", label: "Website Development", hint: "Corporate, e-commerce, portals" },
  { id: "mobile", label: "Mobile App Development", hint: "Android, iOS, cross-platform" },
  { id: "software", label: "Custom Software Development", hint: "ERP, CRM, HMIS, workflow tools" },
  { id: "strategy", label: "IT Strategy & Consultancy", hint: "Audits, roadmaps, continuity" },
];

export type QuestionDef = {
  id: string;
  title: string;
  hint?: string;
  type: "single" | "multi";
  options: Option[];
  optional?: boolean;
};

const q = (
  id: string,
  title: string,
  type: "single" | "multi",
  options: (string | Option)[],
  extra: { hint?: string; optional?: boolean } = {},
): QuestionDef => ({
  id,
  title,
  type,
  ...extra,
  options: options.map((o) =>
    typeof o === "string" ? { id: o.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: o } : o,
  ),
});

/* ------------------------- Shared (merged) questions ------------------------ */

export const organisationOptions: Option[] = [
  { id: "sme", label: "Small or medium business" },
  { id: "enterprise", label: "Large enterprise" },
  { id: "healthcare", label: "Hospital or clinic" },
  { id: "government", label: "Government or public sector" },
  { id: "education", label: "School or university" },
  { id: "startup", label: "Startup or new venture" },
];

export const scaleOptions: Option[] = [
  { id: "single", label: "One site or office" },
  { id: "multi", label: "Multiple sites" },
  { id: "national", label: "Nationwide operation" },
];

export const timelineOptions: Option[] = [
  { id: "urgent", label: "Urgent — within 2 weeks" },
  { id: "quarter", label: "This quarter" },
  { id: "planning", label: "Planning & budgeting" },
];

const SHARED: Record<string, QuestionDef> = {
  organisation: {
    id: "organisation",
    title: "Tell me about your organisation.",
    hint: "Choose the closest match.",
    type: "single",
    options: organisationOptions,
  },
  scale: {
    id: "scale",
    title: "How many locations does this cover?",
    type: "single",
    options: scaleOptions,
  },
  timeline: {
    id: "timeline",
    title: "When would you like to start?",
    type: "single",
    options: timelineOptions,
  },
  project_stage: q("project_stage", "Is this a new project or an upgrade?", "single", [
    { id: "new", label: "Brand new installation / build" },
    { id: "upgrade", label: "Upgrade or extend what we have" },
    { id: "rescue", label: "Fix an existing system" },
  ]),
};

/* ------------------------- Service-specific questions ----------------------- */

const SERVICE_QUESTIONS: Record<string, QuestionDef[]> = {
  cctv: [
    q("cctv_coverage", "Where do the cameras go?", "single", ["Indoor", "Outdoor", "Mixed"]),
    q("cctv_count", "Approximate number of cameras?", "single", [
      "1–8",
      "9–24",
      "25–64",
      "65+",
      "Not sure yet",
    ]),
    q("cctv_remote", "Do you need remote monitoring?", "single", [
      "Yes — view from phone / offsite",
      "No — on-site only",
    ]),
  ],
  network: [
    q("net_users", "How many users will the network serve?", "single", [
      "Under 25",
      "25–100",
      "100–500",
      "500+",
    ]),
    q("net_type", "What connectivity do you need?", "single", [
      "Wi-Fi only",
      "Wired + wireless",
      "Not sure yet",
    ]),
    q("net_server", "Do you need server installation?", "single", [
      "Yes",
      "No",
      "Advise me",
    ]),
  ],
  website: [
    q("web_type", "What kind of website?", "multi", [
      "Corporate website",
      "E-commerce",
      "Educational website",
      "Healthcare website",
      "Booking platform",
      "Client portal",
    ]),
  ],
  mobile: [
    q("app_platform", "Which platforms?", "single", ["Android", "iOS", "Both"]),
    q("app_audience", "Who is the app for?", "multi", [
      "Customer app",
      "Internal staff app",
      "Marketplace",
      "Healthcare",
      "Education",
    ]),
  ],
  software: [
    q("sw_domain", "What should the software manage?", "multi", [
      "Inventory",
      "Hospital management",
      "CRM",
      "ERP",
      "Workflow automation",
      "Finance",
      "School management",
      "Other",
    ]),
  ],
  ai: [
    q("ai_focus", "Which AI capabilities interest you?", "multi", [
      "AI chatbot",
      "AI assistant",
      "Business automation",
      "Prompt engineering",
      "AI content creation",
      "AI commercial video production",
      "Workflow automation",
      "AI training for staff",
    ]),
  ],
  solar: [
    q("solar_site", "What are we powering?", "single", [
      "Home",
      "Office",
      "Hospital",
      "School",
      "Factory",
    ]),
    q("solar_backup", "Estimated backup requirement?", "single", [
      "Essentials only (lights, Wi-Fi)",
      "Half-day backup",
      "Full-day backup",
      "24/7 critical load",
      "Not sure — advise me",
    ]),
    q("solar_existing", "Do you already have an inverter?", "single", [
      "Yes",
      "No",
      "Yes, but it needs replacing",
    ]),
  ],
  healthcare: [
    q("hc_size", "How large is the facility?", "single", [
      "Clinic (under 20 beds)",
      "20–100 beds",
      "100+ beds",
      "Multi-facility group",
    ]),
    q("hc_emr", "Do you have an existing EMR/HMIS?", "single", [
      "Yes",
      "No",
      "Yes, but we want to replace it",
    ]),
    q("hc_integrations", "Which integrations do you need?", "multi", [
      "Networking / infrastructure",
      "Laboratory integration",
      "Radiology integration",
      "Billing & insurance",
    ]),
  ],
  strategy: [
    q("strategy_focus", "What kind of advisory do you need?", "multi", [
      "Infrastructure assessment",
      "Technical leadership",
      "Technology roadmap",
      "IT audit",
      "Business continuity",
      "Digital transformation planning",
    ]),
  ],
};

/** Shared questions each service contributes — deduplicated automatically. */
const SERVICE_SHARED: Record<string, string[]> = {
  ai: ["organisation", "timeline"],
  cctv: ["organisation", "project_stage", "scale", "timeline"],
  network: ["organisation", "project_stage", "scale", "timeline"],
  healthcare: ["organisation", "scale", "timeline"],
  solar: ["organisation", "scale", "timeline"],
  website: ["organisation", "project_stage", "timeline"],
  mobile: ["organisation", "timeline"],
  software: ["organisation", "timeline"],
  strategy: ["organisation", "scale", "timeline"],
};

export type FlowStep = { id: string; heading: string; questions: QuestionDef[] };

/**
 * Builds the adaptive step list from the selected services.
 * Shared questions are merged into a single profile step; each service adds only
 * the questions it uniquely needs, so nothing is asked twice.
 */
export function buildFlow(needs: string[]): FlowStep[] {
  const steps: FlowStep[] = [];
  const seen = new Set<string>();

  const sharedIds: string[] = [];
  for (const n of needs) {
    for (const id of SERVICE_SHARED[n] ?? []) {
      if (!seen.has(id)) {
        seen.add(id);
        sharedIds.push(id);
      }
    }
  }
  if (needs.length && sharedIds.length) {
    steps.push({
      id: "profile",
      heading: "About your organisation",
      questions: sharedIds.map((id) => SHARED[id]).filter(Boolean),
    });
  }

  for (const n of needs) {
    const list = (SERVICE_QUESTIONS[n] ?? []).filter((qd) => {
      if (seen.has(qd.id)) return false;
      seen.add(qd.id);
      return true;
    });
    if (!list.length) continue;
    steps.push({
      id: `svc-${n}`,
      heading: needOptions.find((o) => o.id === n)?.label ?? n,
      questions: list,
    });
  }

  return steps;
}

export function labelForNeed(id: string) {
  return needOptions.find((o) => o.id === id)?.label ?? id;
}

export function labelForOption(question: QuestionDef, optionId: string) {
  return question.options.find((o) => o.id === optionId)?.label ?? optionId;
}

/* ------------------------------ Recommendations ----------------------------- */

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

export function recommendServices(needs: string[], organisation: string): Service[] {
  const slugs = new Set(needs.map((n) => needToSlug[n]).filter(Boolean));
  if (organisation === "healthcare") slugs.add("healthcare");
  if (organisation === "enterprise" || organisation === "government") slugs.add("infrastructure");
  if (slugs.size === 0) slugs.add("ai");
  return services.filter((s) => slugs.has(s.slug)).slice(0, 4);
}

export function advisorNote(organisation: string, scale: string, timeline: string) {
  const org =
    organisationOptions.find((o) => o.id === organisation)?.label.toLowerCase() ??
    "your organisation";
  const reach = scaleOptions.find((o) => o.id === scale)?.label.toLowerCase();
  const when = timelineOptions.find((o) => o.id === timeline)?.label.toLowerCase();
  const parts = [`Based on ${org}`];
  if (reach) parts.push(`operating across ${reach}`);
  if (when) parts.push(`and a timeline of ${when}`);
  return `${parts.join(", ")}, here is the delivery path our specialists recommend.`;
}
