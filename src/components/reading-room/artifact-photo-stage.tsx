"use client";

import Image from "next/image";
import { readingRoomImages } from "@/config/reading-room-assets";

type ArtifactPhotoStageProps = {
  isOpening: boolean;
};

export function ArtifactPhotoStage({ isOpening }: ArtifactPhotoStageProps) {
  return (
    <figure className="reading-room-artifact" data-opening={isOpening}>
      <div className="reading-room-artifact__case">
        <div className="reading-room-artifact__glow" aria-hidden="true" />
        <div className="reading-room-artifact__main">
          <Image
            alt={readingRoomImages.primary.alt}
            className="reading-room-artifact__image"
            height={readingRoomImages.primary.height}
            priority
            sizes="(max-width: 980px) 82vw, 44vw"
            src={readingRoomImages.primary.src}
            width={readingRoomImages.primary.width}
          />
        </div>
        <div className="reading-room-artifact__glass" aria-hidden="true" />
        <div className="reading-room-artifact__shadow" aria-hidden="true" />
      </div>

      <figcaption className="reading-room-artifact__caption">
        <span>{readingRoomImages.primary.label}</span>
        <span>The object is presented as received for visual examination.</span>
      </figcaption>

      <div className="reading-room-artifact__details" aria-label="Object views">
        {readingRoomImages.supporting.map((image) => (
          <div className="reading-room-detail" key={image.src}>
            <Image
              alt={image.alt}
              className="reading-room-detail__image"
              fill
              sizes="(max-width: 980px) 28vw, 8rem"
              src={image.src}
            />
            <span>{image.label}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
