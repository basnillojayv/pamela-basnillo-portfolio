import { profile } from "@/lib/content";

/**
 * A single sakura petal, tip pointing up, base at the origin.
 *
 * The notched tip is the detail that makes it read as a cherry blossom
 * rather than a generic five-petal flower — and the blossom is already
 * Pamela's motif: it's behind her in the hero, drawn over her intro clip,
 * and scattered through the sections.
 */
const PETAL =
  "M0 -4C-5 -6 -7.6 -11 -6.2 -15.6C-5.6 -17.6 -3.4 -18.7 -1.8 -17.7C-0.9 -17.1 -0.3 -16.3 0 -15.5C0.3 -16.3 0.9 -17.1 1.8 -17.7C3.4 -18.7 5.6 -17.6 6.2 -15.6C7.6 -11 5 -6 0 -4Z";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden focusable="false" className={className}>
      <g transform="translate(20 20)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path key={angle} d={PETAL} transform={`rotate(${angle})`} fill="var(--color-coral)" />
        ))}
        {/* currentColor, not ink: the footer sets the mark on a near-black
            field, where a fixed ink centre would disappear. */}
        <circle r="3.6" fill="currentColor" />
      </g>
    </svg>
  );
}

/**
 * Mark plus wordmark. The name is set in caps with wide tracking so it
 * reads as a signature rather than as running text next to the heading
 * it sits above.
 */
export default function Logo({
  className,
  markClassName = "h-7 w-7",
  textClassName = "text-[0.8rem]",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={`${markClassName} shrink-0`} />
      <span
        className={`font-display font-semibold uppercase leading-none tracking-[0.15em] ${textClassName}`}
        style={{ fontVariationSettings: '"SOFT" 30, "WONK" 0, "opsz" 24' }}
      >
        {profile.name}
      </span>
    </span>
  );
}
