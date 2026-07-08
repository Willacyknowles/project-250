type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-background p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{description}</p>
    </div>
  );
}
