import { MuseumLabel } from "@/components/museum/museum-label";

type GallerySurfaceProps = {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
};

export function GallerySurface({ children, eyebrow, title }: GallerySurfaceProps) {
  return (
    <section className="museum-gallery-surface museum-paper-unfold rounded-sm p-7 sm:p-9 lg:p-11">
      {eyebrow || title ? (
        <div className="mb-8 max-w-4xl border-b border-brass/30 pb-6">
          {eyebrow ? <MuseumLabel tone="brass">{eyebrow}</MuseumLabel> : null}
          {title ? (
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}