import { MuseumLabel } from "@/components/museum/museum-label";

type AccessionCardProps = {
  accessionNumber: string;
  collection: string;
  status: string;
};

export function AccessionCard({ accessionNumber, collection, status }: AccessionCardProps) {
  return (
    <dl className="museum-paper-deep grid gap-4 rounded-sm p-5 text-sm sm:grid-cols-3">
      <div>
        <MuseumLabel>Accession</MuseumLabel>
        <dd className="mt-2 font-semibold text-foreground">{accessionNumber}</dd>
      </div>
      <div>
        <MuseumLabel>Collection</MuseumLabel>
        <dd className="mt-2 font-semibold text-foreground">{collection}</dd>
      </div>
      <div>
        <MuseumLabel>Status</MuseumLabel>
        <dd className="mt-2 font-semibold text-foreground">{status}</dd>
      </div>
    </dl>
  );
}
