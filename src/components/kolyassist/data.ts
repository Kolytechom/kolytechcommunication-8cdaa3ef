import { services, type Service } from "@/lib/services-data";

export type NeedId =
  | "ai"
  | "cctv"
  | "infrastructure"
  | "solar"
  | "healthcare"
  | "software"
  | "support";

export type Option = { id: string; label: string; hint?: string };

export const needOptions: Option[] = [
  { id: "ai", label: "AI Solutions & Automation", hint: "Chatbots, workflow automation, AI strategy" },
  { id: "cctv", label: "CCTV & Security Surveillance", hint: "IP cameras, access control, monitoring" },
  { id: "infrastructure", label: "IT Infrastructure & Networking", hint: "Servers, LAN/WAN, structured cabling" },
  { id: "software", label: "Software, Web & Mobile Development", hint: "SaaS, portals, apps, UI/UX" },
  { id: "solar", label: "Solar & Power Solutions", hint: "Inverters, batteries, hybrid systems" },
  { id: "healthcare", label: "Healthcare / Hospital IT", hint: "HMIS, clinical networks, uptime" },
  { id: "support", label: "IT Support & Managed Services", hint: "Helpdesk, maintenance, procurement" },
];

export const organisationOptions: Option[] = [
  { id: "sme", label: "Small or medium business" },
  { id: "enterprise", label: "Large enterprise" },
  { id: "healthcare", label: "Hospital or clinic" },
  { id: "government", label: "Government or public sector" },
  { id: "education", label: "School or university" },
  { id: "startup", label: "Startup or new venture" },
];

export const scaleOptions: Option[] = [
  { id: "single", label: "One site or office" },
  { id: "multi", label: "Multiple sites" },
  { id: "national", label: "Nationwide operation" },
];

export const timelineOptions: Option[] = [
  { id: "urgent", label: "Urgent — within 2 weeks" },
  { id: "quarter", label: "This quarter" },
  { id: "planning", label: "Planning & budgeting" },
];

/** Maps a selected need to the existing service definition. */
const needToSlug: Record<string, string> = {
  ai: "ai",
  software: "ai",
  cctv: "cctv",
  infrastructure: "infrastructure",
  solar: "solar",
  healthcare: "healthcare",
  support: "support",
};

export function recommendServices(needs: string[], organisation: string): Service[] {
  const slugs = new Set(needs.map((n) => needToSlug[n]).filter(Boolean));
  if (organisation === "healthcare") slugs.add("healthcare");
  if (organisation === "enterprise" || organisation === "government") slugs.add("infrastructure");
  if (slugs.size === 0) slugs.add("ai");
  return services.filter((s) => slugs.has(s.slug)).slice(0, 4);
}

export function advisorNote(organisation: string, scale: string, timeline: string) {
  const org =
    organisationOptions.find((o) => o.id === organisation)?.label.toLowerCase() ??
    "your organisation";
  const reach = scaleOptions.find((o) => o.id === scale)?.label.toLowerCase() ?? "your site";
  const when = timelineOptions.find((o) => o.id === timeline)?.label.toLowerCase() ?? "your timeline";
  return `Based on ${org} operating across ${reach}, and a timeline of ${when}, here is the delivery path our specialists recommend.`;
}
