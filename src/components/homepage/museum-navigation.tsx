"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { homepageContent } from "@/config/homepage-content";

export function MuseumNavigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <>
      <header className="museum-top-nav" data-scrolled={hasScrolled}>
        <Link className="museum-wordmark" href="#opening">
          The Knowles Collection
        </Link>
        <nav aria-label="Primary navigation" className="museum-desktop-nav">
          {homepageContent.navigation.map((item) => (
            <Link key={item.href} href={item.href as Route | `#${string}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="museum-nav-action" href="#access">
          Request Access
        </Link>
        <button
          aria-controls="mobile-museum-menu"
          aria-expanded={menuOpen}
          className="museum-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div className="museum-mobile-menu" data-open={menuOpen} id="mobile-museum-menu">
        <nav aria-label="Mobile navigation">
          {homepageContent.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route | `#${string}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav aria-label="Mobile section navigation" className="museum-bottom-nav">
        {homepageContent.mobileNavigation.map((item) => (
          <Link key={item.href} href={item.href as Route | `#${string}`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
