"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const META_PIXEL_ID = "1588591949648082";

type MetaPixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

export function MetaPixel() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    (window as MetaPixelWindow).fbq?.("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    const trackWhatsappContact = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!link) return;

      const contentName =
        link.getAttribute("aria-label")?.trim() ||
        link.textContent?.trim() ||
        "WhatsApp";

      (window as MetaPixelWindow).fbq?.("track", "Contact", {
        content_category: "WhatsApp",
        content_name: contentName,
      });
    };

    document.addEventListener("click", trackWhatsappContact, true);
    return () =>
      document.removeEventListener("click", trackWhatsappContact, true);
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
