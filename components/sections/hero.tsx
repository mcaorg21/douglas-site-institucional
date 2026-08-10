import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden text-primary-foreground md:block md:min-h-0">
      <div className="animate-hero-fade-in absolute inset-0 z-0">
        <Image
          src="/images/logo_hero_v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover object-[78%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[#04223c]/70 md:bg-transparent" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <h1 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-4 text-sm tracking-wide text-primary-foreground/70 uppercase">
          {hero.identity}
        </p>
        <p className="mt-8 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
          {hero.highlight}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            className="h-12 bg-primary-foreground px-8 text-base text-primary hover:bg-primary-foreground/90"
            render={
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" />
            }
          >
            {hero.ctas.primary}
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 border-primary-foreground/40 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10"
            render={<Link href="/areas-de-atuacao" />}
          >
            {hero.ctas.secondary}
          </Button>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 w-full fill-background md:h-28"
      >
        <path d="M0 118C220 146 420 78 650 92C900 108 1080 142 1220 70C1300 30 1368 38 1440 52V160H0V118Z" />
      </svg>
    </section>
  );
}
