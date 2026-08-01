"use client";

import React, { memo, useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  draggable?: boolean;
  paused?: boolean;
  className?: string;
};

export const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  draggable = false,
  paused = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (size === 0 || isDragging || paused) return;

    const shouldResume = isTransitioning || translation.get() !== from;
    const controls = shouldResume
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration:
            currentDuration *
            Math.abs((translation.get() - to) / contentSize),
          onComplete: () => {
            setIsTransitioning(false);
            setKey((previous) => previous + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: currentDuration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => translation.set(from),
        });

    return controls.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    isDragging,
    paused,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        drag={
          draggable ? (direction === "horizontal" ? "x" : "y") : false
        }
        dragConstraints={
          draggable
            ? direction === "horizontal"
              ? { left: -(width + gap) / 2, right: 0 }
              : { top: -(height + gap) / 2, bottom: 0 }
            : undefined
        }
        dragElastic={0.04}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          setIsTransitioning(true);
        }}
        className={cn(
          "flex w-max",
          draggable &&
            (direction === "horizontal"
              ? "cursor-grab touch-pan-y active:cursor-grabbing"
              : "cursor-grab touch-pan-x active:cursor-grabbing"),
        )}
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- supports arbitrary logo dimensions
    <img
      alt={logo.alt}
      src={logo.src}
      width={logo.width ?? "auto"}
      height={logo.height ?? "auto"}
      loading="lazy"
      className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
    />
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {logos.map((logo, index) => (
          <LogoImage key={`${logo.alt}-${index}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;
