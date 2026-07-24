import { motion, useReducedMotion, type MotionProps, type Variants } from "framer-motion";
import { forwardRef, type ElementType, type ReactNode } from "react";
import { fadeUp, staggerParent, viewportOnce, STAGGER, DUR, EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variants?: Variants;
} & Omit<MotionProps, "variants">;

/** Fades + lifts once on scroll into view. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variants,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion(as as ElementType) as typeof motion.div;
  const v: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : variants ?? fadeUp;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={v}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delayChildren?: number;
} & MotionProps;

/** Parent that staggers `<StaggerItem>` children on view. */
export function StaggerGroup({
  children,
  as = "div",
  className,
  stagger = STAGGER.base,
  delayChildren = 0.05,
  ...rest
}: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const Comp = motion(as as ElementType) as typeof motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={reduce ? { hidden: {}, show: {} } : staggerParent(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variants?: Variants;
} & Omit<MotionProps, "variants">;

export const StaggerItem = forwardRef<HTMLElement, StaggerItemProps>(function StaggerItem(
  { children, as = "div", className, variants, ...rest },
  ref,
) {
  const reduce = useReducedMotion();
  const Comp = motion(as as ElementType) as typeof motion.div;
  const v: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : variants ?? fadeUp;
  return (
    <Comp ref={ref as never} className={className} variants={v} {...rest}>
      {children}
    </Comp>
  );
});

/** Image that fades in when it finishes loading. */
export function FadeImage({
  className = "",
  onLoad,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      onLoad={(e) => {
        (e.currentTarget as HTMLImageElement).dataset.loaded = "true";
        onLoad?.(e);
      }}
      className={`img-fade ${className}`}
    />
  );
}

export { DUR, EASE };
