import Link from "next/link";
import { about, practiceAreas, practiceAreasSection } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="relative overflow-hidden bg-background">
        <div data-scroll-reveal className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              {about.sectionTitle}
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {about.subtitle}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              {about.intro}
            </p>

            <blockquote className="mt-10 border-l-2 border-primary pl-6">
              <p className="font-heading text-xl text-primary md:text-2xl">
                &ldquo;{about.quote.text}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-muted-foreground">
                {about.quote.author}
              </footer>
            </blockquote>

            <Link
              href="/sobre"
              className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
            >
              Saiba mais sobre Douglas Figueredo →
            </Link>
          </div>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 w-full fill-secondary md:h-36"
        >
          <path d="M0 118C220 146 420 78 650 92C900 108 1080 142 1220 70C1300 30 1368 38 1440 52V160H0V118Z" />
        </svg>
      </section>

      <section className="bg-secondary">
        <div data-scroll-reveal className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            {practiceAreasSection.sectionTitle}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            {practiceAreasSection.subtitle}
          </h2>

          <div className="mt-12">
            <FeaturesSectionWithHoverEffects
              features={practiceAreas.map((area) => ({
                title: area.title,
                description: area.quote,
                href: `/areas-de-atuacao#${area.slug}`,
              }))}
            />
          </div>

          <Link
            href="/areas-de-atuacao"
            className="mt-10 inline-block text-sm font-medium text-primary hover:underline"
          >
            Ver todas as áreas de atuação →
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
