export const profile = {
  name: "Pamela Basnillo",
  role: "Creative marketing & virtual support strategist",
  line: "I don’t just make things look good — I make them work.",
  email: "basnillo.pamela@gmail.com",
  phone: "+63 933 850 5382",
  phoneHref: "+639338505382",
  location: "Davao City, Philippines",
};

export const disciplines = [
  { label: "Social media", tone: "blossom", doodle: "sparkle", rotate: -4 },
  { label: "Graphic design", tone: "sage", doodle: "flower", rotate: 3 },
  { label: "Systems & SOPs", tone: "sky", doodle: "circle", rotate: -2 },
  { label: "Virtual support", tone: "blossom", doodle: "heart", rotate: 5 },
] as const;

export const about = {
  lead: "I help brands grow through strategic content, streamlined systems, and design that carries its own weight.",
  body: [
    "My background runs across social media marketing, graphic design, client coordination, and virtual support — which means I sit in the gap between the creative side and the operations side, and I’m comfortable on both.",
    "Most of the brands I work with have good ideas and no structure around them. I turn those ideas into something you can actually run: a content plan with a calendar behind it, a workflow someone else can pick up, a set of assets that look like they belong together.",
  ],
  practice: [
    "Scroll-stopping content built on a strategy, not a trend",
    "Workflows and SOPs a new hire could follow on day one",
    "Digital platforms and backend systems, managed and tidy",
    "AI used where it saves real time — ideas, research, first drafts",
  ],
  motto: ["Create strategically.", "Automate intelligently.", "Execute efficiently."],
};

export const services = [
  {
    title: "Social media management",
    icon: "/icon/social.webp",
    items: ["Strategy & content planning", "Content scheduling", "Caption writing", "Performance reporting"],
  },
  {
    title: "Graphic design",
    icon: "/icon/design.webp",
    items: ["Social media graphics", "Carousel posts", "Brand assets", "Presentation decks"],
  },
  {
    title: "Marketing support",
    icon: "/icon/marketing.webp",
    items: ["Email marketing", "Content marketing", "Basic SEO", "Campaign support"],
  },
  {
    title: "Systems & operations",
    icon: "/icon/systems.webp",
    items: ["Airtable, ClickUp & Notion", "SOP creation", "Workflow organisation", "Project coordination"],
  },
  {
    title: "Virtual assistance",
    icon: "/icon/assistance.webp",
    items: ["Email & calendar management", "Data entry & research", "CRM & database updates", "Administrative support"],
  },
  {
    title: "AI & content support",
    icon: "/icon/ai.webp",
    items: ["AI-assisted content creation", "Content repurposing", "Research assistance", "Productivity optimisation"],
  },
];

export const toolGroups = [
  {
    label: "Design & video",
    tools: [
      { name: "Canva", src: "/tool/canva.webp", h: 26, w: 26 },
      { name: "Figma", src: "/tool/figma.webp", h: 21, w: 73 },
      { name: "Adobe Illustrator", src: "/tool/illustrator.webp", h: 26, w: 27 },
      { name: "Adobe Photoshop", src: "/tool/photoshop.webp", h: 26, w: 27 },
      { name: "Adobe Lightroom", src: "/tool/lightroom.webp", h: 26, w: 27 },
      { name: "CapCut", src: "/tool/capcut.webp", h: 19, w: 94 },
      { name: "Descript", src: "/tool/descript.webp", h: 26, w: 26 },
    ],
  },
  {
    label: "AI",
    tools: [
      { name: "Claude", src: "/tool/claude.webp", h: 20, w: 93 },
      { name: "ChatGPT", src: "/tool/chatgpt.webp", h: 21, w: 72 },
      { name: "Gemini", src: "/tool/gemini.webp", h: 20, w: 85 },
      { name: "Jasper", src: "/tool/jasper.webp", h: 20, w: 82 },
      { name: "Midjourney", src: "/tool/midjourney.webp", h: 25, w: 30 },
    ],
  },
  {
    label: "Sites & publishing",
    tools: [
      { name: "WordPress", src: "/tool/wordpress.webp", h: 26, w: 26 },
      { name: "Wix", src: "/tool/wix.webp", h: 22, w: 56 },
      { name: "Framer", src: "/tool/framer.webp", h: 21, w: 64 },
      { name: "Notion", src: "/tool/notion.webp", h: 21, w: 60 },
    ],
  },
  {
    label: "Operations & scheduling",
    tools: [
      { name: "Airtable", src: "/tool/airtable.webp", h: 24, w: 40 },
      { name: "ClickUp", src: "/tool/clickup.webp", h: 20, w: 79 },
      { name: "Asana", src: "/tool/asana.webp", h: 24, w: 36 },
      { name: "Slack", src: "/tool/slack.webp", h: 26, w: 26 },
      { name: "Metricool", src: "/tool/metricool.webp", h: 19, w: 109 },
      { name: "HeyOrca", src: "/tool/heyorca.webp", h: 20, w: 94 },
      { name: "HighLevel", src: "/tool/highlevel.webp", h: 20, w: 85 },
    ],
  },
];

export type WorkImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /**
   * Optional silent MP4. When present the reel carousel loops it and uses
   * `src` as the poster; otherwise the poster shows alone.
   */
  video?: string;
};

export type Collection = {
  id: string;
  title: string;
  meta: string;
  blurb: string;
  field: "blossom" | "sage" | "sky";
  layout: "square" | "wide" | "portrait" | "reel" | "board";
  images: WorkImage[];
};

const bakeryAlts = [
  "Father’s Day post: a father lifting a laughing child, set against a deep red panel",
  "Birthday post: a slice of chocolate cake with raspberries, captioned Eat Cake",
  "Order-now post for a sharing quiche, shot from overhead on a wooden board",
  "Bao bun promo cut from torn paper, framed as a quick and easy meal",
  "Moody coffee post: steam rising from a cup, captioned Life happens, coffee helps",
  "Rice paper rolls order post on a deep red background",
  "Fruit tart post with a hand-drawn pastry pattern behind it",
  "Five-star customer review laid out with oversized quote marks",
  "Anatomy of a croissant: a cut croissant annotated with hand-drawn callouts",
];

const arkAlts = [
  "Team announcement post: agents on a lilac stage set, agency name in cut-out type",
  "Second team announcement in the same lilac cut-out series",
  "Third team announcement in the same lilac cut-out series",
  "Top Producers, June 2026 — three advisers on a soft gradient",
  "MDRT 2026 qualifier feature with Japan travel motifs",
  "Top Producers, July 2025 — two advisers on a violet gradient",
  "Will & legacy planning seminar invite with speakers, agenda and venue",
  "Chile qualifiers congratulations post with plane and globe illustrations",
  "Funky Loud Awards Night 2026 invite in acid green and magenta",
];

const adAlts = [
  "Eye drop ad on a cloud backdrop, captioned Enhance your vision naturally",
  "Blood sugar supplement ad: a woman drinking a glass of water, captioned Lower your blood sugar in every sip",
  "Sleep supplement ad on a cloud backdrop, captioned Promotes relaxation and sleep",
  "Barley coffee ad captioned Bitterness got you brewing?, mug beside the sachet pack",
  "Eye serum ad: a model applying serum, captioned Tanggal wrinkles and looking younger",
  "Eye drop ad: three bottles above a cloud horizon, captioned Newer and improved Opticare eye drops",
  "Sunblock ad: a model in yellow holding the jar, captioned Chok-Chok Skin Goals",
  "Cooking oil ad in yellow and black sale type, captioned ₱18 per meal, less oil more laman",
  "Effervescent supplement ad with a four-point absorption breakdown",
  "Bridal sunblock ad: a bride in a veil, captioned A bride’s essential for perfect wedding day skin",
  "Sunscreen ad for athletes: a runner mid-stride on a blue field, captioned Sunarmor",
  "Men’s serum ad: a model in a black suit, captioned Boost your confidence",
];

const reelAlts = [
  "Samgyupsal reel: raw beef and greens on a tabletop grill, unlimited sides callout",
  "Restaurant grand opening reel with the date and address set over the venue signage",
  "Workday reel: a woman working at a tablet in soft daylight",
  "Hair extensions reel captioned Transform your look instantly",
  "Property walkthrough reel: split frames of a renovated kitchen and living room",
];

export const collections: Collection[] = [
  {
    id: "bakery",
    title: "Bakery brand refresh",
    meta: "Social media design · Visual identity",
    blurb:
      "A well-loved bakery changed direction and their Instagram hadn’t caught up. I rebuilt the feed around one palette, one type system and one voice, so a croissant explainer and a customer review read as the same shop.",
    field: "blossom",
    layout: "wide",
    images: bakeryAlts.map((alt, i) => ({
      src: `/work/bakery-0${i + 1}.webp`,
      alt,
      w: 800,
      h: 667,
    })),
  },
  {
    id: "infinity-ark",
    title: "Infinity Ark, Singapore",
    meta: "Social media design · Ongoing client",
    blurb:
      "Recognition posts, seminar invites and event announcements for a Singapore financial advisory team. High volume, fast turnaround, and a house style that holds across every one of them.",
    field: "sky",
    layout: "portrait",
    images: arkAlts.map((alt, i) => ({
      src: `/work/ark-0${i + 1}.webp`,
      alt,
      w: i < 7 ? 279 : 640,
      h: i < 7 ? 372 : 800,
    })),
  },
  {
    id: "post-ads",
    title: "Post ads",
    meta: "Wellness · Beauty · Food · Retail",
    blurb:
      "Ad creative for brands across wellness, beauty, coaching, real estate, food and retail. Every one has a single job: make the offer legible in the half-second before a thumb moves.",
    field: "sage",
    layout: "square",
    images: adAlts.map((alt, i) => ({
      src: `/work/ad-${String(i + 1).padStart(2, "0")}.webp`,
      alt,
      w: 800,
      h: 800,
    })),
  },
  {
    id: "reels",
    title: "Short-form video",
    meta: "Reels · TikTok · Stories",
    blurb:
      "Vertical edits for property tours, restaurant launches and beauty services — cut for sound off, captioned, and paced to hold past the first two seconds.",
    field: "blossom",
    layout: "reel",
    // Each poster was matched to its clip by comparing frames rather than
    // trusting the order they came down in.
    images: reelAlts.map((alt, i) => ({
      src: `/work/reel-0${i + 1}.webp`,
      video: `/work/reel-0${i + 1}.mp4`,
      alt,
      w: 406,
      h: 720,
    })),
  },
  {
    id: "brand-identity",
    title: "Brand identity",
    meta: "Logo · Palette · Type · Mood",
    blurb:
      "A full identity board for Be A Blessing: mark, colour palette, typeface and mood board, delivered as one document a client can hand to anyone.",
    field: "sage",
    layout: "board",
    images: [
      {
        src: "/work/brand-board.webp",
        alt: "Be A Blessing identity board: a dove-and-olive-branch mark, an olive and sage colour palette, the Kiona typeface specimen and a mood board of greens and neutrals",
        w: 1000,
        h: 1414,
      },
    ],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];
