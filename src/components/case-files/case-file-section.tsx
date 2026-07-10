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
    <section className="museum-fade-in scroll-mt-24 border-t border-brass/35 py-12 first:border-t-0 first:pt-0" id={id}>
      <div className="mb-8 max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase text-evidence">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      <div className="museum-paper rounded-sm p-6 sm:p-8">{children}</div>
    </section>
  );
}
