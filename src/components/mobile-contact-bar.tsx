import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const WA_HREF =
  "https://wa.me/2348139135880?text=Hello%20Kolytech%20Communication.%20I%20would%20like%20to%20make%20an%20enquiry.";

export function MobileContactBar() {
  const items = [
    { label: "Call", icon: Phone, href: "tel:+2348139135880" },
    { label: "WhatsApp", icon: MessageCircle, href: WA_HREF, external: true },
    { label: "Email", icon: Mail, href: "mailto:kolytechcom@yahoo.com" },
    {
      label: "Directions",
      icon: MapPin,
      href: "https://www.google.com/maps/search/?api=1&query=Lagos+Nigeria",
      external: true,
    },
  ];

  return (
    <nav
      aria-label="Quick contact"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-foreground/80 hover:text-brand-orange transition-colors"
            >
              <it.icon className="h-5 w-5" />
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
