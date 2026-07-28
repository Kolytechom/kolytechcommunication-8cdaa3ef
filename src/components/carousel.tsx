import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import solarImg from "@/assets/service-solar.jpg";
import cctvImg from "@/assets/service-cctv.jpg";
import healthImg from "@/assets/service-healthcare.jpg";
import infraImg from "@/assets/service-infra.jpg";
import aiImg from "@/assets/service-ai.jpg";

type Slide = {
  title: string;
  tag: string;
  body: string;
  img: string;
  to: string;
  accent: string;
};

const slides: Slide[] = [
  {
    tag: "Solar",
    title: "Sustainable power, engineered for uptime.",
    body: "Residential, commercial, hybrid and off-grid solar systems with inverter and battery backup.",
    img: solarImg,
    to: "/solar",
    accent: "from-brand-orange/80 to-brand-orange-glow/60",
  },
  {
    tag: "CCTV",
    title: "Smart security. Complete protection.",
    body: "HD dome, PTZ, IP and bullet cameras with DVR/NVR storage and remote viewing anywhere.",
    img: cctvImg,
    to: "/cctv",
    accent: "from-primary/80 to-brand-blue/60",
  },
  {
    tag: "Healthcare IT",
    title: "Connecting care. Powering health.",
    body: "EMR deployment, hospital networking and healthcare-grade servers with 24/7 support.",
    img: healthImg,
    to: "/healthcare",
    accent: "from-brand-blue/80 to-brand-orange/60",
  },
  {
    tag: "Infrastructure",
    title: "High-availability by design.",
    body: "Windows Server, virtualization, structured cabling and enterprise network deployment.",
    img: infraImg,
    to: "/services",
    accent: "from-primary/80 to-brand-blue/60",
  },
  {
    tag: "AI & Digital Innovation",
    title: "AI, automation & digital innovation.",
    body: "AI strategy, business automation, chatbots, custom software, SaaS and digital transformation.",
    img: aiImg,
    to: "/ai",
    accent: "from-brand-orange/70 to-brand-blue/60",
  },
];

export function FeaturedCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <span className="pill bg-orange-gradient text-white">Featured</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-primary">
              Solutions in <span className="gradient-text-brand">motion.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Swipe, scroll or tap through the practices we deliver end-to-end.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              className="h-11 w-11 grid place-items-center rounded-full border border-border bg-card hover:bg-secondary transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-primary" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              className="h-11 w-11 grid place-items-center rounded-full bg-primary text-primary-foreground hover:scale-[1.05] transition-transform"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-10 flex gap-5 overflow-x-auto snap-x-cards no-scrollbar px-6 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pb-6"
      >
        {slides.map((s, i) => {
          const isActive = active === i;
          return (
            <Link
              key={s.tag}
              to={s.to}
              data-card
              className={`tilt-card group relative shrink-0 w-[82%] sm:w-[62%] md:w-[46%] lg:w-[38%] rounded-[2rem] overflow-hidden border border-border bg-card transition-all duration-500 ${
                isActive ? "shadow-glow-blue scale-[1.02]" : "shadow-sm scale-100 opacity-90"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.accent} mix-blend-multiply opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <span className="pill absolute top-4 left-4 bg-card text-primary text-xs font-semibold border border-border">
                  {s.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-2 flex items-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active === i ? "w-8 bg-brand-orange" : "w-3 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
