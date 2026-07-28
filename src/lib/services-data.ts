import {
  Server,
  Network,
  Shield,
  Sun,
  Camera,
  HeartPulse,
  Brain,
  Wrench,
  Cpu,
  Database,
  Lock,
  Monitor,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  bullets: string[];
};

export type ServiceCategory = {
  title: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "infrastructure",
    title: "Core IT & Infrastructure",
    short: "Enterprise-grade infrastructure designed for uptime, scale and control.",
    icon: Server,
    bullets: [
      "IT infrastructure management & enterprise network administration",
      "Windows Server installation, configuration & maintenance",
      "Network design, structured cabling & LAN/WAN deployment",
      "Virtualization & VMware lab deployment",
      "System backup, disaster recovery & data protection",
      "Network troubleshooting & performance optimization",
    ],
  },
  {
    slug: "support",
    title: "Systems & Support",
    short: "Multi-department IT support that keeps every team running.",
    icon: Wrench,
    bullets: [
      "IT systems support across multi-department environments",
      "Hardware procurement, installation & lifecycle management",
      "Preventive & corrective system maintenance",
      "IT policy development, documentation & compliance",
    ],
  },
  {
    slug: "ai",
    title: "AI Solutions & Digital Innovation",
    short:
      "Practical AI, automation and software that streamline operations and accelerate growth.",
    icon: Brain,
    bullets: [
      "AI strategy, consulting & readiness assessment",
      "Business & workflow automation",
      "AI chatbots and intelligent assistants",
      "Custom software, SaaS, web & mobile development",
      "UI/UX, branding & digital design",
      "AI commercial video production & digital transformation",
    ],
  },
  {
    slug: "solar",
    title: "Solar Systems Installation",
    short: "Reliable, sustainable, cost-effective solar power for homes and business.",
    icon: Sun,
    bullets: [
      "Residential & commercial solar installations",
      "Inverter & battery backup solutions",
      "Hybrid & off-grid solar systems",
      "System maintenance & performance support",
    ],
  },
  {
    slug: "cctv",
    title: "CCTV & Security Systems",
    short: "Smart security. Complete protection. 24/7 visibility and peace of mind.",
    icon: Camera,
    bullets: [
      "High-definition CCTV cameras (dome, PTZ, IP, bullet)",
      "Digital video recording (DVR/NVR) & storage",
      "Remote viewing anytime, anywhere",
      "Access control & intrusion detection",
      "Professional installation & maintenance",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare IT Solutions",
    short: "Connecting care. Powering health. Secure IT for modern facilities.",
    icon: HeartPulse,
    bullets: [
      "Electronic Medical Records (EMR) deployment & support",
      "Hospital networking & clinical infrastructure",
      "Data security & compliance",
      "Healthcare-grade servers, storage & virtualization",
      "24/7 IT support & maintenance",
    ],
  },
];

export const aiCategories: ServiceCategory[] = [
  {
    title: "Artificial Intelligence",
    items: ["Artificial Intelligence", "AI Strategy & Consulting", "AI Readiness Assessment"],
  },
  {
    title: "AI Solutions & Automation",
    items: [
      "AI Solutions",
      "Business Automation",
      "Workflow Automation",
      "AI Chatbots",
      "AI Assistants",
    ],
  },
  {
    title: "Software & Digital Products",
    items: [
      "Custom Software Development",
      "SaaS Development",
      "Website Development",
      "Mobile Application Development",
    ],
  },
  {
    title: "Design & Digital Experience",
    items: ["UI/UX Design", "Branding & Digital Design"],
  },
  {
    title: "AI Media & Business Transformation",
    items: ["AI Commercial Video Production", "Digital Transformation"],
  },
];

export const capabilities = [
  { icon: Network, label: "Networks" },
  { icon: Cpu, label: "Hardware" },
  { icon: Database, label: "Data" },
  { icon: Shield, label: "Security" },
  { icon: Sun, label: "Solar" },
  { icon: Lock, label: "Compliance" },
  { icon: Monitor, label: "Support" },
  { icon: Sparkles, label: "AI & Automation" },
];
