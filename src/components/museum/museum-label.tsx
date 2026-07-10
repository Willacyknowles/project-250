type MuseumLabelProps = {
  children: React.ReactNode;
  tone?: "muted" | "brass" | "walnut";
};

const toneClasses = {
  brass: "text-evidence",
  muted: "text-muted",
  walnut: "text-foreground",
} as const;

export function MuseumLabel({ children, tone = "muted" }: MuseumLabelProps) {
  return (
    <p className={`museum-label-text ${toneClasses[tone]}`}>{children}</p>
  );
}
