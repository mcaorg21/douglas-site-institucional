"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { PracticeArea } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function PracticeAreaParallaxRow({
  area,
  icon,
  reversed = false,
}: {
  area: PracticeArea;
  icon: ReactElement;
  reversed?: boolean;
}) {
  const textX = reversed ? 40 : -40;
  const iconX = reversed ? -40 : 40;

  return (
    <div
      id={area.slug}
      className="scroll-mt-24 grid items-center gap-10 border-b border-border py-20 last:border-b-0 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, x: textX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(reversed && "lg:order-2")}
      >
        <h3 className="font-heading text-3xl text-primary md:text-4xl">
          {area.title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground italic md:text-lg">
          &ldquo;{area.quote}&rdquo;
        </p>

        <Separator className="my-6" />

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {area.services.map((service) => (
            <li key={service} className="flex gap-2 text-sm text-foreground/85">
              <span aria-hidden="true" className="text-primary">
                &middot;
              </span>
              {service}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: iconX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className={cn(
          "hidden aspect-square items-center justify-center rounded-2xl bg-secondary md:flex",
          reversed && "lg:order-1",
        )}
      >
        <div className="h-28 w-28 text-primary/70 [&>svg]:h-full [&>svg]:w-full [&>svg]:stroke-[1.25]">
          {icon}
        </div>
      </motion.div>
    </div>
  );
}
