import Image from "next/image";
import type { ProvenanceExperience } from "@/types/provenance-experience";

type ArtifactStageProps = {
  experience: ProvenanceExperience;
};

export function ArtifactStage({ experience }: ArtifactStageProps) {
  return (
    <div className="provenance-artifact-stage" aria-label="Artifact stage">
      <div className="provenance-artifact-stage__light" aria-hidden="true" />
      {experience.entryImage ? (
        <figure className="provenance-artifact-stage__image">
          <Image
            alt={experience.entryImage.alt}
            fill
            priority
            sizes="(max-width: 900px) 80vw, 42vw"
            src={experience.entryImage.src}
          />
          <figcaption>{experience.entryImage.label}</figcaption>
        </figure>
      ) : (
        <div className="provenance-artifact-stage__pending" role="img" aria-label="Artifact photography is required before the 1630 Bible can be shown.">
          <div aria-hidden="true" />
          <p>Artifact photography required</p>
          <span>
            The actual 1630 Bible must be documented before this stage can show
            the object.
          </span>
        </div>
      )}
    </div>
  );
}
