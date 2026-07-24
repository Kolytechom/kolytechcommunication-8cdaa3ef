import {
  Server,
  Network,
  Shield,
  Sun,
  Camera,
  HeartPulse,
  Cloud,
  Wrench,
  Cpu,
  Database,
  Lock,
  Monitor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  bullets: string[];
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
  {
    slug: "cloud",
    title: "Cloud & Specialized Solutions",
    short: "Cloud computing, Azure resource management and technical leadership.",
    icon: Cloud,
    bullets: [
      "Cloud computing with Microsoft Azure resource management",
      "IT policy development & technical leadership",
      "Custom deployment for regulated industries",
      "Digital transformation advisory",
    ],
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
  { icon: Cloud, label: "Cloud" },
];
