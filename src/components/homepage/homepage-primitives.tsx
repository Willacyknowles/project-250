import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReadingRoomImage } from "@/config/reading-room-assets";

type ActionLinkProps = {
  children: React.ReactNode;
  href: Route | `#${string}`;
  variant?: "primary" | "secondary" | "quiet";
};

export function MuseumAction({
  children,
  href,
  variant = "primary",
}: ActionLinkProps) {
  return (
    <Link className="home-action" data-variant={variant} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">-&gt;</span>
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  copy?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="home-section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <span>{copy}</span> : null}
    </header>
  );
}

export function MetadataList({
  items,
  variant = "dark",
}: {
  items: readonly (readonly [string, string])[];
  variant?: "dark" | "light";
}) {
  return (
    <dl className="home-metadata-list" data-variant={variant}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ArtifactCaption({
  label,
  children,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <figcaption className="home-artifact-caption">
      <span>{label}</span>
      <p>{children}</p>
    </figcaption>
  );
}

export function CollectionCard({
  actionLabel,
  category,
  description,
  href,
  image,
  meta,
  status,
  title,
}: {
  actionLabel: string;
  category: string;
  description: string;
  href?: string;
  image: ReadingRoomImage | null;
  meta: string;
  status: string;
  title: string;
}) {
  const content = (
    <>
      <div className="home-collection-card__image" data-empty={!image}>
        {image ? (
          <Image
            alt={image.alt}
            fill
            sizes="(max-width: 720px) 92vw, (max-width: 1180px) 45vw, 25vw"
            src={image.src}
          />
        ) : (
          <span>Photography Pending</span>
        )}
      </div>
      <div className="home-collection-card__body">
        <p>{category}</p>
        <h3>{title}</h3>
        <span>{meta}</span>
        <p>{description}</p>
        <div>
          <small>{status}</small>
          <strong>{actionLabel}</strong>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link className="home-collection-card" href={href as Route}>
        {content}
      </Link>
    );
  }

  return <article className="home-collection-card">{content}</article>;
}

export function ResearchFeature({
  body,
  eyebrow,
  image,
  title,
}: {
  body: string;
  eyebrow: string;
  image: ReadingRoomImage;
  title: string;
}) {
  return (
    <article className="home-research-feature">
      <div className="home-research-feature__image">
        <Image alt={image.alt} fill sizes="(max-width: 960px) 92vw, 31vw" src={image.src} />
      </div>
      <div>
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        <span>{body}</span>
      </div>
    </article>
  );
}
