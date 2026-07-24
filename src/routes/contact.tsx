import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { GlassCard } from "@/components/marketing";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KolyTech Communications" },
      {
        name: "description",
        content:
          "Get in touch with KolyTech Communications for a free consultation and site assessment. Lagos, Nigeria.",
      },
      { property: "og:title", content: "Contact KolyTech" },
      { property: "og:description", content: "Free consultation & site assessment." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

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
            Free consultation and site assessment for enterprise IT, CCTV, healthcare
            IT and solar installations.
          </p>
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
                  Thanks — a KolyTech specialist will get back to you within one business day.
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Interest
                    </label>
                    <select
                      name="interest"
                      className="form-field mt-1.5"
                    >
                      <option>Enterprise IT</option>
                      <option>CCTV & Security</option>
                      <option>Solar Installation</option>
                      <option>Healthcare IT</option>
                      <option>Cloud & Consulting</option>
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
                    className="mt-1.5 w-full rounded-2xl border border-border bg-white/70 backdrop-blur px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange"
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="mt-1.5 w-full rounded-2xl border border-border bg-white/70 backdrop-blur px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-orange"
      />
    </div>
  );
}
