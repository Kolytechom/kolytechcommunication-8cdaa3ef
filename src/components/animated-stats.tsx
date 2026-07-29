import { useCountUp } from "@/hooks/use-count-up";
import { Award, Briefcase, Users, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/marketing";
import { YEARS_EXPERIENCE } from "@/lib/company";

type Stat = { icon: LucideIcon; value: number; suffix: string; label: string };

const stats: Stat[] = [
  { icon: Award, value: YEARS_EXPERIENCE, suffix: "+", label: "Years Experience" },
  { icon: Briefcase, value: 500, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: 200, suffix: "+", label: "Satisfied Clients" },
  { icon: ThumbsUp, value: 99, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ stat }: { stat: Stat }) {
  const { value, ref } = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <div className="glass rounded-3xl p-6 text-center transition-transform hover:-translate-y-1">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-gradient grid place-items-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="mt-4 text-4xl sm:text-5xl font-black text-primary">
        <span ref={ref}>{value}</span>
        <span className="text-brand-orange">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
}

export function AnimatedStats() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="By the numbers"
          title="Proven results,"
          accent="year after year."
          description="Nearly two decades of powering Nigerian organizations with resilient technology."
        />
        <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <Counter key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
