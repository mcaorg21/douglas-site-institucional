"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

export interface SlideTabsProps {
  tabs: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

export function SlideTabs({
  tabs,
  defaultIndex = 0,
  onChange,
  className,
}: SlideTabsProps) {
  const [position, setPosition] = React.useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = React.useState(defaultIndex);
  const tabsRef = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      setPosition({
        left: selectedTab.offsetLeft,
        width: selectedTab.getBoundingClientRect().width,
        opacity: 1,
      });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          setPosition({
            left: selectedTab.offsetLeft,
            width: selectedTab.getBoundingClientRect().width,
            opacity: 1,
          });
        }
      }}
      className={cn(
        "relative mx-auto flex w-fit rounded-full border-2 border-primary bg-background p-1",
        className,
      )}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          isSelected={i === selected}
          setPosition={setPosition}
          onClick={() => {
            setSelected(i);
            onChange?.(i);
          }}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

interface TabProps {
  children: React.ReactNode;
  isSelected: boolean;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick: () => void;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, isSelected, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={(event) => {
          const target = event.currentTarget;
          setPosition({
            left: target.offsetLeft,
            width: target.getBoundingClientRect().width,
            opacity: 1,
          });
        }}
        className={cn(
          "relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase transition-colors duration-300 md:px-5 md:py-3 md:text-base",
          isSelected ? "text-primary-foreground" : "text-primary",
        )}
      >
        {children}
      </li>
    );
  },
);
Tab.displayName = "Tab";

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-7 rounded-full bg-primary md:h-12"
    />
  );
}
