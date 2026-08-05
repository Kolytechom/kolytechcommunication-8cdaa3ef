/**
 * Executive reporting layer for KolyAssist — consultation reference, readiness
 * dashboard, investment guidance and the plain-text report body reused by the
 * PDF/DOCX exports and the contact-form handoff.
 */
import type { Recommendation, ConsultationContext } from "./intelligence";
import { labelForNeed, labelForAnswer } from "./data";

export const HANDOFF_KEY = "kolyassist_handoff_v1";
const REFERENCE_KEY = "kolyassist_reference_v1";

/** KTC-YYYYMMDD-XXXXX — stable for the lifetime of a session. */
export function makeReference(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `KTC-${y}${m}${d}-${rand}`;
}

/**
 * One reference per consultation session, shared by every output channel so a
 * reopened panel, an export and a WhatsApp handoff all quote the same number.
 */
export function sessionReference(): string {
  try {
    const existing = localStorage.getItem(REFERENCE_KEY);
    if (existing) return existing;
    const next = makeReference();
    localStorage.setItem(REFERENCE_KEY, next);
    return next;
  } catch {
    return makeReference();
  }
}

export function clearSessionReference() {
  try {
    localStorage.removeItem(REFERENCE_KEY);
  } catch {
    /* ignore */
  }
}


export type Contact = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export type DashboardMetric = {
  label: string;
  value: number;
  caption: string;
};

/** Four indicative scores derived from the captured context. */
export function buildDashboard(
  ctx: ConsultationContext,
  rec: Recommendation,
): DashboardMetric[] {
  const maturityScore =
    ctx.maturity === "automated" ? 90 : ctx.maturity === "digital" ? 72 : ctx.maturity === "partial" ? 52 : 32;

  const urgency =
    ctx.driver === "emergency" || ctx.timeline === "urgent"
      ? 92
      : ctx.timeline === "quarter"
        ? 70
        : ctx.timeline === "planning"
          ? 45
          : 60;

  const scopeBreadth = Math.min(100, 35 + rec.solutions.length * 16 + (ctx.objectives.length ? 8 : 0));

  const readiness = Math.round(
    (rec.confidenceScore * 0.4 + maturityScore * 0.35 + (100 - Math.abs(70 - urgency)) * 0.25) / 1,
  );

  return [
    {
      label: "Consultation completeness",
      value: rec.confidenceScore,
      caption: "How much context we captured about your organisation.",
    },
    {
      label: "Digital maturity",
      value: maturityScore,
      caption: "Where your current systems sit on the manual-to-automated scale.",
    },
    {
      label: "Project urgency",
      value: urgency,
      caption: "How quickly this needs to move based on your timeline and driver.",
    },
    {
      label: "Overall readiness",
      value: Math.max(20, Math.min(98, readiness)),
      caption: "Indicative readiness to begin delivery with Kolytech.",
    },
    {
      label: "Scope breadth",
      value: scopeBreadth,
      caption: "How many capability areas this engagement touches.",
    },
  ];
}

/** Indicative investment band — deliberately qualitative, confirmed on site. */
export function investmentGuidance(ctx: ConsultationContext, rec: Recommendation): string {
  const count = rec.solutions.length;
  const scaleWeight = ctx.scale === "national" ? 3 : ctx.scale === "multi" ? 2 : 1;
  const weight = count * scaleWeight;
  const band =
    weight <= 2
      ? "Entry — a single focused workstream, typically approved as one phase."
      : weight <= 5
        ? "Mid-range — a multi-workstream project best approved in two or three phases."
        : "Programme-level — a multi-site rollout that should be staged across budget cycles.";
  const budgetNote =
    ctx.budget === "unknown"
      ? " We will provide phased costing so approval can happen in stages."
      : " We will align the proposal to the budget position you indicated.";
  return `${band}${budgetNote} Exact figures follow the site assessment — no estimate is issued before an engineer has seen the environment.`;
}

export function valueProjection(rec: Recommendation): string[] {
  return [
    "Fewer disruptions to day-to-day operations once the foundation phase is accepted.",
    "Reduced time spent on repeat faults through documented, supportable systems.",
    ...rec.benefits.slice(0, 2),
  ];
}

export const NEXT_ACTIONS = [
  {
    title: "We review your brief",
    body: "A Kolytech specialist reads the full consultation, usually within one business day.",
  },
  {
    title: "We schedule a site assessment",
    body: "An engineer confirms conditions on site — nothing is quoted from a questionnaire alone.",
  },
  {
    title: "You receive a costed proposal",
    body: "A phased proposal with scope, timeline and pricing you can take to approval.",
  },
  {
    title: "Delivery and handover",
    body: "Installation, commissioning, documentation and training, then an agreed support path.",
  },
];

export type ReportPayload = {
  reference: string;
  date: string;
  contact: Contact;
  ctx: ConsultationContext;
  rec: Recommendation;
  dashboard: DashboardMetric[];
  investment: string;
  value: string[];
};

export function buildPayload(
  reference: string,
  contact: Contact,
  ctx: ConsultationContext,
  rec: Recommendation,
): ReportPayload {
  return {
    reference,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    contact,
    ctx,
    rec,
    dashboard: buildDashboard(ctx, rec),
    investment: investmentGuidance(ctx, rec),
    value: valueProjection(rec),
  };
}

/** Ordered, renderer-agnostic report body. */
export type ReportBlock =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] };

export function reportBlocks(p: ReportPayload): ReportBlock[] {
  const b: ReportBlock[] = [];
  const { ctx, rec } = p;

  b.push({ kind: "h1", text: "KolyAssist Technology Consultation Report" });
  b.push({ kind: "p", text: "Prepared by Kolytech Communication" });
  b.push({
    kind: "p",
    text: "Your Intelligent Business Technology Advisor — IT Infrastructure, AI & Digital Solutions · Lagos, Nigeria",
  });
  b.push({ kind: "p", text: `Reference ${p.reference} · Issued ${p.date}` });

  b.push({ kind: "h2", text: "Client Information" });
  b.push({
    kind: "bullets",
    items: [
      `Name: ${p.contact.name || "Not provided"}`,
      `Organisation: ${p.contact.company || "Not provided"}`,
      `Email: ${p.contact.email || "Not provided"}`,
      `Phone: ${p.contact.phone || "Not provided"}`,
      `Sector: ${rec.industry.label}`,
    ],
  });

  b.push({ kind: "h2", text: "Executive Summary" });
  b.push({ kind: "p", text: rec.advisorNote });
  b.push({
    kind: "p",
    text: `Areas raised in this consultation: ${ctx.needs.map(labelForNeed).join(", ") || "Not specified"}.`,
  });

  b.push({ kind: "h2", text: "Executive Readiness Assessment" });
  b.push({
    kind: "bullets",
    items: p.dashboard.map((m) => `${m.label}: ${m.value}% — ${m.caption}`),
  });

  b.push({ kind: "h2", text: "Current Situation" });
  b.push({
    kind: "bullets",
    items: [
      `Operating footprint: ${ctx.scale ? labelForAnswer("scale", ctx.scale) : "Not specified"}`,
      `Digital maturity: ${ctx.maturity ? labelForAnswer("maturity", ctx.maturity) : "Not specified"}`,
      `Project driver: ${ctx.driver ? labelForAnswer("driver", ctx.driver) : "Not specified"}`,
      `Budget position: ${ctx.budget ? labelForAnswer("budget", ctx.budget) : "To be confirmed"}`,
      `Preferred timeline: ${ctx.timeline ? labelForAnswer("timeline", ctx.timeline) : "Not specified"}`,
    ],
  });

  b.push({ kind: "h2", text: "Business Objectives" });
  b.push({
    kind: "bullets",
    items: ctx.objectives.length
      ? ctx.objectives.map((o) => labelForAnswer("objective", o))
      : ["To be confirmed during the site assessment."],
  });

  b.push({ kind: "h2", text: "Recommended Technology Solutions" });
  b.push({
    kind: "bullets",
    items: rec.solutions.map((s) => `${s.title} — ${s.short}`),
  });
  b.push({ kind: "p", text: "Why this fits your organisation:" });
  b.push({ kind: "bullets", items: rec.rationale });

  b.push({ kind: "h2", text: "Expected Business Outcomes" });
  b.push({ kind: "bullets", items: [...rec.benefits, ...p.value] });

  b.push({ kind: "h2", text: "Implementation Roadmap" });
  b.push({
    kind: "bullets",
    items: rec.order.map((o) => `${o.phase}: ${o.service.title} — ${o.note}`),
  });

  b.push({ kind: "h2", text: "Estimated Timeline" });
  b.push({ kind: "p", text: rec.estimate });

  b.push({ kind: "h2", text: "Investment Guidance" });
  b.push({ kind: "p", text: p.investment });

  b.push({ kind: "h2", text: "Complementary Services" });
  b.push({ kind: "bullets", items: rec.complementary });

  b.push({ kind: "h2", text: "Recommended Next Steps" });
  b.push({ kind: "p", text: rec.nextStep });
  b.push({
    kind: "bullets",
    items: NEXT_ACTIONS.map((a, i) => `${i + 1}. ${a.title} — ${a.body}`),
  });

  b.push({ kind: "h2", text: "Contact Information" });
  b.push({
    kind: "bullets",
    items: [
      "Kolytech Communication",
      "Phone: +234 813 913 5880",
      "Email: kolytechcom@yahoo.com",
      "Location: Lagos, Nigeria",
    ],
  });
  b.push({
    kind: "p",
    text: "This report is an advisory summary generated by KolyAssist. Final scope, timeline and pricing are confirmed after an on-site assessment.",
  });

  return b;
}

/** Plain-text version used for email, WhatsApp and the contact-form handoff. */
export function reportText(p: ReportPayload): string {
  return reportBlocks(p)
    .map((blk) => {
      if (blk.kind === "h1") return `${blk.text.toUpperCase()}\n`;
      if (blk.kind === "h2") return `\n${blk.text}\n${"-".repeat(blk.text.length)}`;
      if (blk.kind === "p") return blk.text;
      return blk.items.map((i) => `• ${i}`).join("\n");
    })
    .join("\n");
}


/* -------------------------------------------------------------------------- */
/*  Continuation channels — all derived from the same ReportPayload            */
/* -------------------------------------------------------------------------- */

export type HandoffIntent = "enquiry" | "booking" | "proposal";

export const CONTACT_PHONE = "+2348139135880";
export const CONTACT_EMAIL = "kolytechcom@yahoo.com";

/** Condensed profile lines shared by WhatsApp, email and the proposal payload. */
export function profileLines(p: ReportPayload): string[] {
  const { ctx, rec, contact } = p;
  const line = (label: string, value: string) => (value ? `${label}: ${value}` : "");
  return [
    line("Reference", p.reference),
    line("Client", contact.name),
    line("Organisation", contact.company),
    line("Industry", rec.industry.label),
    line("Locations", ctx.scale ? labelForAnswer("scale", ctx.scale) : ""),
    line("Timeline preference", ctx.timeline ? labelForAnswer("timeline", ctx.timeline) : ""),
    line(
      "Business objectives",
      ctx.objectives.map((o) => labelForAnswer("objective", o)).join(", "),
    ),
    line(
      "Current situation",
      ctx.maturity ? labelForAnswer("maturity", ctx.maturity) : "",
    ),
    line("Project driver", ctx.driver ? labelForAnswer("driver", ctx.driver) : ""),
    line("Budget position", ctx.budget ? labelForAnswer("budget", ctx.budget) : ""),
    line("Selected services", ctx.needs.map(labelForNeed).join(", ")),
  ].filter(Boolean);
}

/** Professional WhatsApp handoff carrying the full consultation. */
export function whatsappMessage(p: ReportPayload): string {
  const sections = [
    "*KolyAssist Consultation Summary*",
    "Kolytech Communication — IT Infrastructure, AI & Digital Solutions",
    "",
    profileLines(p).join("\n"),
    "",
    "*Recommended solutions*",
    p.rec.solutions.map((s) => `• ${s.title} — ${s.short}`).join("\n"),
    "",
    `*Confidence score:* ${p.rec.confidenceScore}%`,
    "",
    "*Investment guidance*",
    p.investment,
    "",
    "*Business value projection*",
    p.value.map((v) => `• ${v}`).join("\n"),
    "",
    "*Implementation roadmap*",
    p.rec.order.map((o) => `• ${o.phase}: ${o.service.title}`).join("\n"),
    "",
    `*Estimated timeline:* ${p.rec.estimate}`,
    "",
    `*Recommended next action:* ${p.rec.nextStep}`,
  ];
  return sections.join("\n");
}

export function whatsappUrl(p: ReportPayload): string {
  return `https://wa.me/2348139135880?text=${encodeURIComponent(whatsappMessage(p))}`;
}

export function emailSubject(p: ReportPayload): string {
  return `KolyAssist Consultation Report - ${p.reference}`;
}

/**
 * Mail clients silently truncate long mailto URLs, which used to cut a percent
 * escape in half and surface artifacts like "%2%7" or "%2\uFFFD" in the body.
 * We therefore build the text first, trim it on whole *lines* (never inside a
 * character), and percent-encode exactly once at the end.
 */
const MAILTO_ENCODED_BUDGET = 1800;

export function emailBody(p: ReportPayload, budget = MAILTO_ENCODED_BUDGET): string {
  const lines = reportText(p).split("\n");
  const kept: string[] = [];
  let used = 0;
  for (const line of lines) {
    const cost = encodeURIComponent(`${line}\n`).length;
    if (used + cost > budget) {
      kept.push("", "[Full report attached via the downloadable PDF/Word export.]");
      break;
    }
    kept.push(line);
    used += cost;
  }
  return kept.join("\n");
}

/** mailto — the body is encoded exactly once, on a safe line boundary. */
export function mailtoUrl(p: ReportPayload, to = CONTACT_EMAIL): string {
  const subject = encodeURIComponent(emailSubject(p));
  const body = encodeURIComponent(emailBody(p));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}


/** Proposal-ready payload — the same canonical object, flattened for handoff. */
export function proposalPayload(p: ReportPayload) {
  return {
    reference: p.reference,
    issued: p.date,
    client: p.contact,
    industry: p.rec.industry.label,
    objectives: p.ctx.objectives.map((o) => labelForAnswer("objective", o)),
    selectedServices: p.ctx.needs.map(labelForNeed),
    recommendations: p.rec.solutions.map((s) => ({ title: s.title, summary: s.short })),
    roadmap: p.rec.order.map((o) => ({ phase: o.phase, service: o.service.title, note: o.note })),
    investment: p.investment,
    valueProjection: p.value,
    timeline: p.rec.estimate,
    confidenceScore: p.rec.confidenceScore,
  };
}

/** Stored so /contact can pre-fill with consultation context. */
export function saveHandoff(p: ReportPayload, intent: HandoffIntent = "enquiry") {
  try {
    localStorage.setItem(
      HANDOFF_KEY,
      JSON.stringify({
        reference: p.reference,
        intent,
        name: p.contact.name,
        email: p.contact.email,
        phone: p.contact.phone,
        company: p.contact.company,
        industry: p.rec.industry.label,
        interest: p.rec.solutions[0]?.title ?? "",
        summary: reportText(p),
        proposal: proposalPayload(p),
        savedAt: Date.now(),
      } satisfies Handoff),
    );
  } catch {
    /* storage unavailable — the panel still works */
  }
}

export type Handoff = {
  reference: string;
  intent: HandoffIntent;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  interest: string;
  summary: string;
  proposal: ReturnType<typeof proposalPayload>;
  savedAt: number;
};


export function readHandoff(): Handoff | null {
  try {
    const raw = localStorage.getItem(HANDOFF_KEY);
    return raw ? (JSON.parse(raw) as Handoff) : null;
  } catch {
    return null;
  }
}

export function clearHandoff() {
  try {
    localStorage.removeItem(HANDOFF_KEY);
  } catch {
    /* ignore */
  }
}
