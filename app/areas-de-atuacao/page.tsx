import type { Metadata } from "next";
import Image from "next/image";
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
    <div>
      <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden text-center">
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
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        {practiceAreas.map((area, index) => (
          <PracticeAreaParallaxRow
            key={area.slug}
            area={area}
            icon={practiceAreaIcons[area.slug]}
            reversed={index % 2 === 1}
            isLast={index === practiceAreas.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
