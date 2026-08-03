import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail — pair with breadcrumbSchema() for the JSON-LD. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-foreground">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link to={c.path} className="hover:text-brand-orange transition-colors">
                    {c.name}
                  </Link>
                  <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
