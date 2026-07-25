import { SlideTabs } from "@/components/ui/slide-tabs";
import { nav } from "@/lib/content";

export default function SlideTabsDemo() {
  return (
    <div className="grid h-screen w-full place-content-center bg-background">
      <SlideTabs tabs={nav.map((item) => item.label)} />
    </div>
  );
}
