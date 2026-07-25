"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { NavTabs } from "@/components/layout/nav-tabs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavLink({
  item,
  className,
  ...props
}: { item: (typeof nav)[number] } & Omit<
  ComponentProps<typeof Link>,
  "href" | "target" | "rel"
>) {
  const pathname = usePathname();
  const isActive = !item.external && pathname === item.href;

  return (
    <Link
      {...props}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "text-sm transition-colors hover:text-primary",
        isActive ? "font-medium text-primary" : "text-foreground/80",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "z-40 w-full transition-colors",
          transparent
            ? "absolute inset-x-0 top-0 bg-transparent"
            : "fixed inset-x-0 top-0 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        )}
      >
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-heading text-lg tracking-tight",
              transparent ? "text-white" : "text-primary",
            )}
          >
            <Image
              src="/logos/logo_inline.png"
              alt={site.name}
              width={1016}
              height={125}
              className={cn("h-5 w-auto md:hidden", transparent && "invert")}
            />
            <Image
              src="/logos/logo_header.png"
              alt=""
              width={28}
              height={28}
              className={cn("hidden h-7 w-7 md:block", !transparent && "invert")}
            />
            <span className="hidden md:inline">{site.name}</span>
          </Link>

          <div className="flex justify-center">
            <NavTabs variant={transparent ? "light" : "dark"} />
          </div>

          <div className="flex justify-end md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menu"
                    className={
                      transparent ? "text-white hover:bg-white/10 hover:text-white" : undefined
                    }
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                className="inset-0 h-full w-full max-w-none origin-top-right border-none duration-300 ease-out data-ending-style:scale-0 data-ending-style:opacity-0 data-starting-style:scale-0 data-starting-style:opacity-0 sm:max-w-none data-[side=right]:inset-0 data-[side=right]:h-full data-[side=right]:w-full data-[side=right]:translate-x-0 data-[side=right]:border-l-0 data-[side=right]:sm:max-w-none"
              >
                <SheetHeader>
                  <SheetTitle>{site.name}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 px-4">
                  {nav.map((item) => (
                    <SheetClose key={item.label} render={<NavLink item={item} />} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {!transparent && <div aria-hidden="true" className="h-16 w-full" />}
    </>
  );
}
