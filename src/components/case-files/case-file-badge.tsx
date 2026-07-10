type CaseFileBadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "evidence" | "trust" | "warning";
};

const toneClasses = {
  evidence: "border-evidence/35 bg-cream text-evidence",
  neutral: "border-border bg-cream text-body",
  trust: "border-trust/35 bg-cream text-trust",
  warning: "border-warning/35 bg-cream text-warning",
} as const;

export function CaseFileBadge({
  children,
  tone = "neutral",
}: CaseFileBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
