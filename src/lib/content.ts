import copy from "@/content/copy.json";

/**
 * The words live in `src/content/copy.json`; the structure lives here.
 *
 * That split is what lets the in-place editor write back — it rewrites JSON
 * and never regenerates TypeScript, so the `as const` assertions, the
 * discriminated unions and these comments all survive a save untouched.
 *
 * The rule for which side a value falls on: anything a reader sees as prose
 * goes in the JSON; anything the code *branches on* stays here. A layout
 * discriminator reading "board" is four characters of plain English and would
 * otherwise look exactly like editable copy to the editor's schema walk.
 */

export const profile = copy.profile;

/**
 * Not in the JSON, and not editable: `tone` and `doodle` key a class map and
 * an asset path. The labels are held back too — they collide with the service
 * titles ("Graphic design" is both), and the editor matches on text content.
 */
export const disciplines = [
  { label: "Social media", tone: "blossom", doodle: "sparkle", rotate: -4 },
  { label: "Graphic design", tone: "sage", doodle: "flower", rotate: 3 },
  { label: "Systems & SOPs", tone: "sky", doodle: "circle", rotate: -2 },
  { label: "Virtual support", tone: "blossom", doodle: "heart", rotate: 5 },
] as const;

/**
 * The `{ text }` row wrappers in copy.json are not decoration. The editor's
 * schema walk indexes array rows as objects — a bare string row exposes no
 * field to address, so a plain `string[]` would leave the whole list silently
 * uneditable. Unwrapped here, so every consumer still sees `string[]`.
 */
export const about = {
  lead: copy.about.lead,
  body: copy.about.body.map((row) => row.text),
  practice: copy.about.practice.map((row) => row.text),
  motto: copy.about.motto.map((row) => row.text),
};

export const services = copy.services.map((service) => ({
  title: service.title,
  icon: service.icon,
  items: service.items.map((row) => row.text),
}));

/**
 * Tool logos carry hand-tuned display sizes — `h`/`w` are rem sizing, not
 * intrinsic dimensions — so swapping one would break the row it sits in.
 * Structure, not copy. The group labels are never rendered: `Tools.tsx`
 * flattens this with `flatMap`, and the wall is one continuous scatter.
 */
export const toolGroups = [
  {
    label: "Design & video",
    tools: [
      { name: "Canva", src: "/tool/canva.webp", h: 29, w: 29 },
      { name: "Figma", src: "/tool/figma.webp", h: 23, w: 80 },
      { name: "Adobe Illustrator", src: "/tool/illustrator.webp", h: 28, w: 29 },
      { name: "Adobe Photoshop", src: "/tool/photoshop.webp", h: 28, w: 29 },
      { name: "Adobe Lightroom", src: "/tool/lightroom.webp", h: 28, w: 29 },
      { name: "CapCut", src: "/tool/capcut.webp", h: 21, w: 104 },
      { name: "Descript", src: "/tool/descript.webp", h: 29, w: 29 },
    ],
  },
  {
    label: "AI",
    tools: [
      { name: "Claude", src: "/tool/claude.webp", h: 22, w: 102 },
      { name: "ChatGPT", src: "/tool/chatgpt.webp", h: 23, w: 79 },
      { name: "Gemini", src: "/tool/gemini.webp", h: 22, w: 94 },
      { name: "Jasper", src: "/tool/jasper.webp", h: 22, w: 90 },
      { name: "Midjourney", src: "/tool/midjourney.webp", h: 28, w: 33 },
    ],
  },
  {
    label: "Sites & publishing",
    tools: [
      { name: "WordPress", src: "/tool/wordpress.webp", h: 29, w: 29 },
      { name: "Wix", src: "/tool/wix.webp", h: 24, w: 62 },
      { name: "Framer", src: "/tool/framer.webp", h: 23, w: 70 },
      { name: "Notion", src: "/tool/notion.webp", h: 24, w: 69 },
    ],
  },
  {
    label: "Operations & scheduling",
    tools: [
      { name: "Airtable", src: "/tool/airtable.webp", h: 26, w: 44 },
      { name: "ClickUp", src: "/tool/clickup.webp", h: 22, w: 87 },
      { name: "Asana", src: "/tool/asana.webp", h: 27, w: 41 },
      { name: "Slack", src: "/tool/slack.webp", h: 29, w: 29 },
      { name: "Metricool", src: "/tool/metricool.webp", h: 21, w: 121 },
      { name: "HeyOrca", src: "/tool/heyorca.webp", h: 22, w: 104 },
      { name: "HighLevel", src: "/tool/highlevel.webp", h: 22, w: 93 },
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

/**
 * The three values per collection that are not prose: `id` is a DOM id and a
 * React key, `field` keys a colour-band map, and `layout` keys three class
 * maps — "reel" swaps in a different component entirely. Positional, matched
 * to the order in copy.json.
 */
const collectionShape: Pick<Collection, "id" | "field" | "layout">[] = [
  { id: "bakery", field: "blossom", layout: "wide" },
  { id: "infinity-ark", field: "sky", layout: "portrait" },
  { id: "post-ads", field: "sage", layout: "square" },
  { id: "reels", field: "blossom", layout: "reel" },
  { id: "brand-identity", field: "sage", layout: "board" },
];

type CopyImage = { src: string; alt: string; w: number; h: number; video?: string };

export const collections: Collection[] = copy.collections.map((c, i) => ({
  ...collectionShape[i],
  title: c.title,
  meta: c.meta,
  blurb: c.blurb,
  images: (c.images as CopyImage[]).map((image) => ({
    src: image.src,
    alt: image.alt,
    w: image.w,
    h: image.h,
    ...(image.video ? { video: image.video } : {}),
  })),
}));

/**
 * Held back from the JSON on purpose: every label duplicates a section
 * heading, and this list renders twice over (desktop bar and mobile sheet).
 * `href` values are the anchors those sections answer to.
 */
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

/**
 * Section headings, intros and one-off lines that used to sit inline in the
 * components. They are copy, so they belong with the copy.
 */
export const sections = copy.sections;
