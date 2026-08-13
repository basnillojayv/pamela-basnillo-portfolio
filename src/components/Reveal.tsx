"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay between each direct child, in ms. */
  stagger?: number;
};

/**
 * Staggered entrance for a grid of children.
 *
 * The `data-reveal` attribute is written straight to the node rather than
 * held in state: it is presentation only, so a re-render buys nothing.
 * Server output carries no attribute, which means content is visible
 * before hydration and in any renderer that never runs this effect. The
 * hidden state is only applied when an IntersectionObserver exists to
 * take it back off again.
 */
export default function Reveal({ children, className, stagger = 45 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-reveal", "shown");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    // Already on screen at mount: skip the hidden state so the first
    // paint never flashes.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      show();
      return;
    }

    node.setAttribute("data-reveal", "pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);

    // Safety net: reveal regardless if the observer never fires.
    const timer = window.setTimeout(show, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ "--reveal-stagger": `${stagger}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
