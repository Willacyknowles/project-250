type CollectionBadgeProps = {
  children: React.ReactNode;
};

export function CollectionBadge({ children }: CollectionBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-brass/45 bg-cream px-4 py-1.5 text-xs font-semibold uppercase text-evidence shadow-sm">
      {children}
    </span>
  );
}
