/**
 * Knowledge Centre content model.
 * Reusable: add a category to `knowledgeCategories`, then add articles that
 * reference its id. Routes, sitemap, search and JSON-LD pick them up automatically.
 */

export type KnowledgeCategory = {
  id: string;
  title: string;
  description: string;
};

export type ArticleSection = {
  heading: string;
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  points?: string[];
};

export type KnowledgeArticle = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readMinutes: number;
  updated: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  /** Related service slugs from services-data. */
  relatedServices: string[];
};

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: "infrastructure",
    title: "IT Infrastructure",
    description: "Networks, servers, cabling and the foundations everything else depends on.",
  },
  {
    id: "security",
    title: "Security & Surveillance",
    description: "CCTV, access control and the practical side of protecting premises and data.",
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Where artificial intelligence and workflow automation actually pay for themselves.",
  },
  {
    id: "power",
    title: "Power & Solar",
    description: "Designing dependable power for Nigerian operating conditions.",
  },
  {
    id: "healthcare",
    title: "Healthcare IT",
    description: "EMR, clinical networks and uptime in patient-critical environments.",
  },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "structured-cabling-standards-nigeria",
    category: "infrastructure",
    title: "Structured cabling standards that survive Nigerian office conditions",
    summary:
      "Heat, dust, power instability and rushed fit-outs quietly destroy network performance. Here is the cabling discipline we hold every deployment to.",
    readMinutes: 7,
    updated: "2026",
    keyTakeaways: [
      "Cabling faults, not switches, cause most 'slow network' complaints",
      "Cat6A future-proofs a building far more cheaply than a re-pull later",
      "Labelling and as-built documentation are what make support fast",
    ],
    sections: [
      {
        heading: "Why cabling is the real bottleneck",
        body: [
          "When a business reports a slow network, the instinct is to blame bandwidth or the switch. In practice, most degradation we find on site traces back to the passive layer — untested runs, over-bent cable, unshielded runs alongside power, or patch panels terminated in a hurry during a building fit-out.",
          "Passive infrastructure is also the hardest thing to change later. Switches can be swapped in an afternoon. Re-pulling cable through an occupied office costs weeks and disruption, which is why we treat the cabling design as the most important decision in the whole project.",
        ],
        points: [
          "Certify every run with a cable tester and keep the results",
          "Separate data and power pathways with proper containment",
          "Respect bend radius and pull tension — damage is invisible until load arrives",
        ],
      },
      {
        heading: "Choosing a cable category",
        body: [
          "For most Nigerian corporate offices, Cat6 is the practical minimum and Cat6A is the sensible default for new buildings. The incremental material cost is small compared to the labour of installing it, and it protects the building against the next decade of access point and camera bandwidth growth.",
          "Fibre belongs in the backbone — between floors, between buildings and to the server room. Copper handles the horizontal runs to the desk.",
        ],
      },
      {
        heading: "Environmental realities",
        body: [
          "Ceiling voids in Lagos buildings run hot, and heat degrades copper performance. Generator switchovers introduce electrical noise. Dust in unsealed comms rooms clogs switch fans and shortens hardware life.",
          "We specify sealed, ventilated and, where budget allows, cooled comms rooms, with UPS protection sized for a clean generator handover rather than just a few minutes of runtime.",
        ],
      },
      {
        heading: "Documentation and handover",
        body: [
          "Every port gets a label, every label appears on a rack elevation, and every rack elevation ships with the as-built pack at handover. This is the difference between a fault resolved in twenty minutes and one that takes a day of tracing.",
        ],
      },
    ],
    relatedServices: ["infrastructure", "support"],
  },
  {
    slug: "cctv-system-design-checklist",
    category: "security",
    title: "A practical CCTV design checklist before you buy a single camera",
    summary:
      "Camera count is the last decision, not the first. Work through coverage objectives, storage maths and network load, then specify hardware.",
    readMinutes: 6,
    updated: "2026",
    keyTakeaways: [
      "Define what each camera must prove before choosing a lens",
      "Storage is driven by retention policy, not camera count alone",
      "Cameras belong on their own VLAN, not the office network",
    ],
    sections: [
      {
        heading: "Start with evidentiary objectives",
        body: [
          "Every camera position should answer a written question: identify a face at the entrance, read a plate at the gate, or simply observe movement in a corridor. Identification, recognition and observation each demand very different pixel density on target, and that determines lens and placement long before brand.",
        ],
        points: [
          "Identification at entry points and cash handling areas",
          "Recognition across corridors, receptions and stores",
          "Observation across car parks and perimeters",
        ],
      },
      {
        heading: "Do the storage maths honestly",
        body: [
          "Retention requirements — often 30 days for corporate environments — combined with resolution, frame rate and compression determine recorder sizing. Under-sizing storage is the single most common flaw we inherit from previous installers, and it silently destroys the value of the system exactly when footage is needed.",
        ],
      },
      {
        heading: "Treat the camera network as infrastructure",
        body: [
          "IP cameras are computers. They belong on a dedicated VLAN with PoE budgeting calculated per switch, uninterrupted power on the recorder and switches, and remote access published securely rather than through an open port on the router.",
        ],
      },
      {
        heading: "Plan for maintenance from day one",
        body: [
          "Lenses attract dust, housings attract insects and hard drives wear out. A quarterly clean, firmware review and recorder health check keeps a system evidentiary rather than decorative.",
        ],
      },
    ],
    relatedServices: ["cctv", "infrastructure"],
  },
  {
    slug: "where-ai-pays-for-itself",
    category: "ai",
    title: "Where AI actually pays for itself in a Nigerian business",
    summary:
      "Ignore the hype cycle. These are the automation patterns that reliably return value for mid-sized organisations within a single quarter.",
    readMinutes: 8,
    updated: "2026",
    keyTakeaways: [
      "Start with high-volume, low-judgement work",
      "Clean data is the prerequisite, not the project",
      "Measure the hours removed, not the model used",
    ],
    sections: [
      {
        heading: "The qualifying test",
        body: [
          "A task is a good automation candidate when it is high volume, rule-bound, repeated across staff, and currently costing measurable hours. Customer enquiry triage, invoice and document extraction, appointment scheduling, stock reconciliation and first-line internal IT questions all qualify.",
          "Strategic judgement, relationship work and anything with legal exposure does not — at least not without a person in the loop.",
        ],
      },
      {
        heading: "Data readiness comes first",
        body: [
          "Most stalled AI projects are actually stalled data projects. If your records live across spreadsheets, WhatsApp threads and paper files, the useful first phase is consolidation, not modelling. We usually deliver this as a short digitisation and integration engagement before any AI component is built.",
        ],
      },
      {
        heading: "Patterns that work",
        body: [
          "Three patterns produce reliable returns for organisations of this size.",
        ],
        points: [
          "Assisted response — drafting replies a human approves before sending",
          "Document intelligence — extracting structured data from invoices, forms and records",
          "Workflow orchestration — routing, reminders and status updates across existing systems",
        ],
      },
      {
        heading: "Measuring the return",
        body: [
          "Agree the baseline before you build: hours spent, error rate, turnaround time. Report against those same numbers after eight weeks. If the figures have not moved, the automation was pointed at the wrong task, and that is a cheap lesson if the scope was kept small.",
        ],
      },
    ],
    relatedServices: ["ai", "support"],
  },
  {
    slug: "sizing-hybrid-solar-for-business",
    category: "power",
    title: "How to size a hybrid solar system for a Nigerian business",
    summary:
      "A load audit, an honest autonomy target and realistic irradiance assumptions produce a system that works. Guesswork produces an expensive disappointment.",
    readMinutes: 7,
    updated: "2026",
    keyTakeaways: [
      "Size from a measured load profile, never from nameplate ratings",
      "Battery autonomy is a business decision, not a technical one",
      "Hybrid designs beat off-grid for most commercial sites",
    ],
    sections: [
      {
        heading: "Measure before you specify",
        body: [
          "We log actual consumption over several days rather than adding up equipment labels. Nameplate ratings routinely overstate real draw by a wide margin, and oversizing on that basis is the fastest way to make solar look uneconomic.",
          "The load profile also reveals shape — a business that consumes almost everything between 9am and 5pm is far better suited to solar than one whose demand peaks overnight.",
        ],
      },
      {
        heading: "Decide how much autonomy you are buying",
        body: [
          "Batteries are the most expensive part of the system, so the honest question is which loads must survive an outage and for how long. Critical circuits — servers, security, refrigeration, clinical equipment — justify long autonomy. General lighting and comfort cooling usually do not.",
        ],
        points: [
          "Essential circuits: 8–12 hours of autonomy",
          "General office loads: solar-first with grid or generator fallback",
          "Heavy plant: usually stays on grid or generator",
        ],
      },
      {
        heading: "Why hybrid, not off-grid",
        body: [
          "For commercial sites a hybrid inverter that blends solar, battery, grid and generator gives the best economics. You capture solar whenever it is available, hold battery capacity for outages, and keep the generator as a rarely-used last resort rather than a daily expense.",
        ],
      },
      {
        heading: "Maintenance and monitoring",
        body: [
          "Panels in Lagos lose meaningful output to dust within weeks. Scheduled cleaning, connection checks and remote performance monitoring keep the payback model intact over the life of the installation.",
        ],
      },
    ],
    relatedServices: ["solar", "infrastructure"],
  },
  {
    slug: "emr-rollout-without-disrupting-care",
    category: "healthcare",
    title: "Rolling out EMR without disrupting patient care",
    summary:
      "Clinical deployments fail on change management far more often than on technology. This is the sequence we use in Nigerian hospitals.",
    readMinutes: 8,
    updated: "2026",
    keyTakeaways: [
      "Network and power resilience precede the EMR itself",
      "Run parallel records during transition, never a hard cutover",
      "Department-led champions outperform top-down mandates",
    ],
    sections: [
      {
        heading: "Fix the foundation first",
        body: [
          "An EMR is only as available as the network and power beneath it. Before any clinical software goes live we confirm redundant connectivity, UPS-protected switching, backup power for the server room and a tested restore procedure — not just a backup job that reports success.",
        ],
      },
      {
        heading: "Sequence by department",
        body: [
          "We start with a department that has structured, lower-risk workflows — typically outpatient records or pharmacy — prove the process, then extend. Emergency and theatre come last, once staff confidence and support processes are established.",
        ],
        points: [
          "Phase 1: records, registration and outpatient",
          "Phase 2: pharmacy, laboratory and billing",
          "Phase 3: wards, theatre and emergency",
        ],
      },
      {
        heading: "Parallel running protects patients",
        body: [
          "For an agreed window, paper and digital records run side by side. It costs duplicated effort, and it is worth every hour, because it removes the possibility that a software problem becomes a clinical problem.",
        ],
      },
      {
        heading: "Training and support that sticks",
        body: [
          "We train department champions deeply rather than training everyone shallowly, keep an engineer on site through the first weeks of each phase, and publish short role-specific guides. Adoption follows confidence, and confidence follows visible support.",
        ],
      },
    ],
    relatedServices: ["healthcare", "infrastructure", "support"],
  },
  {
    slug: "it-continuity-planning-for-smes",
    category: "infrastructure",
    title: "IT continuity planning for growing Nigerian SMEs",
    summary:
      "You do not need an enterprise budget to survive a failure. You need a tested restore, documented dependencies and a decided order of recovery.",
    readMinutes: 6,
    updated: "2026",
    keyTakeaways: [
      "An untested backup is not a backup",
      "Write down what must come back first, and in what order",
      "Most SME outages are power or human error, not cyber attack",
    ],
    sections: [
      {
        heading: "Know what you cannot lose",
        body: [
          "Continuity planning starts with a short, honest inventory: which systems, records and accounts would stop the business if they disappeared this afternoon. For most SMEs the list is far shorter than expected — accounting data, customer records, email and one or two operational tools.",
        ],
      },
      {
        heading: "Three-two-one, then test it",
        body: [
          "Three copies of important data, on two different media, with one held off site. The rule is well known; the testing is what gets skipped. We schedule a quarterly restore drill and time it, because recovery speed is the number that actually matters during an incident.",
        ],
      },
      {
        heading: "Plan for the likely failures",
        body: [
          "Power events, failed drives, deleted files and departing staff with credentials cause far more downtime in practice than sophisticated attacks. Surge protection, UPS coverage, disciplined account offboarding and endpoint protection cover most of the real risk.",
        ],
        points: [
          "Documented recovery order with named owners",
          "Offboarding checklist tied to every account",
          "Quarterly restore drill with recorded timings",
        ],
      },
    ],
    relatedServices: ["infrastructure", "support"],
  },
];

export const articlesByCategory = (categoryId: string) =>
  knowledgeArticles.filter((a) => a.category === categoryId);

export const findArticle = (slug: string) =>
  knowledgeArticles.find((a) => a.slug === slug);

export const categoryTitle = (id: string) =>
  knowledgeCategories.find((c) => c.id === id)?.title ?? id;
