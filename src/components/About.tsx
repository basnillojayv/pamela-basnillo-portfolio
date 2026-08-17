import Image from "next/image";
import { about, sections } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 className="text-[clamp(2.25rem,6vw,3.25rem)]">{sections.about.eyebrow}</h2>

          <p className="mt-6 max-w-[38ch] font-display text-[clamp(1.35rem,3.2vw,1.85rem)] leading-[1.28]">
            {about.lead}
          </p>

          <div className="mt-7 max-w-[62ch] space-y-4 text-[1.05rem] leading-[1.7] text-ink-soft">
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <h3 className="mt-10 font-sans text-[0.95rem] font-semibold tracking-normal text-ink">
            {sections.about.practiceHeading}
          </h3>
          <Reveal as="ul" stagger={60} className="mt-4 max-w-[58ch] space-y-3">
            {about.practice.map((item) => (
              <li key={item} className="flex gap-3 text-[1.02rem] leading-[1.6] text-ink-soft">
                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                {item}
              </li>
            ))}
          </Reveal>
        </div>

        {/* The line she closes every conversation with, given the room it
            deserves rather than buried in a paragraph. */}
        <aside className="relative self-start overflow-hidden rounded-[2rem] border border-ink bg-sage px-7 py-12 sm:px-10 sm:py-14">
          <Image
            src="/motif/blossom.webp"
            alt=""
            width={200}
            height={200}
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rotate-[18deg] opacity-70"
          />

          <blockquote className="relative font-display text-[clamp(1.6rem,4.2vw,2.35rem)] leading-[1.18]">
            {about.motto.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>

          <p className="relative mt-7 max-w-[32ch] text-[0.98rem] leading-relaxed text-ink-soft">
            {sections.about.aside}
          </p>
        </aside>
      </div>
    </section>
  );
}
