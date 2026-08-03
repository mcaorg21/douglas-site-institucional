"use client";

import { cn } from "@/lib/utils";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export type AboutCarouselTopic = {
  title: string;
  description?: string;
  items: string[];
};

const cardPalettes = [
  "bg-background text-foreground",
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
];

export function AboutCarousel({
  topics,
  quote,
}: {
  topics: AboutCarouselTopic[];
  quote: { text: string; author: string };
}) {
  const totalCards = topics.length + 1;

  return (
    <section aria-label="Tópicos sobre Douglas Figueredo">
      <div className="mb-8">
        <p className="text-sm tracking-wide text-muted-foreground uppercase">
          Perfil profissional
        </p>
        <h2 className="mt-2 font-heading text-2xl text-primary md:text-3xl">
          Conheça a trajetória
        </h2>
      </div>

      <FlowArt
        aria-label="Trajetória profissional de Douglas Figueredo"
        className="rounded-2xl"
      >
        {topics.map((topic, index) => (
          <FlowSection
            key={topic.title}
            aria-label={topic.title}
            className={cn(
              "min-h-[75svh] border border-border",
              cardPalettes[index % cardPalettes.length],
            )}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">
              {String(index + 1).padStart(2, "0")} — Percurso
            </p>

            <hr className="border-current opacity-30" />

            <div>
              <h3 className="max-w-4xl font-heading text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
                {topic.title}
              </h3>
              {topic.description && (
                <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.35rem)] leading-relaxed opacity-75">
                  {topic.description}
                </p>
              )}
            </div>

            <hr className="border-current opacity-30" />

            <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
              {topic.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-current/25 pt-4 text-[clamp(0.95rem,1.6vw,1.15rem)] leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-auto text-right text-xs tracking-[0.2em] uppercase opacity-60">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(totalCards).padStart(2, "0")}
            </p>
          </FlowSection>
        ))}

        <FlowSection
          aria-label="Citação de Douglas Figueredo"
          className={cn(
            "min-h-[75svh] border border-border",
            cardPalettes[topics.length % cardPalettes.length],
          )}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">
            {String(totalCards).padStart(2, "0")} — Princípio
          </p>

          <hr className="border-current opacity-30" />

          <blockquote className="my-auto max-w-5xl">
            <p className="font-heading text-[clamp(2.5rem,6vw,6rem)] leading-[1.05] tracking-tight">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-8 text-sm tracking-wide opacity-70">
              {quote.author}
            </footer>
          </blockquote>

          <hr className="border-current opacity-30" />

          <p className="text-right text-xs tracking-[0.2em] uppercase opacity-60">
            {String(totalCards).padStart(2, "0")} /{" "}
            {String(totalCards).padStart(2, "0")}
          </p>
        </FlowSection>
      </FlowArt>
    </section>
  );
}
