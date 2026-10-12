import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="container-page max-w-3xl py-16">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">{title}</h1>
      <div className="mt-10 space-y-8 leading-relaxed text-text/85 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </article>
  );
}
