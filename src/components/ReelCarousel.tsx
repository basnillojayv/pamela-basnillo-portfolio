"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkImage } from "@/lib/content";

type Props = {
  reels: WorkImage[];
  onOpen: (index: number) => void;
  /** Milliseconds each reel holds before advancing. */
  interval?: number;
};

/**
 * Auto-advancing reel strip.
 *
 * Built on native scroll-snap rather than a transform track, so a thumb
 * drag, a trackpad swipe and the arrow buttons all move the same thing and
 * the whole strip still works with JavaScript off. Auto-advance is the only
 * part that needs JS, and it yields immediately to anyone who touches it.
 *
 * Items render a looping muted <video> when one is supplied and fall back
 * to the poster frame otherwise.
 */
export default function ReelCarousel({ reels, onOpen, interval = 4200 }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // The ticker reads these through refs so it can stay mounted across
  // pause/resume instead of tearing down and restarting its interval.
  const activeRef = useRef(0);
  const pausedRef = useRef(false);

  const setActiveBoth = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    const item = track?.children[index] as HTMLElement | undefined;
    if (!track || !item) return;
    track.scrollTo({
      left: item.offsetLeft - track.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  // Track the leading reel so the dots and the auto-advance agree with
  // wherever the visitor last dragged to.
  //
  // Derived from scrollLeft rather than an IntersectionObserver: three reels
  // are on screen at once, so "the most visible one" is ambiguous and was
  // reassigning the index mid-scroll, which made the strip skip.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        if (!items.length) return;
        let nearest = 0;
        let best = Infinity;
        items.forEach((item, i) => {
          const distance = Math.abs(item.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (distance < best) {
            best = distance;
            nearest = i;
          }
        });
        if (nearest !== activeRef.current) setActiveBoth(nearest);
      });
    };

    track.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      track.removeEventListener("scroll", sync);
      cancelAnimationFrame(frame);
    };
  }, [reels.length, setActiveBoth]);

  // Auto-advance. Held while hovered, focused, off-screen, on a hidden tab,
  // or when the visitor asked for reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const track = trackRef.current;
    if (!track) return;

    let onScreen = false;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    visibility.observe(track);

    // The advance runs here rather than inside a setState updater: React
    // invokes updaters twice in development, which fired the scroll twice
    // and made the strip skip a reel.
    const timer = window.setInterval(() => {
      if (pausedRef.current || !onScreen || document.hidden) return;
      const next = (activeRef.current + 1) % reels.length;
      setActiveBoth(next);
      scrollTo(next);
    }, interval);

    return () => {
      window.clearInterval(timer);
      visibility.disconnect();
    };
  }, [interval, reels.length, scrollTo, setActiveBoth]);

  const step = (delta: number) => {
    const next = (activeRef.current + delta + reels.length) % reels.length;
    setActiveBoth(next);
    scrollTo(next);
  };

  const hold = () => {
    pausedRef.current = true;
  };
  const release = () => {
    pausedRef.current = false;
  };

  return (
    <div
      onMouseEnter={hold}
      onMouseLeave={release}
      onTouchStart={hold}
      onFocusCapture={hold}
      onBlurCapture={release}
    >
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-4 sm:px-0"
      >
        {reels.map((reel, i) => (
          <li
            key={reel.src}
            className="w-[58%] shrink-0 snap-start sm:w-[38%] lg:w-[30%]"
          >
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Enlarge: ${reel.alt}`}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-ink transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 active:scale-[0.99]"
            >
              {reel.video ? (
                <video
                  src={reel.video}
                  poster={reel.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={reel.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={reel.src}
                  alt={reel.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 30vw, 58vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
                />
              )}

              {/* Play affordance — these read as video even while they are
                  still poster frames. */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full border border-page/70 bg-ink/45 text-page backdrop-blur-[2px] transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden>
                  <path d="M1 1.2v11.6L11 7z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-ink hover:text-page active:scale-[0.94]"
          >
            <span className="sr-only">Previous reel</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-ink hover:text-page active:scale-[0.94]"
          >
            <span className="sr-only">Next reel</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <ul className="flex items-center gap-1">
          {reels.map((reel, i) => (
            <li key={reel.src}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  scrollTo(i);
                }}
                aria-current={i === active}
                className="group flex h-11 w-6 items-center justify-center"
              >
                <span className="sr-only">Go to reel {i + 1}</span>
                <span
                  aria-hidden
                  /* ink/55 rather than ink/30: these dots carry position
                     state, so WCAG 1.4.11 wants 3:1 against the blossom
                     field and /30 only managed 1.88:1. */
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-quart)] ${
                    i === active
                      ? "w-6 bg-ink"
                      : "w-1.5 bg-ink/55 group-hover:bg-ink/80"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
