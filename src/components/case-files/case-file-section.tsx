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
    <section className="scroll-mt-6" id={id}>
      <div className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-evidence">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold text-foreground">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
