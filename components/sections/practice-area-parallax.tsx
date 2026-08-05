"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import type { PracticeArea } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function PracticeAreaParallaxRow({
  area,
  reversed = false,
}: {
  area: PracticeArea;
  reversed?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const servicesId = `${area.slug}-servicos`;
  const { scrollYProgress } = useScroll({
    target: desktopCardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div
      id={area.slug}
      className="scroll-mt-24 grid items-center gap-10 border-b border-border py-20 [perspective:1200px] last:border-b-0 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, rotateX: -24, y: 56 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className={cn("min-w-0", reversed && "lg:order-2")}
      >
        <div className="overflow-hidden rounded-2xl border border-border md:hidden">
          <motion.div
            animate={{ x: isOpen ? "-50%" : "0%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-[200%] items-stretch"
          >
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={servicesId}
              onClick={() => setIsOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsOpen(true);
                }
              }}
              className="min-w-0 w-1/2 shrink-0 cursor-pointer bg-background p-7"
            >
              <h3 className="break-words font-heading text-3xl text-primary [overflow-wrap:anywhere]">
                {area.title}
              </h3>
              <p className="mt-4 break-words text-base text-muted-foreground italic [overflow-wrap:anywhere]">
                &ldquo;{area.quote}&rdquo;
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm font-medium text-primary transition-colors">
                <span>Ver serviços</span>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </div>
            </div>

            <div
              id={servicesId}
              role="button"
              tabIndex={0}
              aria-label={`Voltar para ${area.title}`}
              onClick={() => setIsOpen(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsOpen(false);
                }
              }}
              className="min-w-0 w-1/2 shrink-0 cursor-pointer bg-primary p-7 text-primary-foreground"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80 transition-colors">
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                <span>Voltar</span>
              </div>

              <p className="mt-8 font-heading text-2xl">Serviços</p>
              <Separator className="my-5 bg-primary-foreground/25" />
              <ul className="grid gap-3">
                {area.services.map((service) => (
                    <li
                      key={service}
                      className="flex min-w-0 gap-2 text-sm leading-relaxed text-primary-foreground/90"
                    >
                      <span aria-hidden="true">&middot;</span>
                      <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                        {service}
                      </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="hidden md:block">
          <h3 className="break-words font-heading text-3xl text-primary [overflow-wrap:anywhere] md:text-4xl">
            {area.title}
          </h3>
          <p className="mt-4 break-words text-base text-muted-foreground italic [overflow-wrap:anywhere] md:text-lg">
            &ldquo;{area.quote}&rdquo;
          </p>
        </div>
      </motion.div>

      <motion.div
        ref={desktopCardRef}
        initial={{ opacity: 0, rotateX: -28, y: 64 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.12,
        }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className={cn(
          "relative hidden min-w-0 aspect-square overflow-hidden rounded-2xl bg-primary md:flex",
          reversed && "lg:order-1",
        )}
      >
        <motion.div
          aria-hidden="true"
          style={{ y: imageY }}
          className="pointer-events-none absolute inset-x-0 -inset-y-[10%]"
        >
          <Image
            src={area.image}
            alt=""
            fill
            loading={
              area.slug === "reestruturacao-societaria-e-ma" ? "eager" : "lazy"
            }
            sizes="(min-width: 1152px) 512px, 50vw"
            className="object-cover opacity-65 grayscale"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-primary/55"
        />

        <div className="relative z-10 h-full w-full overflow-y-auto px-8 pt-16 pb-8 text-primary-foreground">
          <p className="font-heading text-xl text-primary-foreground">
            Serviços
          </p>
          <Separator className="my-5 bg-primary-foreground/25" />
          <ul className="grid gap-3">
            {area.services.map((service) => (
              <li
                key={service}
                className="flex min-w-0 gap-2 text-sm leading-relaxed text-primary-foreground/90"
              >
                <span aria-hidden="true" className="text-primary-foreground">
                  &middot;
                </span>
                <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
