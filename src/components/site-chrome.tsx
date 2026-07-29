import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoImg from "@/assets/kolytech-logo.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteSearch } from "@/components/site-search";
import { useKolyAssist } from "@/components/kolyassist";
import { KolyAssistMark } from "@/components/kolyassist/icon";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/ai", label: "AI" },
  { to: "/solar", label: "Solar" },
  { to: "/cctv", label: "CCTV" },
  { to: "/healthcare", label: "Healthcare" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ className = "" }: { className?: string; variant?: "light" | "dark" }) {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="KolyTech Communications"
        className="h-10 sm:h-11 w-auto object-contain"
      />
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { openAssist } = useKolyAssist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <div
        className={`w-full max-w-6xl rounded-3xl border border-border bg-card px-3 py-2 sm:px-4 transition-all duration-500 ${
          scrolled ? "shadow-glow-blue" : "shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-glow-blue"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openAssist}
              className="btn-press hidden md:inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-[13px] font-semibold text-white shadow-glow-blue"
            >
              <KolyAssistMark className="h-4 w-4" />
              KolyAssist AI
            </button>
            <Link
              to="/contact"
              className="btn-press hidden sm:inline-flex items-center gap-2 rounded-full bg-orange-gradient px-4 py-2 text-[13px] font-semibold text-white shadow-glow-orange"
            >
              Get a quote
            </Link>
            <SiteSearch />
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-9 w-9 grid place-items-center rounded-full border border-border bg-card"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <AnimatePresence>
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 grid gap-1 border-t border-border pt-2 overflow-hidden"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    className="block px-3 py-2 rounded-2xl text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openAssist();
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.03 * nav.length, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 flex items-center gap-2 rounded-2xl bg-brand-gradient px-3 py-2.5 text-sm font-semibold text-white"
              >
                <KolyAssistMark className="h-4 w-4" />
                Talk to KolyAssist AI
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background pb-20 lg:pb-0">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 text-foreground">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              KolyTech Communications is an IT Infrastructure, AI & Digital Solutions
              company delivering enterprise-grade infrastructure, network & security,
              AI, business automation and software development across Nigeria and beyond.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill glass text-primary">Powering Infrastructure</span>
              <span className="pill glass text-primary">Securing Systems</span>
              <span className="pill glass text-primary">Driving Innovation</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-primary">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {nav.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-brand-orange transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-primary">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-brand-orange" />
                <a href="mailto:kolytechcom@yahoo.com" className="hover:text-primary">
                  kolytechcom@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-brand-orange" />
                <a href="tel:+2348139135880" className="hover:text-primary">
                  +234 813 913 5880
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-orange" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KolyTech Communications. All rights reserved.</p>
          <p className="tracking-[0.2em]">
            POWERING <span className="text-brand-orange">INFRASTRUCTURE</span>. SECURING{" "}
            <span className="text-brand-orange">SYSTEMS</span>. DRIVING{" "}
            <span className="text-brand-orange">INNOVATION</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
