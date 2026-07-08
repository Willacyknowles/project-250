import type { PlatformModule } from "@/types/platform";

type ModuleListProps = {
  modules: readonly PlatformModule[];
};

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {modules.map((module) => (
        <article
          className="rounded-lg border border-border bg-surface p-5 shadow-sm"
          key={module.id}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">
                {module.layer}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {module.name}
              </h3>
            </div>
            <span className="rounded-full border border-trust/30 bg-trust/10 px-3 py-1 text-xs font-medium text-trust">
              {module.status}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-body">{module.purpose}</p>
          <ul className="mt-4 grid gap-2 text-sm text-body">
            {module.responsibilities.slice(0, 4).map((responsibility) => (
              <li className="flex gap-2" key={responsibility}>
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-evidence" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
