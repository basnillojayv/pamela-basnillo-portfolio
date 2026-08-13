import Image from "next/image";
import { toolGroups } from "@/lib/content";

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
            height={30}
            className="mt-6 h-6 w-auto object-contain"
          />
        </div>

        <div className="space-y-8">
          {toolGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                {group.label}
              </h3>
              {/* Height and width are both capped so a long wordmark and a
                  square app icon land at roughly the same optical weight. */}
              <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-5">
                {group.tools.map((t) => (
                  <li key={t.name} className="flex h-9 items-center">
                    <Image
                      src={t.src}
                      alt={t.name}
                      width={160}
                      height={44}
                      className="h-auto max-h-8 w-auto max-w-[6.5rem] object-contain sm:max-h-9 sm:max-w-[7.5rem]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
