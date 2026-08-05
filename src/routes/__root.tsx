import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider, themeInitScript } from "../components/theme-provider";
import { WhatsAppButton } from "../components/whatsapp-button";
import { MobileContactBar } from "../components/mobile-contact-bar";
import { KolyAssistProvider } from "../components/kolyassist";
import { organizationSchema, websiteSchema, ldScript } from "../lib/seo";

const NOT_FOUND_LINKS = [
  { to: "/services", label: "Our services" },
  { to: "/knowledge", label: "Knowledge Centre" },
  { to: "/industries", label: "Industry solutions" },
  { to: "/case-studies", label: "Case studies" },
  { to: "/contact", label: "Contact us" },
];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="max-w-lg text-center">
        <span className="pill bg-orange-gradient text-white">404</span>
        <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-primary">
          We couldn't find that page.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The page may have moved or never existed. Here are the places most visitors
          are looking for.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {NOT_FOUND_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="btn-press inline-flex items-center justify-center rounded-full glass px-4 py-2 text-sm font-semibold text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-press inline-flex items-center justify-center rounded-full bg-orange-gradient px-6 py-3 text-sm font-semibold text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Kolytech Communication" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Kolytech Communication" },
      { title: "Kolytech Communication — IT Infrastructure, AI & Digital Solutions" },
      { property: "og:title", content: "Kolytech Communication — IT Infrastructure, AI & Digital Solutions" },
      { name: "twitter:title", content: "Kolytech Communication — IT Infrastructure, AI & Digital Solutions" },
      { name: "description", content: "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering network & security, AI, business automation, software development and digital innovation across Nigeria." },
      { property: "og:description", content: "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering network & security, AI, business automation, software development and digital innovation across Nigeria." },
      { name: "twitter:description", content: "Kolytech Communication is an IT Infrastructure, AI & Digital Solutions company delivering network & security, AI, business automation, software development and digital innovation across Nigeria." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01c49ed3-7297-43cd-b83c-44f371988c7b/id-preview-602025b1--3dcafcc9-51e1-46d9-849c-9c926df16ce3.lovable.app-1784887459998.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01c49ed3-7297-43cd-b83c-44f371988c7b/id-preview-602025b1--3dcafcc9-51e1-46d9-849c-9c926df16ce3.lovable.app-1784887459998.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://rsms.me/" },
      { rel: "preconnect", href: "https://rsms.me/", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [ldScript(organizationSchema), ldScript(websiteSchema)],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <KolyAssistProvider>
          <PageTransition />
          <WhatsAppButton />
          <MobileContactBar />
        </KolyAssistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
