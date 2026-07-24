import type { ReactNode } from "react";

type Tone = "blue" | "orange" | "mixed";

const toneMap: Record<Tone, { pill: string; bg: string; overlay: string }> = {
  blue: {
    pill: "bg-blue-gradient text-white",
    bg: "bg-hero",
    overlay: "from-brand-blue-deep/25 via-brand-blue/10 to-transparent",
  },
  orange: {
    pill: "bg-orange-gradient text-white",
    bg: "bg-hero",
    overlay: "from-brand-orange/25 via-brand-blue/10 to-transparent",
  },
  mixed: {
    pill: "bg-brand-gradient text-white",
    bg: "bg-hero",
    overlay: "from-brand-blue-deep/20 via-brand-blue/10 to-brand-orange/10",
  },
};

export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  image,
  imageAlt,
  tone = "blue",
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  tone?: Tone;
  children?: ReactNode;
}) {
  const t = toneMap[tone];
  return (
    <section className={`relative overflow-hidden pt-28 pb-20 ${t.bg}`}>
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
        <div className="text-foreground">
          <span className={`pill ${t.pill}`}>{eyebrow}</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-primary">
            {title}
            {accent && (
              <>
                <br />
                <span className="gradient-text-brand">{accent}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[2rem] shadow-glow-blue">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              width={1200}
              height={1400}
            />
            <div className={`absolute inset-0 bg-gradient-to-tr ${t.overlay}`} />
          </div>
          <div className="glass absolute -bottom-6 -left-6 rounded-2xl px-4 py-3 text-sm font-medium text-primary hidden sm:block">
            Trusted by healthcare, enterprise & government
          </div>
        </div>
      </div>
    </section>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-3xl p-6 sm:p-7 ${className}`}>{children}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="pill bg-orange-gradient text-white shadow-glow-orange">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
        {title}{" "}
        {accent && <span className="gradient-text-brand">{accent}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
