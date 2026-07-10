import type { Route } from "next";
import { knowlesCollection } from "@/collections";
import { ModuleList } from "@/components/foundation/module-list";
import { MuseumButton } from "@/components/museum/museum-button";
import { siteConfig } from "@/config/site";
import { getReusablePlatformModules } from "@/lib/platform";

const operatingStandards = [
  "Evidence before assumption",
  "Generic systems before collection-specific logic",
  "Version everything",
  "Humans remain responsible",
] as const;

export default function Home() {
  const modules = getReusablePlatformModules();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-accent">
              {siteConfig.company}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
              {siteConfig.platformName}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-body">
              A production foundation for a modular, AI-assisted historical
              investigation platform. The public flagship is{" "}
              {siteConfig.publicProduct}.
            </p>
            <div className="mt-6">
              <MuseumButton href={"/case-files" as Route}>Enter Case Files</MuseumButton>
            </div>
          </div>

          <aside className="rounded-lg border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase text-muted">
              Flagship collection
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">
              {knowlesCollection.publicName}
            </p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-medium text-muted">Owner</dt>
                <dd className="text-body">{knowlesCollection.owner}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted">Platform role</dt>
                <dd className="text-body">{knowlesCollection.role}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-evidence">
              Foundation modules
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Platform capabilities before public features
            </h2>
          </div>
          <p className="text-sm text-muted">{modules.length} modules defined</p>
        </div>
        <ModuleList modules={modules} />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground">
            Operating standard
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-2 lg:grid-cols-4">
            {operatingStandards.map((standard) => (
              <li className="rounded-lg border border-border p-4" key={standard}>
                {standard}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}