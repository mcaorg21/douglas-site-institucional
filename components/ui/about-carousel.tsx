"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AboutCarouselTopic = {
  title: string;
  description?: string;
  items: string[];
};

export function AboutCarousel({
  topics,
}: {
  topics: AboutCarouselTopic[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index] as HTMLElement | undefined;

    if (!carousel || !slide) return;

    carousel.scrollTo({
      left: slide.offsetLeft - carousel.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % topics.length;
      goToSlide(nextIndex);
    }, 20_000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, goToSlide, topics.length]);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slides = Array.from(carousel.children) as HTMLElement[];
    const closestIndex = slides.reduce((closest, slide, index) => {
      const currentDistance = Math.abs(
        slide.offsetLeft - carousel.offsetLeft - carousel.scrollLeft,
      );
      const closestDistance = Math.abs(
        slides[closest].offsetLeft - carousel.offsetLeft - carousel.scrollLeft,
      );

      return currentDistance < closestDistance ? index : closest;
    }, 0);

    setActiveIndex(closestIndex);
  };

  return (
    <section data-scroll-reveal aria-label="Tópicos sobre Douglas Figueredo">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Perfil profissional
          </p>
          <h2 className="mt-2 font-heading text-2xl text-primary md:text-3xl">
            Conheça a trajetória
          </h2>
        </div>

        <div className="hidden gap-2 sm:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Tópico anterior"
            disabled={activeIndex === 0}
            onClick={() => goToSlide(activeIndex - 1)}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Próximo tópico"
            disabled={activeIndex === topics.length - 1}
            onClick={() => goToSlide(activeIndex + 1)}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {topics.map((topic, index) => (
          <article
            key={topic.title}
            className="min-w-full snap-start rounded-2xl border border-border bg-background p-6 shadow-sm md:p-10"
          >
            <div className="flex items-start justify-between gap-5 border-b border-border pb-6">
              <div>
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(topics.length).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-2xl text-primary md:text-3xl">
                  {topic.title}
                </h3>
                {topic.description && (
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                )}
              </div>
            </div>

            <ul className="mt-7 grid gap-4 md:grid-cols-2">
              {topic.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl bg-secondary p-4 leading-relaxed text-foreground/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-label="Selecionar tópico">
          {topics.map((topic, index) => (
            <button
              key={topic.title}
              type="button"
              aria-label={`Ir para ${topic.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index ? "w-8 bg-primary" : "w-3 bg-border",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2 sm:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Tópico anterior"
            disabled={activeIndex === 0}
            onClick={() => goToSlide(activeIndex - 1)}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Próximo tópico"
            disabled={activeIndex === topics.length - 1}
            onClick={() => goToSlide(activeIndex + 1)}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
