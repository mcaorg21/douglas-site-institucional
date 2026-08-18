"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAnimationFrame = useRef<number | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = topics.length + 1;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    // Chromium's smooth scroll truncates jumps to a distant target when the
    // container has scroll-snap-type: mandatory, so the animation is driven
    // by hand here (with snap suspended) instead of relying on scrollTo().
    // setTimeout is used instead of requestAnimationFrame so the jump still
    // completes if the tab is backgrounded mid-animation.
    if (scrollAnimationFrame.current !== undefined) {
      window.clearTimeout(scrollAnimationFrame.current);
    }

    const start = track.scrollLeft;
    const target = card.offsetLeft - track.offsetLeft;
    const distance = target - start;
    const duration = 450;
    const startTime = Date.now();

    track.style.scrollSnapType = "none";

    const step = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      track.scrollLeft = start + distance * easeInOutCubic(progress);

      if (progress < 1) {
        scrollAnimationFrame.current = window.setTimeout(step, 16);
      } else {
        track.style.scrollSnapType = "";
        scrollAnimationFrame.current = undefined;
      }
    };

    step();
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    let closest = 0;
    let closestDistance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section aria-label="Tópicos sobre Douglas Figueredo">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Perfil profissional
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-primary md:text-3xl">
            Conheça a trajetória
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Tópico anterior"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-primary transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, total - 1))}
            disabled={activeIndex === total - 1}
            aria-label="Próximo tópico"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-primary transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {topics.map((topic, index) => (
          <article
            key={topic.title}
            className={cn(
              "flex min-h-[28rem] w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border p-8 md:w-[30rem] md:p-10",
              cardPalettes[index % cardPalettes.length],
            )}
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">
                {String(index + 1).padStart(2, "0")} — Percurso
              </p>
              <hr className="mt-4 border-current opacity-30" />
              <h3 className="mt-6 font-heading text-3xl font-bold leading-tight">
                {topic.title}
              </h3>
              {topic.description && (
                <p className="mt-4 text-base leading-relaxed opacity-75">
                  {topic.description}
                </p>
              )}
            </div>

            <ul className="mt-8 grid gap-3">
              {topic.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-current/25 pt-3 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-right text-xs tracking-[0.2em] uppercase opacity-60">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
          </article>
        ))}

        <article
          className={cn(
            "flex min-h-[28rem] w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border p-8 md:w-[30rem] md:p-10",
            cardPalettes[topics.length % cardPalettes.length],
          )}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">
            {String(total).padStart(2, "0")} — Princípio
          </p>
          <hr className="mt-4 border-current opacity-30" />

          <blockquote className="my-auto">
            <p className="font-heading text-2xl leading-snug">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-6 text-sm tracking-wide opacity-70">
              {quote.author}
            </footer>
          </blockquote>

          <p className="text-right text-xs tracking-[0.2em] uppercase opacity-60">
            {String(total).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </article>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para o card ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all",
              index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </section>
  );
}
