import type { ArchiveMedia } from "@/types/evidence";

const requiresResearch = "Requires Research" as const;
const unknown = "unknown" as const;

function archiveMediaRecord({
  evidenceId,
  title,
}: {
  evidenceId: string;
  title: string;
}): ArchiveMedia {
  return {
    id: `${evidenceId}-archive-placeholder`,
    title: `${title} Documentation`,
    mediaType: "placeholder",
    caption: `Image documentation for ${title} is in progress.`,
    status: requiresResearch,
    confidence: unknown,
    altText: `Image documentation pending for ${title}.`,
    placeholderState: requiresResearch,
    notes:
      "Photography, creator details, and capture date are pending catalogue review.",
    relatedEvidenceId: evidenceId,
  };
}

export const archiveMediaItems: readonly ArchiveMedia[] = [
  archiveMediaRecord({ evidenceId: "title-page", title: "Title Page" }),
  archiveMediaRecord({
    evidenceId: "sidgwick-inscription",
    title: "Sidgwick Inscription",
  }),
  archiveMediaRecord({ evidenceId: "barker-imprint", title: "Barker Imprint" }),
  archiveMediaRecord({ evidenceId: "binding", title: "Binding" }),
  archiveMediaRecord({ evidenceId: "marginal-notes", title: "Marginal Notes" }),
  archiveMediaRecord({ evidenceId: "printers-device", title: "Printer's Device" }),
  archiveMediaRecord({ evidenceId: "genealogies", title: "Genealogies" }),
  archiveMediaRecord({ evidenceId: "maps", title: "Maps" }),
  archiveMediaRecord({ evidenceId: "colophon", title: "Colophon" }),
];
