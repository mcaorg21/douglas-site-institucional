import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section className="border-b border-border bg-background">
      <div
        data-scroll-reveal
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-heading text-4xl text-primary">{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
