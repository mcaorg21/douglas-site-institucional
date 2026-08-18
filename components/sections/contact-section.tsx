import { contact, site } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div
        data-scroll-reveal
        className="mx-auto max-w-3xl px-6 py-24 text-center"
      >
        <p className="text-sm tracking-wide text-primary-foreground/70 uppercase">
          {contact.sectionTitle}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
          {contact.subtitle}
        </h2>
        <p className="mt-6 text-base text-primary-foreground/80 md:text-lg">
          {contact.text}
        </p>

        <Button
          size="lg"
          nativeButton={false}
          className="mt-10 h-12 bg-primary-foreground px-8 text-base text-primary hover:bg-primary-foreground/90"
          render={
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" />
          }
        >
          {contact.cta}
        </Button>

        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-primary-foreground/70">
          <a href={`mailto:${site.email}`} className="hover:text-primary-foreground">
            {site.email}
          </a>
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-foreground"
          >
            {site.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
