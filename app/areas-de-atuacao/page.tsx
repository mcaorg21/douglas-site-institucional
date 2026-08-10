import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { practiceAreas, practiceAreasSection } from "@/lib/content";
import { PracticeAreaParallaxRow } from "@/components/sections/practice-area-parallax";
import { PracticeAreasMobileSlider } from "@/components/sections/practice-areas-mobile-slider";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Áreas de Atuação | Douglas Figueredo",
  description: practiceAreasSection.subtitle,
};

export default function AreasDeAtuacaoPage() {
  return (
    <div>
      <div className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-center overflow-hidden text-center md:min-h-[80vh]">
        <Image
          src="/images/background_area.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover opacity-10"
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            {practiceAreasSection.sectionTitle}
          </p>
          <h1 className="mt-4 font-heading text-4xl text-primary md:text-6xl">
            {practiceAreasSection.intro}
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            {practiceAreasSection.subtitle}
          </p>

          <a
            href="#lista-areas-de-atuacao"
            aria-label="Ver áreas de atuação"
            className="mt-16 cursor-pointer"
          >
            <ChevronDown
              aria-hidden="true"
              className="animate-arrow-blink h-8 w-8 text-primary"
            />
          </a>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 w-full fill-background md:h-28"
        >
          <path d="M0 118C220 146 420 78 650 92C900 108 1080 142 1220 70C1300 30 1368 38 1440 52V160H0V118Z" />
        </svg>
      </div>

      <div id="lista-areas-de-atuacao" className="scroll-mt-16">
        <PracticeAreasMobileSlider areas={practiceAreas} />

        <div className="mx-auto hidden max-w-6xl px-6 pb-20 md:block">
          {practiceAreas.map((area, index) => (
            <PracticeAreaParallaxRow
              key={area.slug}
              area={area}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
