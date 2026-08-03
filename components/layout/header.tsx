"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";

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
        "group flex items-center justify-between text-sm transition-colors hover:text-primary",
        isActive ? "font-medium text-primary" : "text-foreground/80",
        className,
      )}
    >
      <span>{item.label}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSobre = pathname === "/sobre";
  const [scrolled, setScrolled] = useState(false);
  const [compactOnStory, setCompactOnStory] = useState(false);

  useEffect(() => {
    if (!isHome && !isSobre) return;

    const onScroll = () => {
      const threshold = isSobre
        ? Math.max(64, window.innerHeight * 0.65)
        : 10;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, isSobre]);

  useEffect(() => {
    const updateCompactState = () => {
      if (window.innerWidth >= 768) {
        const compactOnDesktop =
          pathname === "/" ||
          pathname === "/sobre" ||
          pathname === "/areas-de-atuacao";

        if (!compactOnDesktop) {
          setCompactOnStory(false);
          return;
        }

        setCompactOnStory(window.scrollY > 10);
        return;
      }

      const compactWhileScrolling =
        pathname === "/" ||
        pathname === "/sobre" ||
        pathname === "/areas-de-atuacao";
      const compactThreshold = pathname === "/" ? 10 : 64;
      setCompactOnStory(
        compactWhileScrolling && window.scrollY > compactThreshold,
      );
    };

    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    window.addEventListener("resize", updateCompactState);

    return () => {
      window.removeEventListener("scroll", updateCompactState);
      window.removeEventListener("resize", updateCompactState);
    };
  }, [pathname]);

  const transparent = (isHome || isSobre) && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 z-40 w-full transition-all duration-500 ease-out",
          "border-b border-transparent bg-transparent shadow-none",
          compactOnStory &&
            "top-4 right-4 h-12 w-12 rounded-full border border-border bg-background/95 shadow-lg backdrop-blur",
        )}
      >
        <div
          className={cn(
            "mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6",
            compactOnStory && "h-12 w-12 grid-cols-1 px-0",
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-heading text-lg tracking-tight transition-colors duration-500",
              transparent ? "text-white" : "text-primary",
              compactOnStory && "hidden",
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

          <div className={cn("flex justify-center", compactOnStory && "hidden")}>
            <NavTabs variant={transparent ? "light" : "dark"} />
          </div>

          <div
            className={cn(
              "flex justify-end",
              compactOnStory ? "justify-center md:flex" : "md:hidden",
            )}
          >
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menu"
                    className={
                      transparent && !compactOnStory
                        ? "text-white hover:bg-white/10 hover:text-white"
                        : undefined
                    }
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                className="inset-y-2 right-2 h-[calc(100%-1rem)] w-[calc(100%-1.5rem)] overflow-hidden rounded-3xl border border-border/70 bg-background/95 px-2 py-3 shadow-2xl backdrop-blur-xl duration-500 ease-out data-[side=right]:inset-y-2 data-[side=right]:right-2 data-[side=right]:h-[calc(100%-1rem)] data-[side=right]:w-[calc(100%-1.5rem)] data-[side=right]:data-ending-style:translate-x-full data-[side=right]:data-starting-style:translate-x-full sm:max-w-sm"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                />

                <SheetHeader className="relative border-b border-border/70 px-4 pt-3 pb-6">
                  <Image
                    src="/logos/logo_inline.png"
                    alt=""
                    width={1016}
                    height={125}
                    className="h-5 w-auto self-start"
                  />
                  <SheetTitle className="sr-only">{site.name}</SheetTitle>
                  <p className="mt-4 max-w-60 text-sm leading-relaxed text-muted-foreground">
                    {site.role}
                  </p>
                </SheetHeader>

                <nav className="relative flex flex-1 flex-col justify-center px-4">
                  {nav.map((item) => (
                    <SheetClose
                      key={item.label}
                      nativeButton={false}
                      render={
                        <NavLink
                          item={item}
                          className="border-b border-border/70 py-5 font-heading text-xl last:border-b-0"
                        />
                      }
                    />
                  ))}
                </nav>

                <p className="relative px-4 pb-3 text-xs tracking-wide text-muted-foreground uppercase">
                  Advocacia empresarial estratégica
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {!isHome && !isSobre && <div aria-hidden="true" className="h-16 w-full" />}
    </>
  );
}
