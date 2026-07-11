type CaseFileSectionProps = {
  children: React.ReactNode;
  id: string;
  eyebrow?: string;
  title: string;
};

export function CaseFileSection({
  children,
  eyebrow,
  id,
  title,
}: CaseFileSectionProps) {
  return (
    <section
      className="museum-fade-in relative scroll-mt-28 border-t border-brass/25 py-24 first:border-t-0 first:pt-0 lg:py-32"
      id={id}
    >
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:items-end">
        {eyebrow ? (
          <p className="museum-label-text text-brass">{eyebrow}</p>
        ) : null}
        <h2 className="max-w-4xl font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <div className="museum-gallery-surface rounded-sm p-7 sm:p-9 lg:p-12">
        {children}
      </div>
    </section>
  );
}
