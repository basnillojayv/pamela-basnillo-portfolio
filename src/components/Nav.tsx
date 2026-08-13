"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/lib/content";
import Logo from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // A native <dialog> gives the full-screen menu focus trapping, inert
  // background and Escape-to-close without hand-rolling any of it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  // Teardown lives here rather than in the effect above because Escape is
  // handled by the browser: it closes the dialog itself, so the effect's
  // close branch never runs and the scroll lock stayed on.
  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "";
    toggleRef.current?.focus();
  };

  return (
    <header className="pointer-events-none sticky top-0 z-nav px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-ink bg-page/95 px-4 py-2.5 backdrop-blur-[2px] sm:px-6 sm:py-3"
      >
        <a
          href="#top"
          className="-my-2 flex min-h-11 items-center pr-2 transition-opacity duration-200 hover:opacity-70"
        >
          <span className="sr-only">{profile.name} — home</span>
          <Logo markClassName="h-6 w-6 sm:h-7 sm:w-7" textClassName="text-[0.72rem] sm:text-[0.8rem]" />
        </a>

        {/* py-3 keeps each link a 44px-tall target — the desktop nav is what
            tablets get, and those are touch. */}
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
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-transform duration-150 ease-[var(--ease-out-quart)] active:scale-[0.94] md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span className="absolute left-0 top-0 block h-px w-full bg-ink" />
            <span className="absolute left-0 top-3 block h-px w-full bg-ink" />
          </span>
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={handleClose}
        className="menu-sheet pointer-events-auto fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-blossom p-0 text-ink backdrop:bg-ink/20 md:hidden"
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-3">
          <div className="flex items-center justify-between">
            <Logo markClassName="h-6 w-6" textClassName="text-[0.72rem]" />
            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-page/50 active:scale-[0.94]"
            >
              <span className="sr-only">Close menu</span>
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* The links get the room the sheet affords: display-scale type,
              one per line, sized as the primary thing on the screen. */}
          <nav aria-label="Mobile" className="mt-auto">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-ink/15">
                  <a
                    href={l.href}
                    onClick={handleClose}
                    style={{ animationDelay: `${60 + i * 55}ms` }}
                    className="animate-rise flex items-baseline gap-4 py-5 font-display text-[clamp(2.1rem,11vw,3rem)] leading-none tracking-[-0.028em]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <a
              href={`mailto:${profile.email}`}
              onClick={handleClose}
              className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-ink bg-ink px-6 text-[1rem] text-page transition-transform duration-200 ease-[var(--ease-out-quart)] active:scale-[0.98]"
            >
              Email me
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="mt-4 text-center text-[0.9rem] text-ink-soft">
              {profile.phone} · {profile.location}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
