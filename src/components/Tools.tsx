import Image from "next/image";
import { toolGroups } from "@/lib/content";
import Reveal from "./Reveal";

export default function Tools() {
  return (
    <section aria-labelledby="tools-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 id="tools-heading" className="text-[clamp(1.9rem,4.5vw,2.5rem)]">
            Tools I work in
          </h2>
          <p className="mt-4 max-w-[34ch] text-[1rem] leading-relaxed text-ink-soft">
            Plus the whole of Google Workspace — Gmail, Calendar, Drive, Docs,
            Sheets, Slides and Meet.
          </p>
          <Image
            src="/tool/google-workspace.webp"
            alt="Google Workspace"
            width={220}
            height={28}
            className="mt-6 h-6 w-auto object-contain"
          />
        </div>

        <div className="space-y-9">
          {toolGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                {group.label}
              </h3>

              {/* Equal cells give the rhythm; the per-logo height in
                  content.ts evens the optical weight inside them. Heights sit
                  in a 19–26px band derived from each mark's aspect ratio, so
                  a square app icon and a long wordmark read as the same size
                  without shrinking the wordmarks past legibility. */}
              <Reveal
                as="ul"
                stagger={35}
                className="mt-3 -mx-1 flex flex-wrap gap-y-0 sm:mx-0 sm:gap-x-1"
              >
                {group.tools.map((t) => (
                  <li
                    key={t.name}
                    className="group flex h-16 w-1/3 items-center justify-center rounded-xl px-1 transition-colors duration-300 ease-[var(--ease-out-quart)] hover:bg-blossom/50 sm:w-[8.25rem] sm:px-2"
                  >
                    <Image
                      src={t.src}
                      alt={t.name}
                      width={t.w * 2}
                      height={t.h * 2}
                      style={{ height: `${t.h}px`, width: "auto" }}
                      className="max-w-full object-contain transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-[1.07]"
                    />
                  </li>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
