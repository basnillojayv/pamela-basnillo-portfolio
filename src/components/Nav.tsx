"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-ink bg-page/95 px-4 py-2.5 backdrop-blur-[2px] sm:px-6 sm:py-3"
      >
        <a
          href="#top"
          className="-my-2 flex min-h-11 items-center pr-2 font-display text-2xl leading-none tracking-tight sm:text-[1.75rem]"
          style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' }}
        >
          <span className="sr-only">{profile.name} — home</span>
          <span aria-hidden>PB</span>
        </a>

        {/* py-3 -mx-* keeps each link a 44px-tall target — the desktop nav
            is what tablets get, and those are touch. */}
        <ul className="mx-auto hidden items-center gap-4 text-[0.95rem] md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative flex items-center px-3 py-3 transition-colors duration-200 hover:text-coral"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-coral transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="ml-auto hidden min-h-11 items-center rounded-full border border-ink px-4 py-2.5 text-[0.9rem] transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-ink hover:text-page active:scale-[0.97] md:ml-0 md:inline-flex"
        >
          Email me
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-transform duration-150 ease-[var(--ease-out-quart)] active:scale-[0.94] md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ease-[var(--ease-out-quart)] ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ease-[var(--ease-out-quart)] ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-ink bg-page md:hidden"
      >
        <ul className="divide-y divide-ink/15">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-lg"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-lg text-coral"
            >
              Email me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
