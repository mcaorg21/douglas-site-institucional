"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

export function NavTabs({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const isLight = variant === "light";
  const pathname = usePathname();
  const activeIndex = nav.findIndex(
    (item) => !item.external && pathname === item.href,
  );

  const [position, setPosition] = React.useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const itemsRef = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const snapToActive = React.useCallback(() => {
    setHoveredIndex(null);
    const activeItem = itemsRef.current[activeIndex];
    if (activeItem) {
      setPosition({
        left: activeItem.offsetLeft,
        width: activeItem.getBoundingClientRect().width,
        opacity: 1,
      });
    } else {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeIndex]);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(snapToActive);
    return () => window.cancelAnimationFrame(frame);
  }, [snapToActive]);

  return (
    <ul
      onMouseLeave={snapToActive}
      className={cn(
        "relative hidden items-center rounded-full border-2 border-transparent bg-transparent p-1 transition-[background-color,border-color] duration-500 md:flex",
        isLight && "border-white",
      )}
    >
      {nav.map((item, i) => {
        const isHighlighted = i === (hoveredIndex ?? activeIndex);

        return (
          <li key={item.label} className="z-10">
            <Link
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onMouseEnter={(event) => {
                const target = event.currentTarget;
                setHoveredIndex(i);
                setPosition({
                  left: target.offsetLeft,
                  width: target.getBoundingClientRect().width,
                  opacity: 1,
                });
              }}
              className={cn(
                "block rounded-full px-5 py-2 text-sm transition-colors duration-300",
                isHighlighted
                  ? isLight
                    ? "text-primary"
                    : "text-primary-foreground"
                  : isLight
                    ? "text-white/80 hover:text-white"
                    : "text-foreground/80 hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}

      <motion.li
        animate={{ ...position }}
        className={cn(
          "absolute top-1 z-0 h-9 rounded-full transition-colors duration-500",
          isLight ? "bg-white" : "bg-primary",
        )}
      />
    </ul>
  );
}
