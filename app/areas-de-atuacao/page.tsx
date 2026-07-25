import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { practiceAreas, practiceAreasSection } from "@/lib/content";
import { practiceAreaIcons } from "@/lib/practice-area-icons";
import { PracticeAreaParallaxRow } from "@/components/sections/practice-area-parallax";

export const metadata: Metadata = {
  title: "Áreas de Atuação | Douglas Figueredo",
  description: practiceAreasSection.subtitle,
};

export default function AreasDeAtuacaoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <p className="text-sm tracking-wide text-muted-foreground uppercase">
          {practiceAreasSection.sectionTitle}
        </p>
        <h1 className="mt-4 font-heading text-4xl text-foreground md:text-6xl">
          {practiceAreasSection.intro}
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          {practiceAreasSection.subtitle}
        </p>

        <a
          href={`#${practiceAreas[0].slug}`}
          aria-label="Ver áreas de atuação"
          className="mt-16 cursor-pointer"
        >
          <ChevronDown
            aria-hidden="true"
            className="animate-arrow-blink h-8 w-8 text-primary"
          />
        </a>
      </div>

      <div className="pb-20">
        {practiceAreas.map((area, index) => (
          <PracticeAreaParallaxRow
            key={area.slug}
            area={area}
            icon={practiceAreaIcons[area.slug]}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
