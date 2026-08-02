/**
 * Industry solution pages — one reusable template, driven by this data.
 * Add an entry here and the route, sitemap and search index pick it up.
 */

export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  accent: string;
  intro: string;
  /** Import key resolved in the route to an image asset. */
  image: "healthcare" | "infra" | "cctv" | "solar" | "ai" | "webdev" | "school" | "retail";
  imageAlt: string;
  challenges: { title: string; body: string }[];
  solutions: { title: string; body: string }[];
  outcomes: string[];
  /** Service slugs from services-data. */
  services: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    eyebrow: "Industry solutions",
    headline: "Technology for hospitals",
    accent: "that cannot go offline.",
    intro:
      "Hospitals, clinics and diagnostic centres depend on systems that stay available during every shift. We design clinical infrastructure, EMR platforms and backup power around patient care rather than around convenience.",
    image: "healthcare",
    imageAlt: "Nigerian healthcare professionals using clinical IT systems in a hospital",
    challenges: [
      {
        title: "Downtime has clinical consequences",
        body: "An outage in records, pharmacy or imaging does not just slow work — it delays treatment and creates risk.",
      },
      {
        title: "Records are sensitive and audited",
        body: "Patient data carries confidentiality obligations that most general-purpose IT setups were never designed to meet.",
      },
      {
        title: "Power instability",
        body: "Grid interruptions and generator switchovers damage equipment and corrupt data if the transition is not protected.",
      },
    ],
    solutions: [
      {
        title: "Clinical network and server infrastructure",
        body: "Redundant, UPS-protected networking and healthcare-grade servers sized for imaging, records and departmental load.",
      },
      {
        title: "EMR deployment and migration",
        body: "Phased department-by-department rollout with parallel records, staff champions and on-site support during transition.",
      },
      {
        title: "Backup power and surveillance",
        body: "Hybrid solar and battery for critical circuits, plus CCTV and access control across wards, pharmacy and entrances.",
      },
    ],
    outcomes: [
      "Continuous availability for patient-critical systems",
      "Protected records with tested restore procedures",
      "Faster patient throughput across departments",
      "Documented compliance and audit evidence",
    ],
    services: ["healthcare", "infrastructure", "solar", "cctv"],
  },
  {
    slug: "education",
    name: "Education",
    eyebrow: "Industry solutions",
    headline: "Campus technology built",
    accent: "for scale and safety.",
    intro:
      "Schools, colleges and universities need broad coverage on disciplined budgets. We build campus networks, safeguarding systems and digital learning platforms that serve every faculty from one shared foundation.",
    image: "school",
    imageAlt: "Network engineer installing campus Wi-Fi in a Nigerian school",
    challenges: [
      {
        title: "Coverage across scattered buildings",
        body: "Blocks, halls and administrative buildings rarely share a coherent network, leaving dead zones and duplicated cost.",
      },
      {
        title: "Safeguarding obligations",
        body: "Campuses need visible, reliable security coverage across gates, corridors and boarding facilities.",
      },
      {
        title: "Constrained budgets",
        body: "Capital is approved in cycles, so infrastructure has to be phased without being rebuilt each time.",
      },
    ],
    solutions: [
      {
        title: "Campus-wide network and Wi-Fi",
        body: "Fibre backbone between buildings with managed mesh Wi-Fi, content filtering and per-segment access control.",
      },
      {
        title: "Surveillance and access control",
        body: "Camera coverage at gates, corridors and hostels with central recording and remote viewing for administration.",
      },
      {
        title: "Digital learning platforms",
        body: "Portals, e-learning and administrative systems built to run on the same infrastructure without extra licensing sprawl.",
      },
    ],
    outcomes: [
      "Reliable connectivity for every faculty and hall",
      "Safer premises for students and staff",
      "Lower recurring running costs through shared infrastructure",
      "A phased roadmap that survives budget cycles",
    ],
    services: ["infrastructure", "cctv", "ai", "solar"],
  },
  {
    slug: "smes",
    name: "Small & Medium Businesses",
    eyebrow: "Industry solutions",
    headline: "Enterprise discipline,",
    accent: "SME economics.",
    intro:
      "Lean teams need quick, visible wins and predictable costs. We stage delivery so value lands early, without locking you into infrastructure you will outgrow in a year.",
    image: "retail",
    imageAlt: "IT technician supporting a Nigerian retail business point-of-sale system",
    challenges: [
      {
        title: "No internal IT function",
        body: "Problems land on whoever is nearest, and small faults become long outages.",
      },
      {
        title: "Cost sensitivity",
        body: "Every naira has to earn its place, so large upfront capital projects rarely get approved.",
      },
      {
        title: "Growth outpacing systems",
        body: "Setups that worked for five people quietly fail at twenty-five.",
      },
    ],
    solutions: [
      {
        title: "Right-sized office infrastructure",
        body: "Clean cabling, managed switching, business Wi-Fi and protected power — specified to scale rather than to be replaced.",
      },
      {
        title: "Managed support",
        body: "Remote and on-site support with defined response times, so there is always someone accountable.",
      },
      {
        title: "Automation and digital presence",
        body: "Business websites, workflow automation and AI assistants that remove repetitive admin from a small team.",
      },
    ],
    outcomes: [
      "Immediate day-to-day efficiency gains",
      "Costs staged across phases instead of one large outlay",
      "A platform that grows with the business",
      "A named support path instead of ad-hoc fixes",
    ],
    services: ["infrastructure", "support", "ai", "cctv"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    eyebrow: "Industry solutions",
    headline: "Governed infrastructure",
    accent: "across every site.",
    intro:
      "Multi-site enterprises need consistency, documentation and predictable escalation. We design estates that can be replicated, audited and supported the same way in every location.",
    image: "infra",
    imageAlt: "Enterprise server room and network infrastructure in Lagos",
    challenges: [
      {
        title: "Inconsistent estates",
        body: "Sites built by different vendors at different times cost more to support and are harder to secure.",
      },
      {
        title: "Audit and compliance pressure",
        body: "Controls need evidence, and evidence needs documentation produced during delivery, not afterwards.",
      },
      {
        title: "Business continuity expectations",
        body: "Leadership expects recovery times that only tested, designed resilience can deliver.",
      },
    ],
    solutions: [
      {
        title: "Standardised site blueprint",
        body: "One documented reference design for network, power and security, replicated across locations.",
      },
      {
        title: "Virtualisation, backup and DR",
        body: "Consolidated compute with tested backup, replication and a written recovery order per system.",
      },
      {
        title: "Automation and analytics",
        body: "Workflow automation and reporting layered on a stable estate, where it can actually be measured.",
      },
    ],
    outcomes: [
      "Consolidated, well-governed IT estate",
      "Predictable support and escalation paths",
      "Audit-ready documentation from day one",
      "Measurable productivity gains across teams",
    ],
    services: ["infrastructure", "support", "ai", "cctv"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    eyebrow: "Industry solutions",
    headline: "Reliability guests",
    accent: "actually notice.",
    intro:
      "In hotels, lounges and event venues the technology is part of the product. Power, Wi-Fi and security are judged by guests directly, so we design them to be invisible and dependable.",
    image: "solar",
    imageAlt: "Solar installation providing backup power for a Nigerian hospitality property",
    challenges: [
      {
        title: "Guest-visible failures",
        body: "A Wi-Fi complaint or a power interruption becomes a public review within minutes.",
      },
      {
        title: "High-density wireless demand",
        body: "Every guest arrives with several devices, and consumer-grade equipment collapses under that load.",
      },
      {
        title: "Property-wide security",
        body: "Entrances, corridors, car parks and back-of-house all need coverage without feeling intrusive.",
      },
    ],
    solutions: [
      {
        title: "High-density guest Wi-Fi",
        body: "Per-room and per-area access points with a branded captive portal and bandwidth management.",
      },
      {
        title: "Hybrid solar and backup power",
        body: "Silent, uninterrupted power for guest-facing circuits with generator as a last resort.",
      },
      {
        title: "Surveillance and booking systems",
        body: "Discreet CCTV coverage plus booking and payment platforms integrated with the property network.",
      },
    ],
    outcomes: [
      "Uninterrupted guest services",
      "Stronger property security",
      "Better online booking experience",
      "Lower generator and energy spend",
    ],
    services: ["solar", "infrastructure", "cctv", "ai"],
  },
  {
    slug: "religious-organisations",
    name: "Religious Organisations",
    eyebrow: "Industry solutions",
    headline: "Dependable systems",
    accent: "volunteers can run.",
    intro:
      "Congregational facilities need affordable, resilient technology that a volunteer team can operate confidently every week — for security, power, media and digital reach.",
    image: "cctv",
    imageAlt: "CCTV and security installation at a Nigerian community facility",
    challenges: [
      {
        title: "Large gatherings, limited staff",
        body: "Facilities fill and empty quickly, and the people operating the systems are usually volunteers.",
      },
      {
        title: "Power interruptions during services",
        body: "Outages in the middle of a gathering affect sound, media and safety lighting.",
      },
      {
        title: "Growing digital audience",
        body: "Congregations increasingly participate online, which demands reliable streaming and connectivity.",
      },
    ],
    solutions: [
      {
        title: "Perimeter and auditorium surveillance",
        body: "Camera coverage at gates, car parks and entrances with simple central monitoring.",
      },
      {
        title: "Backup power for services and media",
        body: "Hybrid solar and battery sized for sound, lighting and streaming loads during a service window.",
      },
      {
        title: "Streaming and digital presence",
        body: "Media network, streaming setup and a website or app that extends reach beyond the building.",
      },
    ],
    outcomes: [
      "Safer premises during gatherings",
      "Reliable power for services and media",
      "Wider reach through digital channels",
      "Systems volunteers can operate without an engineer present",
    ],
    services: ["cctv", "solar", "infrastructure", "ai"],
  },
];

export const findIndustry = (slug: string) => industries.find((i) => i.slug === slug);
