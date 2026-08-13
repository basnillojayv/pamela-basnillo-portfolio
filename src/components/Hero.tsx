import Image from "next/image";
import { disciplines, profile } from "@/lib/content";

const toneClass = {
  blossom: "bg-blossom",
  sage: "bg-sage",
  sky: "bg-sky",
} as const;

const entrances = [
  { href: "#work", title: "Work", copy: "Five collections, from a bakery rebrand to a Singapore advisory team.", icon: "/icon/design.webp", tone: "bg-blossom" },
  { href: "#services", title: "Services", copy: "What I take on: content, design, systems, backend support.", icon: "/icon/systems.webp", tone: "bg-sage" },
  { href: "#contact", title: "Contact", copy: "Tell me what’s on your plate. I’ll tell you what I’d take off it.", icon: "/icon/assistance.webp", tone: "bg-sky" },
];

export default function Hero() {
  return (
    <section id="top">
      {/* The blossom field is the page's ground floor. The entrance cards
          below are pulled up across its edge, so the fold reads as one
          composition rather than two stacked bands. */}
      <div className="bg-blossom pb-28 pt-14 sm:pb-32 sm:pt-20 lg:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-14">
          {/* --- Copy ------------------------------------------------- */}
          <div className="relative">
            <p
              className="animate-rise font-hand text-[1.35rem] text-ink-soft"
              style={{ animationDelay: "40ms" }}
            >
              Hi — I&rsquo;m Pamela.
            </p>

            <h1
              className="animate-rise mt-1 text-[clamp(2.9rem,10.5vw,5.5rem)]"
              style={{ animationDelay: "100ms" }}
            >
              Pamela
              <br />
              Basnillo
            </h1>

            <p
              className="animate-rise mt-6 max-w-[34ch] font-display text-[clamp(1.25rem,3.4vw,1.75rem)] leading-[1.25] text-ink"
              style={{ animationDelay: "180ms", fontVariationSettings: '"SOFT" 40, "WONK" 1, "opsz" 40' }}
            >
              {profile.line}
            </p>

            <p
              className="animate-rise mt-5 max-w-[46ch] text-[1.0625rem] text-ink-soft"
              style={{ animationDelay: "240ms" }}
            >
              {profile.role}, based in {profile.location}. I work with entrepreneurs
              and growing brands who need the creative and the operational handled
              by the same person.
            </p>

            <ul
              className="animate-rise mt-8 flex flex-wrap gap-2.5"
              style={{ animationDelay: "300ms" }}
            >
              {disciplines.map((d) => (
                <li key={d.label}>
                  <span
                    className={`sticker ${toneClass[d.tone]}`}
                    style={{ transform: `rotate(${d.rotate}deg)` }}
                  >
                    <Image
                      src={`/doodle/${d.doodle}.webp`}
                      alt=""
                      width={18}
                      height={18}
                      className="doodle-ink h-[1.05em] w-[1.05em] object-contain"
                    />
                    {d.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Portrait --------------------------------------------- */}
          <div className="animate-settle relative mx-auto w-full max-w-[22rem] lg:max-w-none" style={{ animationDelay: "160ms" }}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-ink bg-blossom-deep">
              <Image
                src="/pamela-blossom.webp"
                alt="Pamela Basnillo standing under cherry blossoms in a red cardigan, arms out"
                fill
                priority
                sizes="(min-width: 1024px) 23rem, (min-width: 640px) 22rem, 90vw"
                className="object-cover object-[50%_25%]"
              />
            </div>

            <Image
              src="/doodle/sparkle.webp"
              alt=""
              width={64}
              height={64}
              aria-hidden
              className="doodle-ink pointer-events-none absolute -right-3 -top-5 z-10 h-12 w-12 object-contain sm:-right-6 sm:h-16 sm:w-16"
            />
            <Image
              src="/motif/blossom.webp"
              alt=""
              width={90}
              height={90}
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-5 z-10 h-16 w-16 -rotate-12 object-contain sm:h-20 sm:w-20"
            />
          </div>
        </div>
      </div>

      {/* --- Entrances -------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="-mt-20 grid gap-4 sm:-mt-24 sm:grid-cols-3">
          {entrances.map((e, i) => (
            <li key={e.href} className="animate-rise" style={{ animationDelay: `${380 + i * 70}ms` }}>
              <a
                href={e.href}
                className="surface group flex h-full flex-col gap-3 p-6 transition-transform duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 active:scale-[0.99]"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-ink ${e.tone}`}>
                  <Image src={e.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                </span>
                <h2 className="text-[1.4rem]">{e.title}</h2>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">{e.copy}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.9rem] font-medium text-coral">
                  Take a look
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
                  >
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
