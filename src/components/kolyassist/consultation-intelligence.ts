/**
 * ConsultationIntelligence — the single business-intelligence source for every
 * KolyAssist output channel (recommendation screen, executive dashboard, PDF,
 * DOCX, email, WhatsApp, proposal and the contact handoff).
 *
 * It sits on top of the existing recommendation engine (./intelligence.ts) and
 * adds the layers requested for Release 1.5: intent classification, service
 * intelligence modules, dependency analysis, priority/confidence grading,
 * complexity, outcomes, risks, immediate actions, discovery gaps and an
 * adaptive executive summary. No channel derives its own business logic.
 */
import type { Recommendation, ConsultationContext } from "./intelligence";
import { labelForAnswer, labelForNeed } from "./data";

/* -------------------------------------------------------------------------- */
/*  Part 2 — Service intelligence modules                                      */
/* -------------------------------------------------------------------------- */

export type ServiceModule = {
  id: string;
  label: string;
  /** Typical objectives this service serves. */
  objectives: string[];
  strategy: string;
  /** Genuine implementation dependencies only. */
  dependencies: string[];
  businessValue: string[];
  risks: string[];
  successFactors: string[];
  scalability: string;
  /** Practical client-side actions before delivery starts. */
  actions: string[];
  /** Relative build weight used by the complexity engine. */
  weight: number;
  /** Lower runs earlier in an integrated roadmap. */
  sequence: number;
};

const MODULES: Record<string, ServiceModule> = {
  network: {
    id: "network",
    label: "Enterprise Networking & Structured Cabling",
    objectives: ["Reliable connectivity", "Consolidated infrastructure", "Room to grow"],
    strategy:
      "Site survey and cable plan first, then switching, Wi-Fi coverage and server/room provisioning, tested and documented per drop.",
    dependencies: ["Site survey", "Power and rack space", "Internet service capacity", "IP addressing plan"],
    businessValue: ["Fewer connectivity outages", "A single supportable network estate"],
    risks: ["Building works can delay cable runs", "Existing legacy cabling may need replacement"],
    successFactors: ["Access to all floors during installation", "An agreed cabling standard and labelling scheme"],
    scalability: "Cabling and switching are sized with spare capacity so new users and sites drop in without redesign.",
    actions: ["Gather existing floor plans", "Confirm internet contract and bandwidth", "Nominate a site access contact"],
    weight: 3,
    sequence: 1,
  },
  cctv: {
    id: "cctv",
    label: "CCTV & Surveillance",
    objectives: ["Deter and evidence incidents", "Protect people and assets"],
    strategy:
      "Coverage design against your floor plan, PoE camera installation on a segmented network, recorder sizing for the retention period you need.",
    dependencies: ["Network infrastructure", "Recording storage and retention period", "UPS / backup power", "Maintenance plan"],
    businessValue: ["Reduced losses and disputes", "Recorded evidence available on demand"],
    risks: ["Retention targets drive storage cost", "Cameras are ineffective without power continuity"],
    successFactors: ["Agreed coverage priorities", "Named staff trained on footage retrieval"],
    scalability: "Recorder and network capacity are specified so additional cameras can be added without replacing the core.",
    actions: ["Mark priority coverage areas on a plan", "Confirm required footage retention", "Identify who may view footage"],
    weight: 2,
    sequence: 3,
  },
  solar: {
    id: "solar",
    label: "Solar & Backup Power",
    objectives: ["Continuity through grid failure", "Lower running costs"],
    strategy:
      "Load assessment, then inverter and battery sizing, panel installation and changeover configuration with monitoring.",
    dependencies: ["Electrical load assessment", "Battery capacity and autonomy target", "Roof or ground mounting space", "Future expansion planning"],
    businessValue: ["Operations continue during outages", "Reduced fuel and generator maintenance spend"],
    risks: ["Undeclared loads will undersize the system", "Battery lifespan depends on usage discipline"],
    successFactors: ["An accurate load list", "Agreement on which circuits are backed up"],
    scalability: "Inverter and array are sized with headroom so capacity can be added as loads increase.",
    actions: ["List critical loads and their ratings", "Confirm available mounting space", "Share recent energy bills"],
    weight: 3,
    sequence: 2,
  },
  healthcare: {
    id: "healthcare",
    label: "Healthcare Technology (HMIS / EMR)",
    objectives: ["Continuous clinical availability", "Protected patient records"],
    strategy:
      "Clinical workflow mapping, resilient network and power, then phased records rollout department by department with parallel running.",
    dependencies: ["Resilient network", "Backup power", "Records migration and data readiness", "Clinical staff training"],
    businessValue: ["Faster patient throughput", "Auditable clinical records"],
    risks: ["Migration errors if legacy records are inconsistent", "Adoption stalls without clinical champions"],
    successFactors: ["A clinical project owner", "Department-by-department cutover instead of a single switch"],
    scalability: "Departments and additional sites are onboarded onto the same platform without a rebuild.",
    actions: ["Nominate a clinical project owner", "Export a sample of existing records", "Agree department rollout order"],
    weight: 4,
    sequence: 2,
  },
  website: {
    id: "website",
    label: "Website Development",
    objectives: ["Credible online presence", "Generate and capture enquiries"],
    strategy:
      "Content and structure first, then design, build, SEO foundations and launch with analytics in place.",
    dependencies: ["Domain name", "Hosting", "SSL certificate", "Business email", "Brand assets and content", "Analytics"],
    businessValue: ["More qualified enquiries", "A channel you control"],
    risks: ["Content delays are the most common cause of slipped launches"],
    successFactors: ["A single content approver", "Final copy and imagery available before build"],
    scalability: "Built on a structure that takes new pages, languages or an online store later.",
    actions: ["Register or confirm the domain", "Prepare logo and brand assets", "Draft core page content"],
    weight: 2,
    sequence: 3,
  },
  mobile: {
    id: "mobile",
    label: "Mobile App Development",
    objectives: ["Reach customers or staff on mobile", "Digitise field work"],
    strategy:
      "Scope the core journeys, build a cross-platform app against a documented API, then test on real devices before store release.",
    dependencies: ["Backend API or data source", "App store accounts", "Brand assets", "User acceptance testing group"],
    businessValue: ["Service available wherever users are", "Direct engagement channel"],
    risks: ["Store review cycles add lead time", "Scope creep between platforms"],
    successFactors: ["A prioritised feature list", "Named testers available during UAT"],
    scalability: "Feature modules are added in releases without re-architecting the app.",
    actions: ["Prioritise the first-release features", "Confirm app store account ownership", "Name a UAT group"],
    weight: 4,
    sequence: 4,
  },
  software: {
    id: "software",
    label: "Custom Software Development",
    objectives: ["Fit systems to how you actually work", "Remove manual handoffs"],
    strategy:
      "Process mapping and requirements sign-off, iterative build with review checkpoints, data migration, then training and handover.",
    dependencies: ["Process mapping", "Data readiness and migration", "User roles and permissions", "Training"],
    businessValue: ["Less duplicate data entry", "Reporting that matches your business"],
    risks: ["Unclear requirements extend the build", "Poor legacy data quality complicates migration"],
    successFactors: ["A decision-making product owner", "Access to the people who do the work today"],
    scalability: "Modular build so new departments or processes are added incrementally.",
    actions: ["Document the current process end to end", "Nominate a product owner", "Extract a sample data set"],
    weight: 4,
    sequence: 3,
  },
  ai: {
    id: "ai",
    label: "AI Solutions & Automation",
    objectives: ["Automate repetitive work", "Respond to customers faster"],
    strategy:
      "Identify the highest-volume repeatable process, prove value on one workflow, then extend once measured results are accepted.",
    dependencies: ["Process mapping", "Data readiness", "Change management", "Staff training"],
    businessValue: ["Faster response times", "Staff time returned to higher-value work"],
    risks: ["Automating an unclear process amplifies the problem", "Adoption depends on staff confidence"],
    successFactors: ["A single well-understood pilot process", "Agreed measures of success before launch"],
    scalability: "Proven workflows are replicated across departments once the first is measured.",
    actions: ["Pick one process to automate first", "Collect sample requests or documents", "Agree how success will be measured"],
    weight: 3,
    sequence: 4,
  },
  strategy: {
    id: "strategy",
    label: "IT Strategy & Consultancy",
    objectives: ["Know what to do first", "Reduce unplanned spend"],
    strategy:
      "Audit the current estate, document risks and gaps, then produce a prioritised roadmap with costed phases.",
    dependencies: ["Access to current systems and documentation", "Stakeholder interviews"],
    businessValue: ["Decisions backed by an audit rather than assumption", "A budgetable plan"],
    risks: ["An audit is only as good as the access granted"],
    successFactors: ["Executive sponsorship", "Honest visibility of current pain points"],
    scalability: "The roadmap is reviewed each cycle as the business changes.",
    actions: ["Collect existing IT documentation", "Identify stakeholders to interview", "Schedule a discovery workshop"],
    weight: 2,
    sequence: 1,
  },
};

/** Only modules relevant to the consultation are ever loaded. */
export function modulesFor(needs: string[]): ServiceModule[] {
  return needs
    .map((n) => MODULES[n])
    .filter((m): m is ServiceModule => Boolean(m))
    .sort((a, b) => a.sequence - b.sequence);
}

/* -------------------------------------------------------------------------- */
/*  Canonical object                                                           */
/* -------------------------------------------------------------------------- */

export type Priority = "Primary Recommendation" | "Secondary Recommendation" | "Future Opportunity";

export type GradedRecommendation = {
  title: string;
  summary: string;
  priority: Priority;
  why: string;
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  note: string;
  dependencies: string[];
};

export type ConsultationIntelligence = {
  intent: {
    primaryObjective: string;
    services: string[];
    industry: string;
    organisation: string;
    scale: string;
    maturity: string;
    timeline: string;
    budget: string;
    driver: string;
  };
  modules: ServiceModule[];
  graded: GradedRecommendation[];
  dependencies: { service: string; items: string[] }[];
  roadmap: RoadmapPhase[];
  complexity: {
    level: "Focused" | "Moderate" | "Substantial" | "Programme";
    duration: string;
    approach: string;
    disruption: string;
  };
  outcomes: string[];
  risks: string[];
  assumptions: string[];
  actions: string[];
  discoveryGaps: string[];
  completeness: { score: number; captured: string[]; missing: string[] };
  executiveSummary: {
    situation: string;
    challenge: string;
    strategy: string;
    value: string;
    nextAction: string;
  };
};

const NOT_COLLECTED =
  "This information was not collected during the consultation and can be refined during the project discovery phase.";

export const DISCOVERY_NOTE = NOT_COLLECTED;

const OBJECTIVE_OUTCOME: Record<string, string> = {
  security: "A measurably stronger security posture across premises and systems",
  productivity: "Less time lost to manual, repetitive work",
  cost: "Lower recurring operating and energy costs",
  modernise: "A modern, documented and supportable technology foundation",
  cx: "A noticeably smoother experience for your customers",
  automate: "Fewer manual handoffs and transcription errors",
  expansion: "Capacity to open new sites without rebuilding the core",
  compliance: "Evidence and controls that stand up to audit",
};

function answer(question: string, value: string): string {
  return value ? labelForAnswer(question, value) : "";
}

export function buildIntelligence(
  ctx: ConsultationContext,
  rec: Recommendation,
): ConsultationIntelligence {
  const modules = modulesFor(ctx.needs);

  /* --- Part 1: intent classification (consultation evidence only) --- */
  const primaryObjective = ctx.objectives[0]
    ? labelForAnswer("objective", ctx.objectives[0])
    : "";
  const intent = {
    primaryObjective,
    services: ctx.needs.map(labelForNeed),
    industry: rec.industry.label,
    organisation: answer("organisation", ctx.organisation),
    scale: answer("scale", ctx.scale),
    maturity: answer("maturity", ctx.maturity),
    timeline: answer("timeline", ctx.timeline),
    budget: answer("budget", ctx.budget),
    driver: answer("driver", ctx.driver),
  };

  /* --- Parts 3 & 6: industry-aware grading --- */
  const industryPriority = rec.industry.priority;
  const graded: GradedRecommendation[] = rec.solutions.map((s, i) => {
    const alignment = industryPriority.indexOf(s.slug);
    const strong = alignment > -1 && alignment < 3;
    const priority: Priority =
      i === 0 || (strong && i < 2)
        ? "Primary Recommendation"
        : i < 3
          ? "Secondary Recommendation"
          : "Future Opportunity";
    return {
      title: s.title,
      summary: s.short,
      priority,
      why: strong
        ? `${rec.industry.label} operations depend on this early — ${rec.industry.language.toLowerCase()}`
        : `Selected because it supports ${primaryObjective ? primaryObjective.toLowerCase() : "the priorities raised in this consultation"} for a ${rec.industry.label.toLowerCase()} organisation.`,
    };
  });

  /* --- Part 4: dependency engine (relevant services only) --- */
  const dependencies = modules.map((m) => ({ service: m.label, items: m.dependencies }));

  /* --- Part 5: one integrated roadmap --- */
  const phaseNames = ["Phase 1 — Foundation", "Phase 2 — Build", "Phase 3 — Extend", "Phase 4 — Optimise"];
  const roadmap: RoadmapPhase[] = rec.order.map((o, i) => {
    const mod = modules.find(
      (m) => m.id === o.service.slug || o.service.title.toLowerCase().includes(m.id),
    );
    return {
      phase: phaseNames[i] ?? `Phase ${i + 1}`,
      title: o.service.title,
      note: mod ? mod.strategy : o.note,
      dependencies: mod ? mod.dependencies : [],
    };
  });

  /* --- Part 7: complexity --- */
  const weight =
    modules.reduce((sum, m) => sum + m.weight, 0) +
    (ctx.scale === "national" ? 4 : ctx.scale === "multi" ? 2 : 0);
  const level: ConsultationIntelligence["complexity"]["level"] =
    weight <= 3 ? "Focused" : weight <= 6 ? "Moderate" : weight <= 10 ? "Substantial" : "Programme";
  const complexity = {
    level,
    duration: rec.estimate,
    approach:
      level === "Focused"
        ? "Delivered as a single workstream with one assessment and one handover."
        : level === "Moderate"
          ? "Delivered in two or three phases so value lands before the full scope completes."
          : "Delivered as a phased programme with separate acceptance at the end of each phase.",
    disruption:
      ctx.driver === "emergency"
        ? "Some disruption is unavoidable during stabilisation; we contain it to agreed windows."
        : level === "Focused"
          ? "Minimal — most work happens alongside normal operations."
          : "Planned and scheduled — cutovers run outside core hours wherever the site allows.",
  };

  /* --- Part 8: outcomes --- */
  const outcomes = [
    ...ctx.objectives.map((o) => OBJECTIVE_OUTCOME[o]).filter(Boolean),
    ...modules.flatMap((m) => m.businessValue),
    ...rec.industry.benefits,
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 7);

  /* --- Part 8b: risks & assumptions --- */
  const risks = [...new Set(modules.flatMap((m) => m.risks))].slice(0, 6);
  const assumptions = [
    "Figures and timelines in this report are indicative until an engineer has assessed the site.",
    ...(ctx.budget === "unknown"
      ? ["Costing will be presented in phases so budget can be approved incrementally."]
      : []),
    ...[...new Set(modules.flatMap((m) => m.successFactors))].slice(0, 4),
  ];

  /* --- Part 10: immediate actions --- */
  const actions = [
    ...[...new Set(modules.flatMap((m) => m.actions))].slice(0, 6),
    "Identify the internal project owner for this engagement",
    "Schedule the discovery and site assessment session",
  ];

  /* --- Part 9: completeness advisor --- */
  const signals: [boolean, string, string][] = [
    [ctx.needs.length > 0, "Services of interest", "Which services matter most"],
    [!!ctx.organisation, "Organisation type", "The type of organisation and sector"],
    [ctx.objectives.length > 0, "Business objectives", "The business objectives behind this project"],
    [!!ctx.maturity, "Current digital maturity", "How digital your current systems are"],
    [!!ctx.driver, "Project driver", "What is triggering the project now"],
    [!!ctx.scale, "Operating footprint", "How many sites are in scope"],
    [!!ctx.timeline, "Preferred timeline", "When you would like to start"],
    [!!ctx.budget, "Budget position", "Your budget position or approval process"],
  ];
  const captured = signals.filter(([ok]) => ok).map(([, l]) => l);
  const missing = signals.filter(([ok]) => !ok).map(([, , gap]) => gap);
  const completeness = {
    score: Math.round((captured.length / signals.length) * 100),
    captured,
    missing,
  };
  const discoveryGaps = [
    ...missing,
    ...(modules.some((m) => m.id === "website") && !ctx.budget ? [] : []),
  ];

  /* --- Part 11: executive summary --- */
  const serviceList = intent.services.join(", ").toLowerCase();
  const executiveSummary = {
    situation: intent.maturity
      ? `${intent.organisation || rec.industry.label} operating across ${intent.scale ? intent.scale.toLowerCase() : "the sites discussed"}, currently ${intent.maturity.toLowerCase()}.`
      : `${intent.organisation || rec.industry.label} exploring ${serviceList}.`,
    challenge: primaryObjective
      ? `The consultation centres on ${primaryObjective.toLowerCase()}${intent.driver ? `, driven by ${intent.driver.toLowerCase()}` : ""}.`
      : `The consultation centres on ${serviceList}${intent.driver ? `, driven by ${intent.driver.toLowerCase()}` : ""}.`,
    strategy: `We recommend ${graded
      .filter((g) => g.priority === "Primary Recommendation")
      .map((g) => g.title)
      .join(" and ") || rec.solutions[0]?.title || "a staged technology plan"} first, then the supporting workstreams in the roadmap below. ${rec.industry.language}`,
    value: outcomes[0]
      ? `The engagement is expected to deliver ${outcomes.slice(0, 2).map((o) => o.toLowerCase()).join(", and ")}.`
      : "The engagement is expected to deliver measurable operational improvement in the areas raised.",
    nextAction: rec.nextStep,
  };

  return {
    intent,
    modules,
    graded,
    dependencies,
    roadmap,
    complexity,
    outcomes,
    risks,
    assumptions,
    actions,
    discoveryGaps,
    completeness,
    executiveSummary,
  };
}
