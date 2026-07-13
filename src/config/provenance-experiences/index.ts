import { bible1630ProvenanceExperience } from "./bible-1630";

export const provenanceExperiences = [bible1630ProvenanceExperience] as const;

export function getProvenanceExperience(slug: string) {
  return provenanceExperiences.find((experience) => experience.slug === slug);
}
