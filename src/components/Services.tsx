import Image from "next/image";
import { services } from "@/lib/content";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 border-y border-ink/15 bg-sky">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.25rem,6vw,3.25rem)]">Services</h2>
          <p className="max-w-[42ch] text-[1.02rem] leading-relaxed text-ink-soft">
            Six things I do. Most clients start with one and end up handing over
            two or three once the first is running on its own.
          </p>
        </div>

        {/* Six siblings in one list — the case where a stagger is choreography
            rather than a reflex. */}
        <Reveal
          as="ul"
          stagger={55}
          className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <li key={s.title} className="group flex gap-4">
              <Image
                src={s.icon}
                alt=""
                width={56}
                height={56}
                className="mt-1 h-12 w-12 shrink-0 object-contain transition-transform duration-400 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-14 sm:w-14"
              />
              <div>
                <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal transition-colors duration-200 group-hover:text-coral">
                  {s.title}
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-[0.98rem] leading-[1.55] text-ink-soft">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
