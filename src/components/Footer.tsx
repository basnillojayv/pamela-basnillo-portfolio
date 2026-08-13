import { navLinks, profile } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-page">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-14">
        <div>
          <Logo markClassName="h-9 w-9" textClassName="text-[1.05rem]" />
          <p className="mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed text-page/70">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="-mx-2 flex flex-wrap items-center gap-x-3 text-[0.95rem] text-page/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center rounded-lg px-2 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-page hover:decoration-page/50"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex min-h-11 items-center rounded-lg px-2 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-page hover:decoration-page/50"
              >
                {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-page/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[0.85rem] text-page/50 sm:px-6">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
