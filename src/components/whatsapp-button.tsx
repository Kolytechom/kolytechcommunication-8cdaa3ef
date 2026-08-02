import { useEffect, useState } from "react";
import { X } from "lucide-react";

const WA_HREF =
  "https://wa.me/2348139135880?text=Hello%20Kolytech%20Communication.%20I%20would%20like%20to%20make%20an%20enquiry.";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.315.244-.66.244-1.002 0-.66-1.83-1.6-2.278-1.6zM16.44 3.583C9.126 3.583 3.05 9.66 3.05 16.973c0 2.478.7 4.898 2.008 6.99L3 32l8.28-1.977a13.394 13.394 0 0 0 5.156 1.03c7.312 0 13.39-6.076 13.39-13.39s-6.078-13.39-13.39-13.39zm0 24.626c-1.677 0-3.34-.43-4.797-1.244l-.344-.204-5.117 1.225 1.36-4.99-.229-.35a11.062 11.062 0 0 1-1.75-5.98c0-6.104 4.984-11.087 11.088-11.087s11.087 4.983 11.087 11.087c0 6.105-4.984 11.087-11.087 11.087z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("kt_wa_popup_shown") === "1") {
        setDismissed(true);
        return;
      }
    } catch {}
    const t = window.setTimeout(() => {
      setShowPopup(true);
      try {
        sessionStorage.setItem("kt_wa_popup_shown", "1");
      } catch {}
    }, 10000);
    return () => window.clearTimeout(t);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setDismissed(true);
  };

  return (
    <>
      {showPopup && !dismissed && (
        <div
          className="fixed bottom-40 right-4 lg:bottom-28 lg:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm animate-rise"
          role="dialog"
          aria-label="Chat with Kolytech on WhatsApp"
        >
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Kolytech Support</div>
                <div className="text-[11px] opacity-90">Typically replies in minutes</div>
              </div>
              <button
                onClick={closePopup}
                aria-label="Close chat popup"
                className="rounded-full p-1 hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-foreground">
                Hi 👋
                <br />
                Need help choosing the right IT solution? Our team is ready to help.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closePopup}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <button
                  onClick={closePopup}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kolytech on WhatsApp"
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-[60] group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden />
        <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 group-hover:scale-110">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
      </a>
    </>
  );
}
