type CaseFileSectionProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function CaseFileSection({
  title,
  eyebrow,
  children,
}: CaseFileSectionProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase text-evidence">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold text-foreground">{title}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
