"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="grid size-11 place-items-center rounded-full border border-line text-text transition active:scale-95"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {/* Rendu dans <body> : le flou de l'en-tête piégerait sinon le panneau « fixed » */}
      {open &&
        createPortal(
          <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-ink/98 backdrop-blur-xl md:hidden">
            <nav aria-label="Menu mobile" className="container-page flex flex-col gap-1 py-6">
              {[...nav, { href: "/mon-espace", label: "Mon espace" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-text transition active:bg-surface-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/formations" onClick={() => setOpen(false)} className="btn-primary mt-6 justify-center text-base">
                Découvrir les formations
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
