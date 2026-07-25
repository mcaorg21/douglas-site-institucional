import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sobre | Douglas Figueredo",
  description: about.intro,
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-foreground/85">
          <span aria-hidden="true" className="text-primary">
            &middot;
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SobrePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm tracking-wide text-muted-foreground uppercase">
        {about.sectionTitle}
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
        {about.subtitle}
      </h1>

      <p className="mt-8 text-lg leading-relaxed text-foreground/85">
        {about.intro}
      </p>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 z-0 hidden h-[46rem] w-72 opacity-90 lg:block"
        >
          <Image
            src="/images/douglas_canto.png"
            alt=""
            fill
            priority
            sizes="18rem"
            className="object-cover object-top"
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="mt-8 text-foreground/85">
            Ao longo de sua trajetória, ocupou posições como:
          </p>
          <List items={about.positions} />

          <p className="mt-8 text-foreground/85">Sua atuação inclui:</p>
          <List items={about.practice} />

          <p className="mt-8 text-foreground/85">
            Foi membro de Conselhos de Administração em:
          </p>
          <List items={about.boards} />

          <p className="mt-8 text-foreground/85">{about.teaching}</p>

          <p className="mt-8 text-foreground/85">{about.currentFocus}</p>
          <List items={about.sectors} />

          <p className="mt-8 text-foreground/85">Na prática, essa atuação significa:</p>
          <List items={about.inPractice} />
        </div>
      </div>

      <Separator className="my-12" />

      <h2 className="font-heading text-2xl text-foreground">Credenciais</h2>
      <List items={about.credentials} />

      <blockquote className="mt-12 border-l-2 border-primary pl-6">
        <p className="font-heading text-2xl text-primary">
          &ldquo;{about.quote.text}&rdquo;
        </p>
        <footer className="mt-3 text-sm text-muted-foreground">
          {about.quote.author}
        </footer>
      </blockquote>
    </article>
  );
}
