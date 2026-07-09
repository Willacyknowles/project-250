import type { ArchiveMedia } from "@/types/evidence";

const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

function archivePlaceholder({
  evidenceId,
  title,
}: {
  evidenceId: string;
  title: string;
}): ArchiveMedia {
  return {
    id: `${evidenceId}-archive-placeholder`,
    title: `${title} Archive Placeholder`,
    mediaType: "placeholder",
    caption: `Requires Research. Placeholder archive media record for ${title}.`,
    status: requiresResearch,
    confidence: unknown,
    altText: `Requires Research: placeholder for ${title} archive media.`,
    placeholderState: requiresResearch,
    notes:
      "Requires Research. No image, scan, document, photographer, creator, or capture date has been verified for this archive media record.",
    relatedEvidenceId: evidenceId,
  };
}

export const archiveMediaItems: readonly ArchiveMedia[] = [
  archivePlaceholder({ evidenceId: "title-page", title: "Title Page" }),
  archivePlaceholder({
    evidenceId: "sidgwick-inscription",
    title: "Sidgwick Inscription",
  }),
  archivePlaceholder({ evidenceId: "barker-imprint", title: "Barker Imprint" }),
  archivePlaceholder({ evidenceId: "binding", title: "Binding" }),
  archivePlaceholder({ evidenceId: "marginal-notes", title: "Marginal Notes" }),
  archivePlaceholder({ evidenceId: "printers-device", title: "Printer's Device" }),
  archivePlaceholder({ evidenceId: "genealogies", title: "Genealogies" }),
  archivePlaceholder({ evidenceId: "maps", title: "Maps" }),
  archivePlaceholder({ evidenceId: "colophon", title: "Colophon" }),
];
