"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { stats } from "@/lib/content";

function AnimatedStat({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), "");

  useEffect(() => {
    if (!isInView || !numberRef.current) return;

    if (reduceMotion) {
      numberRef.current.textContent = value;
      return;
    }

    const controls = animate(0, target, {
      duration: 1.15,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => {
        if (!numberRef.current) return;
        numberRef.current.textContent = `${Math.round(current)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [delay, isInView, reduceMotion, suffix, target, value]);

  return <span ref={numberRef}>{value}</span>;
}

export function StatsBar() {
  return (
    <section className="relative z-30 -mt-px border-b border-border bg-background sm:mt-0">
      <div
        data-scroll-reveal
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3"
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-heading text-4xl text-primary">
              <AnimatedStat value={stat.value} delay={index * 0.12} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
