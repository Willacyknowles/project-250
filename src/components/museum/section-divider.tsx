import { MuseumLabel } from "@/components/museum/museum-label";

type SectionDividerProps = {
  label?: string;
};

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-brass/40" />
      {label ? <MuseumLabel tone="brass">{label}</MuseumLabel> : null}
      <div className="h-px flex-1 bg-brass/40" />
    </div>
  );
}
