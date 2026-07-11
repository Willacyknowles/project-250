import { MuseumLabel } from "@/components/museum/museum-label";

type ArchivalCardProps = {
  actions?: React.ReactNode;
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
};

export function ArchivalCard({ actions, children, eyebrow, title }: ArchivalCardProps) {
  return (
    <article className="museum-drawer museum-hover-lift museum-paper-unfold overflow-hidden rounded-sm p-6 sm:p-8">
      <div className="mb-6 h-1 w-24 bg-brass/70" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border pb-5">
        <div className="max-w-2xl">
          {eyebrow ? <MuseumLabel tone="brass">{eyebrow}</MuseumLabel> : null}
          <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
            {title}
          </h3>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </article>
  );
}
