"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { WorkImage } from "@/lib/content";

type Props = {
  images: WorkImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  label: string;
};

export default function Lightbox({ images, index, onClose, onNavigate, label }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() lands on the first focusable child, which is Previous.
      // Close is the conventional landing spot and the safer default.
      closeRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = index === null ? null : images[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${label} — enlarged view`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="fixed inset-0 z-[70] m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/92 backdrop:backdrop-blur-sm"
    >
      {current && index !== null && (
        <div className="flex h-full w-full flex-col gap-4 p-4 pt-16 sm:p-8 sm:pt-20">
          {/* `fill` + object-contain keeps the artwork at the largest size
              the viewport allows without depending on the intrinsic size
              next/image happens to serve. */}
          <div className="relative min-h-0 w-full flex-1">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 640px) 80vw, 95vw"
              className="object-contain"
            />
          </div>

          <p className="mx-auto max-w-[62ch] text-center text-[0.92rem] leading-relaxed text-page/80">
            {current.alt}
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-page/40 text-page transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-page/15 active:scale-[0.94]"
            >
              <span className="sr-only">Previous image</span>
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <span className="min-w-[4.5rem] text-center text-[0.9rem] tabular-nums text-page/70">
              {index + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-page/40 text-page transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-page/15 active:scale-[0.94]"
            >
              <span className="sr-only">Next image</span>
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-page/40 text-page transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-page/15 active:scale-[0.94] sm:right-8 sm:top-8"
          >
            <span className="sr-only">Close</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
