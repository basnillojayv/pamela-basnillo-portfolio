"use client";

import Image from "next/image";
import { useState } from "react";
import { collections, type Collection } from "@/lib/content";
import Lightbox from "./Lightbox";
import ReelCarousel from "./ReelCarousel";
import Reveal from "./Reveal";

const fieldClass = {
  blossom: "bg-blossom",
  sage: "bg-sage",
  sky: "bg-sky",
} as const;

/* Frames match the source ratio so nothing gets cropped out of a design
   that was composed to the edge. */
const aspectClass = {
  square: "aspect-square",
  wide: "aspect-[6/5]",
  portrait: "aspect-[3/4]",
  reel: "aspect-[9/16]",
  board: "aspect-[1000/1414]",
} as const;

const gridClass = {
  square: "grid-cols-2 sm:grid-cols-3",
  wide: "grid-cols-2 sm:grid-cols-3",
  portrait: "grid-cols-2 sm:grid-cols-3",
  reel: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  board: "grid-cols-1",
} as const;

function Gallery({
  collection,
  onOpen,
}: {
  collection: Collection;
  onOpen: (i: number) => void;
}) {
  // Reels are the one collection that behaves like playback rather than a
  // contact sheet, so it gets a carousel instead of a grid.
  if (collection.layout === "reel") {
    return <ReelCarousel reels={collection.images} onOpen={onOpen} />;
  }

  return (
    <Reveal className={`grid gap-3 sm:gap-4 ${gridClass[collection.layout]}`}>
      {collection.images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onOpen(i)}
          className={`group relative block w-full overflow-hidden rounded-2xl border border-ink transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-0.5 active:scale-[0.99] ${aspectClass[collection.layout]}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          <span className="sr-only">Enlarge</span>
        </button>
      ))}
    </Reveal>
  );
}

export default function Work() {
  const [openIn, setOpenIn] = useState<{ id: string; index: number } | null>(null);
  const active = collections.find((c) => c.id === openIn?.id) ?? null;

  return (
    <section id="work" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 pb-2 pt-16 sm:px-6 sm:pt-20">
        <h2 className="text-[clamp(2.25rem,6vw,3.25rem)]">Selected work</h2>
        <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.7] text-ink-soft">
          Designs made for businesses across wellness, beauty, coaching, real
          estate, food, retail and personal branding. Tap any image to see it
          full size.
        </p>
      </div>

      {collections.map((c, i) => {
        const flip = i % 2 === 1;
        return (
          <article
            key={c.id}
            id={c.id}
            className={`scroll-mt-24 ${i % 2 === 0 ? "" : `${fieldClass[c.field]} border-y border-ink/15`}`}
          >
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
              {/* Alternating sides come from swapping the track order, not
                  from `order` — with two auto-placed items, `order` would
                  drop the gallery into the narrow text column. */}
              <div
                className={`grid gap-8 lg:gap-14 ${
                  c.layout === "board"
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
                    : flip
                      ? "lg:grid-cols-[minmax(0,1fr)_19rem]"
                      : "lg:grid-cols-[19rem_minmax(0,1fr)]"
                }`}
              >
                <div className={flip ? "lg:col-start-2 lg:row-start-1" : ""}>
                  <div className="lg:sticky lg:top-28">
                    <h3 className="text-[clamp(1.7rem,4.4vw,2.4rem)]">{c.title}</h3>
                    <p className="mt-2 font-hand text-[1.2rem] text-coral">{c.meta}</p>
                    <p className="mt-4 max-w-[46ch] text-[1rem] leading-[1.68] text-ink-soft">
                      {c.blurb}
                    </p>
                    <p className="mt-5 text-[0.9rem] text-ink-soft">
                      {c.images.length} {c.images.length === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>

                <div className={flip ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <Gallery
                    collection={c}
                    onOpen={(index) => setOpenIn({ id: c.id, index })}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <Lightbox
        images={active?.images ?? []}
        index={active ? (openIn?.index ?? null) : null}
        label={active?.title ?? ""}
        onClose={() => setOpenIn(null)}
        onNavigate={(index) => setOpenIn((s) => (s ? { ...s, index } : s))}
      />
    </section>
  );
}
