"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  description: string;
  href?: string;
}

export function FeaturesSectionWithHoverEffects({
  features,
}: {
  features: FeatureItem[];
}) {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

function Feature({ title, description, href, index }: FeatureItem & { index: number }) {
  const fromLeft = index % 2 === 0;

  const content = (
    <>
      <div
        className={cn(
          "absolute inset-0 h-full w-full bg-gradient-to-t from-background to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100",
        )}
      />
      <div className="relative z-10 mb-2 px-10 text-lg font-heading font-medium">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-border transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
        <span className="inline-block text-foreground transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
        {description}
      </p>
    </>
  );

  const className = cn(
    "group/feature relative flex flex-col py-10 lg:border-r lg:border-border",
    href && "cursor-pointer",
    index % 3 === 0 && "lg:border-l",
    index < 3 && "lg:border-b",
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {href ? (
        <Link href={href} className={className}>
          {content}
        </Link>
      ) : (
        <div className={className}>{content}</div>
      )}
    </motion.div>
  );
}
