import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:scale-[1.05] ${className}`}
    >
      <Sun
        className={`h-4 w-4 absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-amber-500"
        }`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100 text-amber-400" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
}
