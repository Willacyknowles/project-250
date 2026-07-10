type MuseumSealProps = {
  caseNumber: string;
  collection: string;
  platform: string;
  status: string;
};

export function MuseumSeal({
  caseNumber,
  collection,
  platform,
  status,
}: MuseumSealProps) {
  return (
    <div
      aria-label={`${collection} museum seal for case file ${caseNumber}`}
      className="relative flex size-36 shrink-0 items-center justify-center rounded-full border border-brass/45 bg-cream/10 p-3 text-center shadow-[0_24px_70px_rgb(0_0_0_/_0.24)] backdrop-blur-sm sm:size-44"
    >
      <div className="absolute inset-2 rounded-full border border-cream/16" aria-hidden="true" />
      <div className="absolute inset-5 rounded-full border border-brass/30" aria-hidden="true" />
      <div>
        <p className="text-[0.62rem] font-semibold uppercase text-brass sm:text-xs">
          {collection}
        </p>
        <p className="mt-3 font-serif text-4xl leading-none text-cream sm:text-5xl">
          TKC
        </p>
        <p className="mt-3 text-[0.62rem] font-semibold uppercase text-cream/62 sm:text-xs">
          {platform}
        </p>
        <p className="mt-1 text-[0.62rem] font-semibold uppercase text-cream/62 sm:text-xs">
          {status}
        </p>
      </div>
    </div>
  );
}