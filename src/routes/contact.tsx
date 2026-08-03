import { pageMeta, canonical, ldScript, webPageSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { GlassCard } from "@/components/marketing";
import { KolyAssistCTA } from "@/components/kolyassist";
import { readHandoff, type Handoff } from "@/components/kolyassist/report";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: "Contact Kolytech Communication — Lagos, Nigeria",
      description:
        "Free consultation and professional assessment for IT Infrastructure, AI Solutions, Business Automation, CCTV, Healthcare IT, Web & Software Development and Solar Power. Based in Lagos, serving Nigeria.",
      path: "/contact",
      ogTitle: "Contact Kolytech Communication",
      ogDescription: "Free consultation for IT Infrastructure, AI & Digital Solutions in Lagos, Nigeria.",
    }),
    links: canonical("/contact"),
    scripts: [
      ldScript(
        webPageSchema({
          name: "Contact Kolytech Communication",
          description: "Phone, email and enquiry form for Kolytech Communication, Lagos, Nigeria.",
          path: "/contact",
        }),
      ),
      ldScript(localBusinessSchema),
      ldScript(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [handoff, setHandoff] = useState<Handoff | null>(null);

  /* Carries a completed KolyAssist consultation into the enquiry. */
  useEffect(() => {
    setHandoff(readHandoff());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative pt-32 pb-16 bg-hero overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 text-foreground">
          <span className="pill bg-orange-gradient text-white">Contact us today</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] text-primary">
            Let's build something{" "}
            <span className="gradient-text-brand">reliable together.</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Free consultation and professional assessment for IT Infrastructure,
            AI Solutions, Business Automation, CCTV, Healthcare IT, Web & Software
            Development, and Solar Power Solutions.
          </p>
          <div className="mt-6">
            <KolyAssistCTA label="✨ Talk to KolyAssist" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-4 content-start">
            <GlassCard>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-orange-gradient grid place-items-center shadow-glow-orange">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href="mailto:kolytechcom@yahoo.com" className="font-semibold">
                    kolytechcom@yahoo.com
                  </a>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-orange-gradient grid place-items-center shadow-glow-orange">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                  <a href="tel:+2348139135880" className="font-semibold">
                    +234 813 913 5880
                  </a>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-orange-gradient grid place-items-center shadow-glow-orange">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                  <div className="font-semibold">Lagos, Nigeria</div>
                </div>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="!p-6 sm:!p-8">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-brand-orange mx-auto" />
                <h3 className="mt-4 text-2xl font-bold">Message received</h3>
                <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                  Thanks — a Kolytech specialist will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-4"
              >
                {handoff && (
                  <div className="rounded-2xl border border-brand-orange/40 bg-card p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                      KolyAssist consultation {handoff.reference}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      We've pre-filled your details and attached your consultation summary so you
                      don't have to repeat yourself.
                    </p>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" required defaultValue={handoff?.name} />
                  <Field label="Email" name="email" type="email" required defaultValue={handoff?.email} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" defaultValue={handoff?.phone} />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Interest
                    </label>
                    <select
                      name="interest"
                      className="form-field mt-1.5"
                    >
                      <option>Enterprise IT</option>
                      <option>AI Solutions & Digital Innovation</option>
                      <option>CCTV & Security</option>
                      <option>Solar Installation</option>
                      <option>Healthcare IT</option>
                    </select>

                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Project details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="form-field mt-1.5"
                    defaultValue={handoff?.summary ?? ""}
                    key={handoff?.reference ?? "blank"}
                    placeholder="Tell us about your site and what you'd like to achieve."
                  />

                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-orange hover:scale-[1.02] transition-transform"
                >
                  Send message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        key={defaultValue ?? "empty"}
        className="form-field mt-1.5"
      />

    </div>
  );
}
