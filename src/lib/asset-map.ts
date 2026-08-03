/** Shared image-key → asset resolution used by data-driven routes. */
import infra from "@/assets/service-infra.jpg";
import cctv from "@/assets/service-cctv.jpg";
import healthcare from "@/assets/service-healthcare.jpg";
import solar from "@/assets/service-solar.jpg";
import ai from "@/assets/service-ai.jpg";
import webdev from "@/assets/project-webdev.jpg";
import school from "@/assets/project-school-wifi.jpg";
import retail from "@/assets/project-retail-it.jpg";

export const imageMap: Record<string, string> = {
  infra,
  cctv,
  healthcare,
  solar,
  ai,
  webdev,
  school,
  retail,
};

export const resolveImage = (key: string) => imageMap[key] ?? infra;
