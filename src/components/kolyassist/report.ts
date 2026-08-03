/**
 * Executive reporting layer for KolyAssist — consultation reference, readiness
 * dashboard, investment guidance and the plain-text report body reused by the
 * PDF/DOCX exports and the contact-form handoff.
 */
import type { Recommendation, ConsultationContext } from "./intelligence";
import { labelForNeed } from "./data";

export const HANDOFF_KEY = "kolyassist_handoff_v1";

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
  b.push({ kind: "h1", text: "Technology Consultation Report" });
  b.push({
    kind: "p",
    text: `Kolytech Communication · IT Infrastructure, AI & Digital Solutions · Lagos, Nigeria`,
  });
  b.push({
    kind: "p",
    text: `Reference ${p.reference} · Issued ${p.date}`,
  });

  b.push({ kind: "h2", text: "Prepared for" });
  b.push({
    kind: "bullets",
    items: [
      `Name: ${p.contact.name || "—"}`,
      `Organisation: ${p.contact.company || "—"}`,
      `Email: ${p.contact.email || "—"}`,
      `Phone: ${p.contact.phone || "—"}`,
      `Sector: ${p.rec.industry.label}`,
    ],
  });

  b.push({ kind: "h2", text: "Executive summary" });
  b.push({ kind: "p", text: p.rec.advisorNote });
  b.push({
    kind: "p",
    text: `Areas raised: ${p.ctx.needs.map(labelForNeed).join(", ") || "—"}.`,
  });

  b.push({ kind: "h2", text: "Readiness dashboard" });
  b.push({
    kind: "bullets",
    items: p.dashboard.map((m) => `${m.label}: ${m.value}% — ${m.caption}`),
  });

  b.push({ kind: "h2", text: "Recommended solutions" });
  b.push({
    kind: "bullets",
    items: p.rec.solutions.map((s) => `${s.title} — ${s.short}`),
  });

  b.push({ kind: "h2", text: "Why this fits your organisation" });
  b.push({ kind: "bullets", items: p.rec.rationale });

  b.push({ kind: "h2", text: "Expected business benefits" });
  b.push({ kind: "bullets", items: p.rec.benefits });

  b.push({ kind: "h2", text: "Implementation roadmap" });
  b.push({
    kind: "bullets",
    items: p.rec.order.map((o) => `${o.phase}: ${o.service.title} — ${o.note}`),
  });

  b.push({ kind: "h2", text: "Estimated timeline" });
  b.push({ kind: "p", text: p.rec.estimate });

  b.push({ kind: "h2", text: "Investment guidance" });
  b.push({ kind: "p", text: p.investment });

  b.push({ kind: "h2", text: "Projected value" });
  b.push({ kind: "bullets", items: p.value });

  b.push({ kind: "h2", text: "Complementary services" });
  b.push({ kind: "bullets", items: p.rec.complementary });

  b.push({ kind: "h2", text: "What happens next" });
  b.push({
    kind: "bullets",
    items: NEXT_ACTIONS.map((a, i) => `${i + 1}. ${a.title} — ${a.body}`),
  });

  b.push({ kind: "h2", text: "Contact Kolytech Communication" });
  b.push({
    kind: "bullets",
    items: [
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

/** Stored so /contact can pre-fill with consultation context. */
export function saveHandoff(p: ReportPayload) {
  try {
    localStorage.setItem(
      HANDOFF_KEY,
      JSON.stringify({
        reference: p.reference,
        name: p.contact.name,
        email: p.contact.email,
        phone: p.contact.phone,
        company: p.contact.company,
        industry: p.rec.industry.label,
        interest: p.rec.solutions[0]?.title ?? "",
        summary: reportText(p),
        savedAt: Date.now(),
      }),
    );
  } catch {
    /* storage unavailable — the panel still works */
  }
}

export type Handoff = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  interest: string;
  summary: string;
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
