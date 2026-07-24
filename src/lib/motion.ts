import type { Variants, Transition } from "framer-motion";

export const DUR = { fast: 0.2, base: 0.35, slow: 0.55 } as const;
export const EASE = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
export const STAGGER = { tight: 0.06, base: 0.09 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: EASE.out } },
};

export const staggerParent = (stagger: number = STAGGER.base, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

export const hoverLift: Transition = { duration: DUR.fast, ease: EASE.out };
