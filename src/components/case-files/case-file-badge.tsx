type CaseFileBadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "evidence" | "trust" | "warning";
};

const toneClasses = {
  evidence: "border-evidence/30 bg-evidence/10 text-evidence",
  neutral: "border-border bg-surface text-body",
  trust: "border-trust/30 bg-trust/10 text-trust",
  warning: "border-warning/30 bg-warning/10 text-warning",
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
