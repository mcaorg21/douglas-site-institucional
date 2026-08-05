"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";

import type { PracticeArea } from "@/lib/content";
import { InfiniteSlider } from "@/components/ui/logo-marquee";
import { Separator } from "@/components/ui/separator";

export function PracticeAreasMobileSlider({
  areas,
}: {
  areas: PracticeArea[];
}) {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  useEffect(() => {
    if (!selectedArea) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArea(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedArea]);

  return (
    <div aria-label="Áreas de atuação em destaque" className="py-14 md:hidden">
      <p className="mb-5 px-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Toque para conhecer cada área
      </p>

      <InfiniteSlider
        gap={16}
        duration={75}
        durationOnHover={120}
        draggable
        paused={selectedArea !== null}
        className="py-2"
      >
        {areas.map((area, index) => (
          <button
            type="button"
            key={area.slug}
            onClick={() => setSelectedArea(area)}
            aria-label={`Ver detalhes de ${area.title}`}
            className="relative flex h-[28rem] w-[calc(100vw-3.5rem)] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-primary p-7 text-left text-primary-foreground shadow-sm"
          >
            <Image
              src={area.image}
              alt=""
              fill
              loading={
                index === 0 || area.slug === "reestruturacao-societaria-e-ma"
                  ? "eager"
                  : "lazy"
              }
              sizes="calc(100vw - 3.5rem)"
              className="pointer-events-none object-cover opacity-65 grayscale"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-primary/55"
            />

            <p className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase opacity-60">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(areas.length).padStart(2, "0")}
            </p>

            <h2 className="relative z-10 mt-6 break-words font-heading text-3xl leading-tight [overflow-wrap:anywhere]">
              {area.title}
            </h2>
            <p className="relative z-10 mt-4 text-base leading-relaxed italic opacity-75">
              &ldquo;{area.quote}&rdquo;
            </p>

            <span className="relative z-10 mt-auto flex items-center gap-2 text-sm font-medium">
              Ver detalhes
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </button>
        ))}
      </InfiniteSlider>

      {selectedArea && (
        <div
          role="presentation"
          onClick={() => setSelectedArea(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="area-dialog-title"
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[85svh] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-background p-7 text-foreground shadow-2xl"
          >
            <button
              type="button"
              autoFocus
              aria-label="Fechar detalhes"
              onClick={() => setSelectedArea(null)}
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-primary"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <p className="pr-12 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Área de atuação
            </p>
            <h2
              id="area-dialog-title"
              className="mt-5 pr-8 font-heading text-3xl leading-tight text-primary"
            >
              {selectedArea.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground italic">
              &ldquo;{selectedArea.quote}&rdquo;
            </p>

            <Separator className="my-7" />

            <p className="font-heading text-xl text-primary">Serviços</p>
            <ul className="mt-5 grid gap-3">
              {selectedArea.services.map((service) => (
                <li
                  key={service}
                  className="flex gap-2 text-sm leading-relaxed text-foreground/85"
                >
                  <span aria-hidden="true" className="text-primary">
                    &middot;
                  </span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelectedArea(null)}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Voltar
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
