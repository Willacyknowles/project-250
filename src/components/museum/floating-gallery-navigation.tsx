"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Route } from "next";

type GalleryNavItem = {
  href: string;
  label: string;
  route?: boolean;
};

type FloatingGalleryNavigationProps = {
  next?: GalleryNavItem;
  previous?: GalleryNavItem;
  returnItem: GalleryNavItem;
};

function GalleryLink({ item, prefix }: { item: GalleryNavItem; prefix: string }) {
  const className = "group rounded-sm border border-transparent px-3 py-2 text-left transition hover:border-brass/40 hover:bg-cream/10 focus-visible:bg-cream/10";
  const content = (
    <>
      <span className="block text-[0.64rem] font-semibold uppercase text-brass">
        {prefix}
      </span>
      <span className="mt-1 block font-serif text-sm leading-tight text-cream group-hover:text-brass">
        {item.label}
      </span>
    </>
  );

  if (item.route) {
    return (
      <Link className={className} href={item.href as Route}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={item.href}>
      {content}
    </a>
  );
}

export function FloatingGalleryNavigation({
  next,
  previous,
  returnItem,
}: FloatingGalleryNavigationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <nav
      aria-label="Floating exhibition navigation"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-sm border border-brass/30 bg-black/72 p-3 shadow-[0_22px_70px_rgb(0_0_0_/_0.42)] backdrop-blur-md sm:inset-x-auto sm:right-5 sm:max-w-sm"
    >
      <div className="flex items-center justify-between gap-4 px-2">
        <p className="text-[0.64rem] font-semibold uppercase text-cream/58">
          Exhibition Progress
        </p>
        <p className="text-[0.64rem] font-semibold uppercase text-brass">
          {Math.round(progress)}%
        </p>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-cream/16" aria-hidden="true">
        <div
          className="h-full bg-brass transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {previous ? <GalleryLink item={previous} prefix="Previous" /> : <span />}
        <GalleryLink item={returnItem} prefix="Return" />
        {next ? <GalleryLink item={next} prefix="Next" /> : <span />}
      </div>
    </nav>
  );
}
