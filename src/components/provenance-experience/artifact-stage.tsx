import Image from "next/image";
import type { ProvenanceExperience } from "@/types/provenance-experience";

type ArtifactStageProps = {
  experience: ProvenanceExperience;
  onBegin: () => void;
  started: boolean;
};

export function ArtifactStage({ experience, onBegin, started }: ArtifactStageProps) {
  return (
    <div className="provenance-artifact-stage" aria-label="Artifact stage">
      <div className="provenance-artifact-stage__light" aria-hidden="true" />
      {experience.entryImage ? (
        <button
          aria-label={`Begin examining ${experience.objectTitle}`}
          className="provenance-artifact-stage__button"
          data-started={started}
          onClick={onBegin}
          type="button"
        >
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
        </button>
      ) : (
        <div
          className="provenance-artifact-stage__pending"
          role="img"
          aria-label="Object image under curatorial review."
        >
          <div aria-hidden="true" />
          <p>Image under review</p>
          <span>
            The object view will appear here once its public photograph is
            connected to the exhibition record.
          </span>
        </div>
      )}
    </div>
  );
}
