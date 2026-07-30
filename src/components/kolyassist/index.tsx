import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { KolyAssistMark } from "./icon";
import {
  advisorNote,
  buildFlow,
  labelForNeed,
  labelForOption,
  needOptions,
  recommendServices,
  type QuestionDef,
} from "./data";
import { EASE } from "@/lib/motion";

const STORAGE_KEY = "kolyassist_session_v2";

type Responses = Record<string, string[]>;

type Answers = {
  needs: string[];
  responses: Responses;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const emptyAnswers: Answers = {
  needs: [],
  responses: {},
  name: "",
  email: "",
  phone: "",
  company: "",
};

type Ctx = { open: boolean; openAssist: () => void; closeAssist: () => void };
const KolyAssistContext = createContext<Ctx | null>(null);

export function useKolyAssist() {
  const ctx = useContext(KolyAssistContext);
  if (!ctx) throw new Error("useKolyAssist must be used inside <KolyAssistProvider>");
  return ctx;
}

export function KolyAssistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<Ctx>(
    () => ({ open, openAssist: () => setOpen(true), closeAssist: () => setOpen(false) }),
    [open],
  );
  return (
    <KolyAssistContext.Provider value={value}>
      {children}
      <KolyAssistPanel />
      <KolyAssistLauncher />
    </KolyAssistContext.Provider>
  );
}

/* ---------------------------------- CTAs ---------------------------------- */

export function KolyAssistCTA({
  className = "",
  variant = "solid",
  label = "Talk to KolyAssist AI",
}: {
  className?: string;
  variant?: "solid" | "glass" | "link";
  label?: string;
}) {
  const { openAssist } = useKolyAssist();
  const base =
    variant === "solid"
      ? "btn-press inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-blue"
      : variant === "glass"
        ? "btn-press inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary"
        : "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-orange transition-colors";
  return (
    <button type="button" onClick={openAssist} className={`${base} ${className}`}>
      <Sparkles className="h-4 w-4 text-brand-orange" aria-hidden />
      {label}
    </button>
  );
}

function KolyAssistLauncher() {
  const { open, openAssist } = useKolyAssist();
  const reduce = useReducedMotion();
  if (open) return null;
  return (
    <motion.button
      type="button"
      onClick={openAssist}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE.out, delay: 0.6 }}
      whileHover={reduce ? undefined : { y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Talk to KolyAssist AI — your intelligent business technology advisor"
      className="fixed bottom-40 right-4 lg:bottom-44 lg:right-6 z-[55] flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3 text-white shadow-glow-blue"
    >
      <KolyAssistMark className="h-5 w-5" />
      <span className="hidden sm:inline text-[13px] font-semibold">KolyAssist AI</span>
    </motion.button>
  );
}

/* --------------------------------- Panel ---------------------------------- */

function useSession() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { step?: number; answers?: Partial<Answers> };
        if (parsed.answers)
          setAnswers({ ...emptyAnswers, ...parsed.answers, responses: parsed.answers.responses ?? {} });
        if (typeof parsed.step === "number") setStep(Math.max(0, parsed.step));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {}
  }, [step, answers, loaded]);

  const reset = useCallback(() => {
    setAnswers(emptyAnswers);
    setStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { step, setStep, answers, setAnswers, reset };
}

function KolyAssistPanel() {
  const { open, closeAssist } = useKolyAssist();
  const reduce = useReducedMotion();
  const { step, setStep, answers, setAnswers, reset } = useSession();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAssist();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeAssist]);

  /* ---------------- Adaptive flow ---------------- */
  const flow = useMemo(() => buildFlow(answers.needs), [answers.needs]);
  // 0 welcome · 1 needs · flow steps · contact · summary · recommendation
  const CONTACT_STEP = 2 + flow.length;
  const SUMMARY_STEP = CONTACT_STEP + 1;
  const RESULT_STEP = SUMMARY_STEP + 1;
  const totalSteps = RESULT_STEP + 1;
  const safeStep = Math.min(step, totalSteps - 1);
  const flowStep = safeStep >= 2 && safeStep < CONTACT_STEP ? flow[safeStep - 2] : null;

  const toggleNeed = (id: string) =>
    setAnswers((a) => ({
      ...a,
      needs: a.needs.includes(id) ? a.needs.filter((n) => n !== id) : [...a.needs, id],
    }));

  const pick = (qd: QuestionDef, optionId: string) =>
    setAnswers((a) => {
      const cur = a.responses[qd.id] ?? [];
      const next =
        qd.type === "multi"
          ? cur.includes(optionId)
            ? cur.filter((v) => v !== optionId)
            : [...cur, optionId]
          : [optionId];
      return { ...a, responses: { ...a.responses, [qd.id]: next } };
    });

  const stepAnswered = (fs: typeof flowStep) =>
    !fs || fs.questions.every((qd) => qd.optional || (answers.responses[qd.id] ?? []).length > 0);

  const canContinue =
    safeStep === 0 ||
    (safeStep === 1 && answers.needs.length > 0) ||
    (!!flowStep && stepAnswered(flowStep)) ||
    (safeStep === CONTACT_STEP &&
      answers.name.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(answers.email)) ||
    safeStep >= SUMMARY_STEP;

  const organisation = answers.responses.organisation?.[0] ?? "";
  const scale = answers.responses.scale?.[0] ?? "";
  const timeline = answers.responses.timeline?.[0] ?? "";
  const recs = recommendServices(answers.needs, organisation);

  const progress = ((safeStep + 1) / totalSteps) * 100;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center sm:justify-center">
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE.out }}
            onClick={closeAssist}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="KolyAssist AI consultation"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE.out }}
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto glass rounded-t-3xl sm:rounded-3xl border border-glass-border p-5 sm:p-8"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted-foreground/30 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow-blue">
                  <KolyAssistMark className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-primary leading-tight">KolyAssist AI</h2>
                  <p className="text-[11px] text-muted-foreground">
                    Your Intelligent Business Technology Advisor
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAssist}
                aria-label="Close KolyAssist AI"
                className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-foreground/70 hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>
                  Step {safeStep + 1} of {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-brand-gradient"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: EASE.out }}
                />
              </div>
            </div>

            {/* Steps */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={flowStep ? flowStep.id : safeStep}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease: EASE.out }}
                className="mt-6"
              >
                {safeStep === 0 && (
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                      Welcome to <span className="gradient-text-brand">KolyAssist AI</span>
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      Your Intelligent Business Technology Advisor. I'm here to help you identify
                      the right technology solutions for your organisation. Answer a few questions
                      and I'll recommend the services that best fit your needs.
                    </p>
                  </div>
                )}

                {safeStep === 1 && (
                  <Question
                    title="What do you need help with?"
                    hint="Select all that apply — I'll only ask the questions that matter for your choices."
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      {needOptions.map((o) => (
                        <Choice
                          key={o.id}
                          label={o.label}
                          hint={o.hint}
                          selected={answers.needs.includes(o.id)}
                          onClick={() => toggleNeed(o.id)}
                        />
                      ))}
                    </div>
                  </Question>
                )}

                {flowStep && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                      {flowStep.heading}
                    </p>
                    <div className="mt-4 grid gap-6">
                      {flowStep.questions.map((qd) => {
                        const sel = answers.responses[qd.id] ?? [];
                        return (
                          <Question
                            key={qd.id}
                            title={qd.title}
                            hint={qd.hint ?? (qd.type === "multi" ? "Select all that apply." : undefined)}
                            size="sm"
                          >
                            <div
                              className={`grid gap-2 ${
                                qd.options.length > 3 ? "sm:grid-cols-2" : "sm:grid-cols-3"
                              }`}
                            >
                              {qd.options.map((o) => (
                                <Choice
                                  key={o.id}
                                  label={o.label}
                                  hint={o.hint}
                                  selected={sel.includes(o.id)}
                                  onClick={() => pick(qd, o.id)}
                                />
                              ))}
                            </div>
                          </Question>
                        );
                      })}
                    </div>
                  </div>
                )}

                {safeStep === CONTACT_STEP && (
                  <Question
                    title="Where should we send your recommendation?"
                    hint="A KolyTech specialist reviews every consultation."
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldInput
                        label="Full name"
                        value={answers.name}
                        onChange={(v) => setAnswers((a) => ({ ...a, name: v }))}
                        required
                      />
                      <FieldInput
                        label="Email"
                        type="email"
                        value={answers.email}
                        onChange={(v) => setAnswers((a) => ({ ...a, email: v }))}
                        required
                      />
                      <FieldInput
                        label="Phone"
                        type="tel"
                        value={answers.phone}
                        onChange={(v) => setAnswers((a) => ({ ...a, phone: v }))}
                      />
                      <FieldInput
                        label="Organisation"
                        value={answers.company}
                        onChange={(v) => setAnswers((a) => ({ ...a, company: v }))}
                      />
                    </div>
                  </Question>
                )}

                {safeStep === SUMMARY_STEP && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                      Review your <span className="gradient-text-brand">consultation brief.</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Tap any answer to jump back and edit it.
                    </p>

                    <div className="mt-4 grid gap-2">
                      <SummaryRow
                        label="Services"
                        value={answers.needs.map(labelForNeed).join(", ") || "—"}
                        onEdit={() => setStep(1)}
                      />
                      {flow.map((fs, i) =>
                        fs.questions.map((qd) => (
                          <SummaryRow
                            key={qd.id}
                            label={qd.title}
                            value={
                              (answers.responses[qd.id] ?? [])
                                .map((v) => labelForOption(qd, v))
                                .join(", ") || "—"
                            }
                            onEdit={() => setStep(2 + i)}
                          />
                        )),
                      )}
                      <SummaryRow
                        label="Contact"
                        value={[answers.name, answers.email, answers.phone, answers.company]
                          .filter(Boolean)
                          .join(" · ")}
                        onEdit={() => setStep(CONTACT_STEP)}
                      />
                    </div>
                  </div>
                )}

                {safeStep === RESULT_STEP && (
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-foreground">
                      {answers.name ? `${answers.name.split(" ")[0]}, here's` : "Here's"} your{" "}
                      <span className="gradient-text-brand">recommended path.</span>
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {advisorNote(organisation, scale, timeline)}
                    </p>
                    <div className="mt-5 grid gap-3">
                      {recs.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <motion.div
                            key={s.slug}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE.out, delay: 0.06 * i }}
                            className="rounded-2xl border border-border bg-card p-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
                                <Icon className="h-4.5 w-4.5" />
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-primary">{s.title}</h4>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                  {s.short}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        onClick={closeAssist}
                        className="btn-press inline-flex items-center gap-2 rounded-full bg-orange-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange"
                      >
                        Book a specialist call <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={reset}
                        className="btn-press inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-primary"
                      >
                        Start over
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer nav */}
            <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setStep(Math.max(0, safeStep - 1))}
                disabled={safeStep === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              <p className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Powered by Kolytech Communication
              </p>

              {safeStep < RESULT_STEP ? (
                <button
                  type="button"
                  onClick={() => setStep(Math.min(RESULT_STEP, safeStep + 1))}
                  disabled={!canContinue}
                  className="btn-press inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-40 disabled:pointer-events-none"
                >
                  {safeStep === 0
                    ? "Start Consultation"
                    : safeStep === SUMMARY_STEP
                      ? "Get recommendation"
                      : "Next"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeAssist}
                  className="btn-press inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-primary"
                >
                  Done <Check className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="sm:hidden mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Powered by Kolytech Communication
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-3.5">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground break-words">{value || "—"}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10"
      >
        Edit
      </button>
    </div>
  );
}


/* ------------------------------- Primitives ------------------------------- */

function Question({
  title,
  hint,
  size = "lg",
  children,
}: {
  title: string;
  hint?: string;
  size?: "lg" | "sm";
  children: ReactNode;
}) {
  return (
    <div>
      <h3
        className={
          size === "sm"
            ? "text-base sm:text-lg font-bold tracking-tight text-foreground"
            : "text-xl sm:text-2xl font-black tracking-tight text-foreground"
        }
      >
        {title}
      </h3>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}


function Choice({
  label,
  hint,
  selected,
  onClick,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group text-left rounded-2xl border p-3.5 transition-all duration-200 ${
        selected
          ? "border-brand-orange bg-card shadow-glow-orange"
          : "border-border bg-card hover:border-brand-blue/50 hover:-translate-y-0.5"
      }`}
    >
      <span className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full border transition-colors ${
            selected ? "border-brand-orange bg-brand-orange text-white" : "border-border"
          }`}
        >
          {selected && <Check className="h-3 w-3" />}
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">{label}</span>
          {hint && <span className="mt-0.5 block text-[11px] text-muted-foreground">{hint}</span>}
        </span>
      </span>
    </button>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="form-field mt-1.5"
      />
    </label>
  );
}
