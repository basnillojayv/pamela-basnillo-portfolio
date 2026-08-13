import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});

const siteUrl = "https://pamela-basnillo-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pamela Basnillo — Creative marketing & virtual support strategist",
  description:
    "Pamela Basnillo is a creative marketing and virtual support strategist in Davao City. Social media design, content strategy, SOPs and backend systems for growing brands.",
  keywords: [
    "virtual assistant",
    "social media manager",
    "graphic designer",
    "content strategy",
    "Davao City",
    "Philippines",
  ],
  authors: [{ name: "Pamela Basnillo" }],
  openGraph: {
    title: "Pamela Basnillo — Creative marketing & virtual support strategist",
    description:
      "Social media design, content strategy, SOPs and backend systems for growing brands.",
    url: siteUrl,
    siteName: "Pamela Basnillo",
    images: [{ url: "/pamela-blossom.webp", width: 1200, height: 1800 }],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pamela Basnillo — Creative marketing & virtual support strategist",
    description:
      "Social media design, content strategy, SOPs and backend systems for growing brands.",
    images: ["/pamela-blossom.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${caveat.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-ink focus:bg-page focus:px-5 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
        {/* Without JS the reveal attribute is never set, so nothing hides.
            This keeps that true even if a stylesheet loads before hydration. */}
        <noscript>
          <style>{`[data-reveal] > * { opacity: 1 !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
