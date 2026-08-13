import { navLinks, profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-page">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-14">
        <div>
          <p
            className="font-display text-3xl"
            style={{ fontVariationSettings: '"SOFT" 60, "WONK" 1, "opsz" 144' }}
          >
            {profile.name}
          </p>
          <p className="mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed text-page/70">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-page/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors duration-200 hover:text-page">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors duration-200 hover:text-page"
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
