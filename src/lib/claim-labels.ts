import type { ClaimType } from "@/types/claim";

const claimTypeLabels: Record<ClaimType, string> = {
  "binding-assessment": "Binding Assessment",
  "edition-identification": "Edition Identification",
  "genealogical-relevance": "Genealogical Relevance",
  inscription: "Inscription",
  "marginalia-annotations": "Marginalia / Annotations",
  "physical-completeness": "Physical Completeness",
  "printer-imprint": "Printer / Imprint",
  "provenance-chain": "Provenance Chain",
  "publication-date": "Publication Date",
};

export function formatClaimType(claimType: ClaimType) {
  return claimTypeLabels[claimType];
}
