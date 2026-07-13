import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProvenanceExperienceShell } from "@/components/provenance-experience/provenance-experience-shell";
import {
  getProvenanceExperience,
  provenanceExperiences,
} from "@/config/provenance-experiences";

type ProvenancePageProps = {
  params: Promise<{
    experienceSlug: string;
  }>;
};

export function generateStaticParams() {
  return provenanceExperiences.map((experience) => ({
    experienceSlug: experience.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProvenancePageProps): Promise<Metadata> {
  const { experienceSlug } = await params;
  const experience = getProvenanceExperience(experienceSlug);

  if (!experience) {
    return {};
  }

  return {
    title: `${experience.title} | The Knowles Collection`,
    description: experience.statusDescription,
    robots: experience.developmentOnly
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export default async function ProvenanceExperiencePage({
  params,
}: ProvenancePageProps) {
  const { experienceSlug } = await params;
  const experience = getProvenanceExperience(experienceSlug);

  if (!experience) {
    notFound();
  }

  return <ProvenanceExperienceShell experience={experience} />;
}
