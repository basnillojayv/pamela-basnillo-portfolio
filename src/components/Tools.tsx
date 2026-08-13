import Image from "next/image";
import { toolGroups } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Scatter offsets are hashed from the tool's own name rather than random,
 * so the server and the client agree, the wall never reshuffles between
 * renders, and nothing jumps on hydration. It looks hand-placed and
 * behaves like a fixed layout.
 */
function scatter(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return {
    "--drift": `${(hash % 17) - 8}px`,
    "--tilt": `${((hash >> 5) % 11) - 5}deg`,
  } as React.CSSProperties;
}

const tools = toolGroups.flatMap((group) => group.tools);

export default function Tools() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20"
    >
      <h2 id="tools-heading" className="text-[clamp(1.9rem,4.5vw,2.5rem)]">
        Tools I work in
      </h2>

      <p className="mx-auto mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-ink-soft">
        Plus the whole of Google Workspace — Gmail, Calendar, Drive, Docs,
        Sheets, Slides and Meet.
      </p>

      <Image
        src="/tool/google-workspace.webp"
        alt="Google Workspace"
        width={242}
        height={31}
        className="mx-auto mt-6 h-7 w-auto object-contain"
      />

      {/* A wrapped flow with per-item drift rather than absolute placement:
          it reads as scattered but can never overlap another logo or spill
          out of the container at a narrow width. */}
      <Reveal
        as="ul"
        stagger={30}
        className="mt-11 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-4 sm:gap-y-5"
      >
        {tools.map((t) => (
          <li key={t.name} className="tool-chip" style={scatter(t.name)}>
            <Image
              src={t.src}
              alt={t.name}
              width={t.w * 2}
              height={t.h * 2}
              style={{ height: `${t.h / 16}rem`, width: "auto" }}
              className="max-w-full object-contain"
            />
          </li>
        ))}
      </Reveal>
    </section>
  );
}
