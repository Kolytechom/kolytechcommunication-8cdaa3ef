# Animation polish + image audit

Two-part effort: (1) unify all animations under one system for a premium, consistent feel, (2) audit and replace every image containing people so everyone appears authentically Nigerian/African.

## Part 1 — Unified animation system

### Audit of current state
- **Custom hooks**: `useScrollReveal` (IntersectionObserver adds `.in` class) and `useCountUp` (rAF, viewport-triggered) — work, but only home page uses reveal.
- **Ad-hoc CSS**: `animate-floaty`, hover `scale-[1.03]`, `hover:-translate-y-1` scattered across cards/buttons.
- **No unified stagger** for card grids; entrances are all triggered at once per section.
- **Inner pages** (`about`, `services`, `contact`, `cctv`, `solar`, `healthcare`) have no reveal system.
- **No `prefers-reduced-motion`** respect anywhere.
- **No page-transition** between routes.
- **FAQ/accordion, mobile menu, dropdown** — instant show/hide, no motion.

### Chosen library
**Framer Motion** (already ecosystem-standard, tree-shakeable, GPU transforms, built-in reduced-motion via `useReducedMotion`). One library, one timing token set.

### Timing tokens (single source in `src/lib/motion.ts`)
```
duration: { fast: 0.2, base: 0.35, slow: 0.55 }
ease:     { out: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] }
stagger:  { tight: 0.06, base: 0.09 }
```
Exports helper variants: `fadeUp`, `fadeIn`, `scaleIn`, `staggerParent`, `staggerChild`.

### Changes
1. Add `src/lib/motion.ts` with tokens + shared variants + `useReducedMotionSafe()` wrapper.
2. Add `<Reveal>` and `<StaggerGroup>` wrapper components (`src/components/motion.tsx`) using `whileInView` with `once: true, margin: "-10% 0px"`.
3. Replace the manual `.reveal` divs in `src/routes/index.tsx` with `<Reveal>`. Keep `useCountUp` (already good) but gate icons to animate in first.
4. Extend reveal + stagger to all inner routes.
5. **Cards** (service, portfolio, tech partners, capabilities): wrap grids in `<StaggerGroup>`; each item uses `fadeUp` + hover elevation via `whileHover={{ y: -4 }}` and a `motion.div` shadow token. Service card "Learn more" arrow already animates on hover — keep.
6. **Portfolio filter**: wrap items in `<AnimatePresence mode="popLayout">` with `layout` so filtering morphs smoothly.
7. **Hero**: parent stagger — eyebrow → h1 → paragraph → buttons (one-by-one) → stat pills; hero image fades + subtle scale from 1.02 → 1.
8. **Tech partners**: staggered fade; hover → `scale: 1.05` + grayscale-0 transition (add `grayscale` base class).
9. **Testimonials**: fade+slide; add small star-rating pulse if stars added (currently none — leave).
10. **Buttons**: global utility class `.btn-press` → `transition-transform`, `hover:scale-[1.02]`, `active:scale-[0.98]`; add lightweight ripple via a shared `<Ripple>` overlay component on primary CTAs only.
11. **FAQ**: replace conditional render with `<AnimatePresence>` height animation (`initial={{height:0, opacity:0}}`).
12. **Nav**: sticky nav opacity/blur transition on scroll (framer `useScroll`); mobile menu slide-in via `motion.div` `x: "100%" → 0`.
13. **Page transitions**: wrap `<Outlet />` in `__root.tsx` with `<AnimatePresence mode="wait">` keyed on `location.pathname`, fade+8px translate, 250ms.
14. **Images**: add `.img-fade` utility (opacity 0 → 1 on `load`) via a small `<FadeImage>` component; apply where images are prominent (hero, service, portfolio, feature-split).
15. **Reduced motion**: `useReducedMotion()` collapses variants to opacity-only, no transforms, 0.15s.
16. **Performance**: only `transform` + `opacity`; add `will-change` sparingly on hero image; keep IntersectionObserver `once`.

### Removed / consolidated
- `useScrollReveal` hook + `.reveal` CSS class (replaced by `<Reveal>`).
- Inline `hover:-translate-y-1`, ad-hoc `transition-transform` — replaced by shared motion primitives (but leave working micro-hovers where already tasteful).

## Part 2 — Image audit & replacement

### Audit
Bundled images in `src/assets/`:
- `hero-globe.jpg` — hero (may contain person)
- `service-infra.jpg` — feature-split (engineer)
- `service-cctv.jpg`, `service-healthcare.jpg`, `service-solar.jpg` — service pages
- `kolytech-logo*.png` — logos (keep)

Also check: `portfolio.tsx`, `carousel.tsx`, `tech-partners.tsx`, any remote URLs in routes.

### Replacement plan
Regenerate every people-containing image using `imagegen--generate_image` (premium tier for hero, standard for others) with prompts specifying **Nigerian/African professionals** in realistic Lagos settings:

| File | New prompt theme |
|---|---|
| `hero-globe.jpg` | Nigerian IT engineer in modern Lagos server room, cinematic |
| `service-infra.jpg` | Nigerian network engineer configuring switches/routers |
| `service-cctv.jpg` | Nigerian technician installing CCTV camera on wall |
| `service-healthcare.jpg` | Nigerian doctor/nurse using EMR on tablet in modern hospital |
| `service-solar.jpg` | Nigerian technician installing solar inverter + batteries |
| Portfolio tiles (if any people) | Nigerian professionals in matching contexts |
| Carousel slides (if people) | Same rules |
| Tech partners | Logos only — no change |

Consistent photorealistic corporate style, warm natural lighting, shallow depth of field, same colour grade across the set.

### Final report deliverable
After replacement, produce an in-chat report:
- files scanned
- foreign-people images found
- images replaced
- any items needing manual replacement (e.g. externally hosted URLs the agent can't overwrite)

## Out of scope
- Redesign, layout changes, new sections, copy edits, backend/CMS.

## Confirmation needed before build
1. **Library choice**: Framer Motion OK? (Alternative: GSAP — heavier, overkill here.)
2. **Page transitions**: 250ms fade+translate acceptable, or prefer no page transition (fastest perceived nav)?
3. **Image regeneration**: OK to overwrite the existing `src/assets/*.jpg` in place? (Preserves imports, no code churn.)