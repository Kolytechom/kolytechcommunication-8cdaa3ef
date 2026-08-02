/**
 * Case study framework — Challenge · Solution · Outcome.
 * Reusable template: add an entry and the index, detail route and sitemap update.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  location: string;
  /** Image key resolved to an asset import inside the route. */
  image: "infra" | "cctv" | "healthcare" | "solar" | "school" | "retail" | "webdev" | "ai";
  imageAlt: string;
  summary: string;
  services: string[];
  duration: string;
  challenge: string[];
  solution: { title: string; body: string }[];
  outcome: { metric: string; label: string }[];
  outcomeNarrative: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-floor-corporate-lan",
    title: "Rebuilding a multi-floor corporate network without closing the office",
    client: "Corporate headquarters",
    sector: "Enterprise",
    location: "Lagos, Nigeria",
    image: "infra",
    imageAlt: "Structured cabling and managed switching in a Lagos corporate server room",
    summary:
      "A growing head office had outgrown an ad-hoc network built by three different vendors. We replaced it floor by floor while staff kept working.",
    services: ["Structured cabling", "Managed switching", "Server room build", "Documentation"],
    duration: "9 weeks",
    challenge: [
      "Daily complaints of dropped connections and slow file access, with no documentation to trace faults against.",
      "Three generations of cabling shared the same trays, and the comms room had no cooling, labelling or protected power.",
      "The business could not tolerate a shutdown, so every change had to happen around live operations.",
    ],
    solution: [
      {
        title: "Survey and reference design",
        body: "We audited every run, certified what could be retained and produced a single reference design for the whole building before touching a cable.",
      },
      {
        title: "Floor-by-floor migration",
        body: "Each floor was re-cabled and cut over out of hours, with a rollback path in place until the new pathway was certified.",
      },
      {
        title: "Comms room rebuild",
        body: "New racks, ventilation, UPS-protected distribution, labelled patching and a documented rack elevation per floor.",
      },
    ],
    outcome: [
      { metric: "0", label: "working hours of downtime" },
      { metric: "9 wks", label: "end-to-end delivery" },
      { metric: "100%", label: "runs certified and labelled" },
    ],
    outcomeNarrative: [
      "Connection complaints stopped within the first two floors, and the support burden dropped sharply once every port was traceable.",
      "The as-built pack now allows the internal team to resolve most physical faults themselves, and new floors are added against a design that already exists.",
    ],
  },
  {
    slug: "hospital-emr-and-network",
    title: "EMR and clinical network rollout for a private hospital group",
    client: "Private hospital group",
    sector: "Healthcare",
    location: "Lagos, Nigeria",
    image: "healthcare",
    imageAlt: "Nigerian clinicians working with electronic medical records in a hospital",
    summary:
      "Three sites moved from paper records to a shared EMR platform, department by department, with no interruption to patient care.",
    services: ["Clinical networking", "EMR deployment", "Backup & DR", "24/7 support"],
    duration: "16 weeks",
    challenge: [
      "Patient records were paper-based and duplicated across three sites, making transfers slow and error-prone.",
      "The existing network could not carry imaging traffic, and the server room had no protected power.",
      "Clinical staff were understandably wary of a system that could interrupt care.",
    ],
    solution: [
      {
        title: "Foundation before software",
        body: "Redundant links between sites, UPS-protected switching, healthcare-grade servers and a tested restore procedure went in first.",
      },
      {
        title: "Phased clinical rollout",
        body: "Records and outpatient first, then pharmacy, laboratory and billing, and finally wards and emergency — with paper running in parallel throughout each phase.",
      },
      {
        title: "Champions and on-site support",
        body: "Department champions were trained deeply, and an engineer stayed on site through the first weeks of every phase.",
      },
    ],
    outcome: [
      { metric: "3", label: "sites on one records platform" },
      { metric: "0", label: "care-affecting incidents" },
      { metric: "24/7", label: "monitored clinical systems" },
    ],
    outcomeNarrative: [
      "Patient transfers between sites now rely on a single record rather than physical files, and registration queues shortened noticeably within the first month.",
      "Backup restores are tested quarterly, and the group has documented evidence of its data protection controls.",
    ],
  },
  {
    slug: "multi-branch-surveillance",
    title: "Unified surveillance across three retail branches",
    client: "Retail group",
    sector: "Retail",
    location: "Lagos & Ibadan, Nigeria",
    image: "cctv",
    imageAlt: "IP CCTV camera installation covering a Nigerian retail branch",
    summary:
      "Three branches with incompatible recorders were consolidated into one IP surveillance estate with central monitoring and 30-day retention.",
    services: ["IP CCTV", "NVR & storage", "Remote monitoring", "Maintenance contract"],
    duration: "6 weeks",
    challenge: [
      "Each branch had a different recorder, and footage was regularly unavailable when it was actually needed.",
      "Retention was inconsistent, with some sites overwriting within four days.",
      "Head office had no way to view any branch remotely.",
    ],
    solution: [
      {
        title: "Coverage objectives per camera",
        body: "Every position was specified against a written objective — identification at entrances and tills, observation across the floor.",
      },
      {
        title: "Standardised recording estate",
        body: "One camera and NVR standard across all branches, sized honestly for a 30-day retention policy.",
      },
      {
        title: "Segmented network and remote access",
        body: "Cameras on a dedicated VLAN with secure, authenticated remote viewing for head office rather than exposed ports.",
      },
    ],
    outcome: [
      { metric: "30 days", label: "guaranteed retention" },
      { metric: "3", label: "branches on one standard" },
      { metric: "Central", label: "remote monitoring" },
    ],
    outcomeNarrative: [
      "Loss investigations that previously stalled for lack of footage are now resolved from head office the same day.",
      "A quarterly maintenance visit keeps lenses, storage and firmware in a known-good state across all sites.",
    ],
  },
  {
    slug: "hybrid-solar-office-hq",
    title: "Hybrid solar cutting diesel dependence at an office headquarters",
    client: "Professional services firm",
    sector: "Corporate",
    location: "Lagos, Nigeria",
    image: "solar",
    imageAlt: "Technician installing rooftop solar panels on a Nigerian commercial building",
    summary:
      "A 20kVA hybrid inverter with lithium storage, sized from a measured load profile, replaced most of a daily generator run.",
    services: ["Load audit", "Hybrid inverter", "Lithium storage", "Monitoring"],
    duration: "4 weeks",
    challenge: [
      "The office ran a generator for most of the working day, with fuel and servicing dominating the facilities budget.",
      "Grid switchovers were interrupting servers and damaging equipment.",
      "A previous quote had been sized from equipment labels and was uneconomic as a result.",
    ],
    solution: [
      {
        title: "Measured load profile",
        body: "We logged real consumption across a full working week, which showed demand concentrated firmly in daylight hours.",
      },
      {
        title: "Hybrid design",
        body: "Solar-first with lithium storage for essential circuits, grid as secondary and generator retained purely as a last resort.",
      },
      {
        title: "Protected critical circuits",
        body: "Servers, security and comms moved onto conditioned, uninterrupted supply with remote performance monitoring.",
      },
    ],
    outcome: [
      { metric: "20kVA", label: "hybrid capacity installed" },
      { metric: ">50%", label: "reduction in diesel usage" },
      { metric: "0", label: "switchover interruptions" },
    ],
    outcomeNarrative: [
      "Generator hours dropped to occasional evening use, and the facilities team now reviews performance remotely rather than by fuel receipts.",
      "Equipment failures attributed to switchover surges stopped entirely after the critical circuits were conditioned.",
    ],
  },
  {
    slug: "campus-wifi-deployment",
    title: "Campus-wide Wi-Fi for an academic institution with 800+ users",
    client: "Academic institution",
    sector: "Education",
    location: "Nigeria",
    image: "school",
    imageAlt: "Engineer installing a wireless access point in a Nigerian school corridor",
    summary:
      "A fibre backbone and managed mesh Wi-Fi replaced isolated routers across teaching blocks, halls and administration.",
    services: ["Fibre backbone", "Managed Wi-Fi", "Content filtering", "Structured cabling"],
    duration: "7 weeks",
    challenge: [
      "Each block ran its own consumer router, leaving dead zones between buildings and no central control.",
      "Administrative traffic shared the same network as student devices.",
      "The institution needed filtering and usage controls it could manage internally.",
    ],
    solution: [
      {
        title: "Backbone first",
        body: "Fibre between buildings with a central core, so wireless coverage was built on a network that could carry it.",
      },
      {
        title: "Managed mesh coverage",
        body: "Access points positioned from a coverage survey, with seamless roaming across corridors and halls.",
      },
      {
        title: "Segmentation and filtering",
        body: "Separate networks for administration, faculty and students, with content filtering and per-segment policy.",
      },
    ],
    outcome: [
      { metric: "800+", label: "concurrent users supported" },
      { metric: "Full", label: "campus roaming coverage" },
      { metric: "3", label: "segmented user networks" },
    ],
    outcomeNarrative: [
      "Teaching now relies on campus connectivity rather than personal data bundles, and administration runs on a network students cannot reach.",
      "The internal IT team manages policy from a single controller instead of visiting individual routers.",
    ],
  },
  {
    slug: "smb-website-and-automation",
    title: "A business website and workflow automation for a growing SME",
    client: "Services SME",
    sector: "Small business",
    location: "Lagos, Nigeria",
    image: "webdev",
    imageAlt: "Nigerian software developers building a business website in a Lagos office",
    summary:
      "A responsive marketing site with a CMS, contact automation and SEO foundations replaced a static page and a shared inbox.",
    services: ["Web development", "CMS", "Workflow automation", "SEO foundations"],
    duration: "5 weeks",
    challenge: [
      "Enquiries arrived in a shared inbox and were regularly missed or answered twice.",
      "The existing page could not be updated without a developer.",
      "The business was invisible in search for the services it actually sold.",
    ],
    solution: [
      {
        title: "Editable, responsive site",
        body: "A fast marketing site with a CMS the team can update themselves, built mobile-first for the traffic they actually receive.",
      },
      {
        title: "Enquiry automation",
        body: "Form submissions routed, acknowledged and tracked automatically, with ownership assigned on arrival.",
      },
      {
        title: "SEO foundations",
        body: "Structured metadata, service pages targeted at real search terms, and a sitemap submitted for indexing.",
      },
    ],
    outcome: [
      { metric: "100%", label: "enquiries acknowledged" },
      { metric: "5 wks", label: "concept to launch" },
      { metric: "Self-serve", label: "content updates" },
    ],
    outcomeNarrative: [
      "Nothing sits unanswered in a shared inbox, and every enquiry has a named owner from the moment it arrives.",
      "The team publishes their own updates, and the service pages now rank for the terms their customers search.",
    ],
  },
];

export const findCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
