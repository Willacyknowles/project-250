"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Route } from "next";

type MuseumDossierNavItem = {
  href: string;
  label: string;
  route?: boolean;
};

type MuseumDossierNavigationProps = {
  items: readonly MuseumDossierNavItem[];
};

export function MuseumDossierNavigation({ items }: MuseumDossierNavigationProps) {
  const sectionIds = useMemo(
    () =>
      items
        .filter((item) => !item.route && item.href.startsWith("#"))
        .map((item) => item.href.slice(1)),
    [items],
  );
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element != null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.4],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <nav
        aria-label="Museum dossier navigation"
        className="rounded-sm border border-brass/24 bg-black/45 p-4 shadow-[0_24px_70px_rgb(0_0_0_/_0.32)] backdrop-blur-md"
      >
        <div className="border-b border-brass/35 px-2 pb-4">
          <p className="museum-label-text text-brass">Gallery Directory</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <p className="font-serif text-2xl leading-none text-cream">
              Exhibition Path
            </p>
            <p className="text-xs font-semibold uppercase text-cream/58">{Math.round(progress)}%</p>
          </div>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-cream/16" aria-hidden="true">
            <div
              className="h-full bg-brass transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0">
          {items.map((item, index) => {
            const isActive = !item.route && item.href === `#${activeId}`;
            const className = `group whitespace-nowrap rounded-sm border border-transparent px-3 py-2 text-sm font-medium transition lg:whitespace-normal ${
              isActive
                ? "border-brass/35 bg-walnut text-cream shadow-sm"
                : "text-cream/68 hover:border-brass/30 hover:bg-cream/10 hover:text-cream"
            }`;
            const content = (
              <>
                <span className="mr-2 text-[0.62rem] uppercase opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </>
            );

            if (item.route) {
              return (
                <Link className={className} href={item.href as Route} key={item.label}>
                  {content}
                </Link>
              );
            }

            return (
              <a className={className} href={item.href} key={item.label}>
                {content}
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
