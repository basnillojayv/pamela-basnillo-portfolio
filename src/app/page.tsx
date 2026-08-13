import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { collections, profile, services } from "@/lib/content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Davao City",
    addressCountry: "PH",
  },
  knowsAbout: services.map((s) => s.title),
  hasPart: collections.map((c) => ({
    "@type": "CreativeWork",
    name: c.title,
    description: c.blurb,
  })),
};

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Tools />
        <Work />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
