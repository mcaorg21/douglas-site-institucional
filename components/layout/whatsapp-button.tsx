import { site } from "@/lib/content";
import { WhatsappIcon } from "@/components/layout/whatsapp-icon";

export function WhatsappButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Douglas Figueredo pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <WhatsappIcon className="h-6 w-6" />
    </a>
  );
}
