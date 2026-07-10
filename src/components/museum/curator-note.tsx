import { MuseumLabel } from "@/components/museum/museum-label";

type CuratorNoteProps = {
  children: React.ReactNode;
  label?: string;
};

export function CuratorNote({ children, label = "Curator Note" }: CuratorNoteProps) {
  return (
    <aside className="museum-paper-deep rounded-sm border-l-2 border-l-brass p-5">
      <MuseumLabel tone="brass">{label}</MuseumLabel>
      <div className="mt-4 font-serif text-xl leading-8 text-foreground">
        {children}
      </div>
    </aside>
  );
}
