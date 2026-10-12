import { Suspense, type ReactNode } from "react";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="container-page relative grid min-h-[70vh] place-items-center py-12">
        <div className="card w-full max-w-md p-6 sm:p-8">
          <h1 className="font-display text-3xl font-extrabold">{title}</h1>
          <p className="mt-2 mb-8 text-muted">{subtitle}</p>
          <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-surface-2/50" />}>{children}</Suspense>
        </div>
      </div>
    </section>
  );
}
