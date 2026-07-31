/** KolyAssist mark — an orbiting intelligence spark. No generic robots. */
export function KolyAssistMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden focusable="false">
      <defs>
        <linearGradient id="ka-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.2c1.1 3.9 2.6 6.3 4.9 7.9 1.7 1.2 3.7 1.9 6.9 2.6-3.9 1.1-6.3 2.6-7.9 4.9-1.2 1.7-1.9 3.7-2.6 6.9-1.1-3.9-2.6-6.3-4.9-7.9-1.7-1.2-3.7-1.9-6.9-2.6 3.9-1.1 6.3-2.6 7.9-4.9C14.6 8.4 15.3 6.4 16 3.2Z"
        fill="url(#ka-g)"
      />
      <path
        d="M25.2 21.4c.4 1.5 1 2.4 1.9 3 .7.5 1.5.8 2.7 1-1.5.4-2.4 1-3 1.9-.5.7-.8 1.5-1 2.7-.4-1.5-1-2.4-1.9-3-.7-.5-1.5-.8-2.7-1 1.5-.4 2.4-1 3-1.9.5-.7.8-1.5 1-2.7Z"
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx="6.4" cy="6.4" r="1.9" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
