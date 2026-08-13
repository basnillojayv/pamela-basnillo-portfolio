"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * A media query is external state, so it belongs in useSyncExternalStore
 * rather than an effect that calls setState — and this way the preference
 * is picked up if it changes mid-session.
 *
 * The server snapshot says "reduced" so the markup ships the poster and
 * the video is only attached once the client confirms motion is welcome.
 * Rendering the <video> during SSR meant the browser began fetching the
 * clip before hydration could take it away again, which spent 353KB on
 * people who had asked for no animation.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}

const POSTER = "/hero-intro-poster.webp";
const VIDEO = "/hero-intro.mp4";

const DESCRIPTION =
  "Pamela Basnillo under cherry blossoms in a red cardigan, her portrait annotated with her name and the roles she works in: creative marketing, social media manager, graphic designer";

/**
 * Hero portrait.
 *
 * The intro clip is a one-shot reveal, not a loop: it fades up from white
 * over about a second and then holds a still frame for the remaining four.
 * Looping it would flash the hero white every five seconds, so it plays
 * once and rests on its final frame — which is exactly the poster, so the
 * still and the end of the clip are the same picture.
 *
 * Anyone who asked for reduced motion gets that still frame and no video
 * element at all, and the clip is never fetched for them.
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const useVideo = !reducedMotion && !autoplayFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // If the browser refuses to autoplay, fall back to the still rather
    // than leaving a paused first frame — which is nearly white.
    video.play().catch(() => setAutoplayFailed(true));
  }, [useVideo]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink bg-blossom-deep">
      {useVideo ? (
        <video
          ref={videoRef}
          src={VIDEO}
          poster={POSTER}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label={DESCRIPTION}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={POSTER}
          alt={DESCRIPTION}
          fill
          priority
          sizes="(min-width: 1024px) 23rem, (min-width: 640px) 22rem, 90vw"
          className="object-cover"
        />
      )}
    </div>
  );
}
