import type { Metadata } from "next";
import Image from "next/image";

import { about } from "@/lib/content";
import {
  AboutCarousel,
  type AboutCarouselTopic,
} from "@/components/ui/about-carousel";

export const metadata: Metadata = {
  title: "Sobre | Douglas Figueredo",
  description: about.intro,
};

const topics: AboutCarouselTopic[] = [
  {
    title: "Trajetória executiva",
    description: "Posições de liderança ocupadas ao longo da carreira.",
    items: about.positions,
  },
  {
    title: "Atuação jurídica",
    description: "Experiência estratégica aplicada às decisões empresariais.",
    items: about.practice,
  },
  {
    title: "Conselhos de Administração",
    description: "Participação em organizações de diferentes setores da economia.",
    items: about.boards,
  },
  {
    title: "Docência",
    items: [about.teaching],
  },
  {
    title: "Setores atendidos",
    description: about.currentFocus,
    items: about.sectors,
  },
  {
    title: "Atuação na prática",
    description: "Suporte jurídico próximo, preventivo e conectado ao negócio.",
    items: about.inPractice,
  },
  {
    title: "Credenciais",
    items: about.credentials,
  },
];

export default function SobrePage() {
  return (
    <article>
      <header
        data-scroll-reveal
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
        <Image
          src="/images/logo_sobre_v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-primary/40"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <p className="text-sm tracking-wide text-primary-foreground/70 uppercase">
            {about.sectionTitle}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl text-primary-foreground md:text-5xl">
            {about.subtitle}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/85">
            {about.intro}
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 w-full fill-secondary md:h-28"
        >
          <path d="M0 118C220 146 420 78 650 92C900 108 1080 142 1220 70C1300 30 1368 38 1440 52V160H0V118Z" />
        </svg>
      </header>

      <div className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <AboutCarousel topics={topics} quote={about.quote} />
        </div>
      </div>
    </article>
  );
}
