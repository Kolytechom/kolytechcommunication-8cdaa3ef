import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Loader2 } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { ConsultationContext, Recommendation } from "./intelligence";
import {
  NEXT_ACTIONS,
  buildPayload,
  makeReference,
  reportBlocks,
  reportText,
  saveHandoff,
  type Contact,
  type ReportPayload,
} from "./report";

function download(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

async function exportPdf(p: ReportPayload) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const bottom = doc.internal.pageSize.getHeight() - margin;
  let y = margin;

  const ensure = (needed: number) => {
    if (y + needed > bottom) {
      doc.addPage();
      y = margin;
    }
  };

  for (const block of reportBlocks(p)) {
    if (block.kind === "h1") {
      ensure(34);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(15, 42, 90);
      doc.text(doc.splitTextToSize(block.text, width), margin, y);
      y += 28;
    } else if (block.kind === "h2") {
      ensure(30);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(226, 110, 32);
      doc.text(block.text, margin, y);
      y += 18;
    } else if (block.kind === "p") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(48, 48, 48);
      const lines = doc.splitTextToSize(block.text, width) as string[];
      for (const line of lines) {
        ensure(16);
        doc.text(line, margin, y);
        y += 15;
      }
      y += 4;
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(48, 48, 48);
      for (const item of block.items) {
        const lines = doc.splitTextToSize(item, width - 14) as string[];
        lines.forEach((line, i) => {
          ensure(16);
          doc.text(i === 0 ? `\u2022 ${line}` : `  ${line}`, margin, y);
          y += 15;
        });
      }
      y += 4;
    }
  }

  doc.save(`Kolytech-Consultation-${p.reference}.pdf`);
}

async function exportDocx(p: ReportPayload) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");
  const children = reportBlocks(p).flatMap((block) => {
    if (block.kind === "h1")
      return [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: block.text, bold: true, size: 40 })],
        }),
      ];
    if (block.kind === "h2")
      return [
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [new TextRun({ text: block.text, bold: true, size: 26, color: "E26E20" })],
        }),
      ];
    if (block.kind === "p")
      return [
        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: block.text, size: 22 })],
        }),
      ];
    return block.items.map(
      (i) =>
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: [new TextRun({ text: i, size: 22 })],
        }),
    );
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  download(blob, `Kolytech-Consultation-${p.reference}.docx`);
}

export function ExecutiveSummary({
  contact,
  ctx,
  rec,
}: {
  contact: Contact;
  ctx: ConsultationContext;
  rec: Recommendation;
}) {
  const [reference] = useState(() => makeReference());
  const [busy, setBusy] = useState<"pdf" | "docx" | null>(null);

  const payload = useMemo(
    () => buildPayload(reference, contact, ctx, rec),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reference, JSON.stringify(contact), JSON.stringify(ctx), rec.industry.id, rec.confidenceScore],
  );

  /* Carry the consultation forward to the contact form and email/WhatsApp. */
  useEffect(() => {
    saveHandoff(payload);
  }, [payload]);

  const run = async (kind: "pdf" | "docx") => {
    setBusy(kind);
    try {
      if (kind === "pdf") await exportPdf(payload);
      else await exportDocx(payload);
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <Block title="Consultation reference">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="font-mono text-sm font-bold tracking-wide text-primary">{reference}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Issued {payload.date}. Quote this reference in any follow-up and we will pick up exactly
            where you left off.
          </p>
        </div>
      </Block>

      <Block title="Executive dashboard">
        <div className="grid gap-2.5">
          {payload.dashboard.map((m, i) => (
            <div key={m.label} className="rounded-2xl border border-border bg-card p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span>{m.label}</span>
                <span className="text-brand-orange">{m.value}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-brand-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 0.5, ease: EASE.out, delay: 0.05 * i }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{m.caption}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Investment guidance">
        <p className="rounded-2xl border border-border bg-card p-3.5 text-sm text-muted-foreground leading-relaxed">
          {payload.investment}
        </p>
      </Block>

      <Block title="Projected value">
        <ul className="grid gap-2">
          {payload.value.map((v) => (
            <li key={v} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
              {v}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="What happens next">
        <ol className="grid gap-2">
          {NEXT_ACTIONS.map((a, i) => (
            <li key={a.title} className="rounded-2xl border border-border bg-card p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Step {i + 1}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Take your report with you">
        <div className="grid gap-2 sm:grid-cols-2">
          <ExportButton
            label="Download PDF report"
            icon={busy === "pdf" ? Loader2 : FileText}
            spinning={busy === "pdf"}
            onClick={() => run("pdf")}
          />
          <ExportButton
            label="Download Word report"
            icon={busy === "docx" ? Loader2 : Download}
            spinning={busy === "docx"}
            onClick={() => run("docx")}
          />
        </div>
        <a
          href={`mailto:kolytechcom@yahoo.com?subject=${encodeURIComponent(
            `KolyAssist consultation ${reference}`,
          )}&body=${encodeURIComponent(reportText(payload).slice(0, 1800))}`}
          className="mt-2 inline-flex text-xs font-semibold text-brand-orange hover:underline"
        >
          Email this summary to Kolytech
        </a>
      </Block>
    </>
  );
}

function ExportButton({
  label,
  icon: Icon,
  spinning,
  onClick,
}: {
  label: string;
  icon: typeof FileText;
  spinning: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={spinning}
      className="btn-press inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-primary disabled:opacity-60"
    >
      <Icon className={`h-4 w-4 text-brand-orange ${spinning ? "animate-spin" : ""}`} aria-hidden />
      {label}
    </button>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}
