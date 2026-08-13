import Image from "next/image";
import { profile } from "@/lib/content";

const details = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <path d="M2 5.5h16v13H2zM2 6l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
    icon: (
      <path
        d="M4.2 3h3.1l1.5 3.8-1.9 1.3a10.8 10.8 0 0 0 5 5l1.3-1.9L17 12.7v3.1a1.2 1.2 0 0 1-1.3 1.2A14.3 14.3 0 0 1 3 4.3 1.2 1.2 0 0 1 4.2 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "Based in",
    value: profile.location,
    href: null,
    icon: (
      <>
        <path d="M10 18s6-5.1 6-9.4A6 6 0 0 0 4 8.6C4 12.9 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden border-t border-ink/15 bg-blossom">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.25rem,7.2vw,4rem)]">
              Work with me
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.08rem] leading-[1.7] text-ink-soft">
              Send me what&rsquo;s on your plate right now — the posts you keep
              putting off, the system nobody has written down, the feed that
              stopped looking like you. I&rsquo;ll come back with what I&rsquo;d
              take on first.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-ink bg-ink px-7 py-3.5 text-[1.02rem] text-page transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-coral hover:border-coral active:scale-[0.97]"
            >
              Email Pamela
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {details.map((d) => (
                <li key={d.label}>
                  <span className="flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className="shrink-0">
                      {d.icon}
                    </svg>
                    {d.label}
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="-mx-2 mt-0.5 flex min-h-11 items-center rounded-lg px-2 text-[1.02rem] underline decoration-ink/30 underline-offset-4 transition-[color,text-decoration-color,background-color] duration-200 hover:bg-page/50 hover:text-coral hover:decoration-coral"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="mt-0.5 flex min-h-11 items-center text-[1.02rem]">
                      {d.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* She stands on the section's bottom edge rather than floating
              inside it — the cutout is the same one she annotates herself. */}
          <div className="relative -mb-16 mx-auto w-full max-w-[22rem] self-end sm:-mb-24 lg:mx-0 lg:max-w-none">
            <Image
              src="/pamela-cutout.webp"
              alt=""
              width={1100}
              height={984}
              aria-hidden
              className="w-full"
              sizes="(min-width: 1024px) 22rem, 22rem"
            />
            <span
              className="sticker absolute -left-1 top-2 bg-page sm:-left-4"
              style={{ "--tilt": "-6deg" } as React.CSSProperties}
            >
              <Image src="/doodle/smiley.webp" alt="" width={18} height={18} className="doodle-ink h-[1.05em] w-[1.05em]" />
              Let&rsquo;s talk
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
