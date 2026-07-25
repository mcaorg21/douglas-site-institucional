import Link from "next/link";
import { footer, nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <div
            role="img"
            aria-label={site.name}
            className="aspect-[1016/125] h-6 bg-primary"
            style={{
              WebkitMaskImage: "url(/logos/logo_inline.png)",
              maskImage: "url(/logos/logo_inline.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
            }}
          />
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-foreground/80">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            WhatsApp: {site.whatsapp}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-primary">
            {site.email}
          </a>
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            {site.instagram.handle}
          </a>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        {footer.copyright}
      </div>
    </footer>
  );
}
