import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CircleCheck, Lock, LogOut, PlayCircle, Settings } from "lucide-react";
import { bundle, packs } from "@/content/catalogue";
import { isAdmin, requireUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { getOwnedPackIds } from "@/lib/orders";
import { getCompletedLessonIds } from "@/lib/progress";
import { signOut } from "@/app/actions/auth";

export const metadata: Metadata = { title: "Mon espace", robots: { index: false } };

export default function MonEspacePage() {
  return (
    <section className="container-page py-12 sm:py-16">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy>
      <div className="h-10 w-64 animate-pulse rounded-xl bg-surface-2" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-3xl bg-surface-2/60" />
        ))}
      </div>
    </div>
  );
}

async function Dashboard() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <h1 className="font-display text-2xl font-bold">Espace élève bientôt disponible</h1>
        <p className="mt-3 text-muted">La connexion des élèves sera activée dès la mise en ligne des formations.</p>
        <Link href="/formations" className="btn-primary mt-6">
          Voir les formations
        </Link>
      </div>
    );
  }

  const user = await requireUser("/mon-espace");
  const [owned, completed] = await Promise.all([getOwnedPackIds(user.id), getCompletedLessonIds(user.id)]);
  const ownsAll = packs.every((p) => owned.has(p.id));

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Mon espace élève</p>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Salut {user.name} 👋</h1>
        </div>
        <div className="flex gap-2">
          {isAdmin(user) && (
            <Link href="/admin" className="btn-secondary !py-2 text-sm">
              <Settings className="size-4" aria-hidden /> Admin
            </Link>
          )}
          <form action={signOut}>
            <button className="btn-secondary !py-2 text-sm">
              <LogOut className="size-4" aria-hidden /> Déconnexion
            </button>
          </form>
        </div>
      </header>

      {owned.size === 0 && (
        <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Tu n&apos;as pas encore de formation. Commence par le pack de ton choix, ou prends les 16 vidéos.</p>
          <Link href="/formations" className="btn-primary shrink-0">
            Choisir une formation <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packs.map((p) => {
          const has = owned.has(p.id);
          const done = p.lessons.filter((l) => completed.has(l.id)).length;
          const next = p.lessons.find((l) => !completed.has(l.id)) ?? p.lessons[0];
          const pct = Math.round((done / p.lessons.length) * 100);
          return (
            <article key={p.id} className={`card flex flex-col p-6 ${has ? "" : "opacity-80"}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-extrabold text-gradient">0{p.number}</span>
                {has ? (
                  done === p.lessons.length ? (
                    <CircleCheck className="size-6 text-brand-300" aria-label="Terminé" />
                  ) : (
                    <PlayCircle className="size-6 text-brand-300" aria-hidden />
                  )
                ) : (
                  <Lock className="size-5 text-muted" aria-label="Verrouillé" />
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{p.title}</h2>
              {has ? (
                <>
                  <div className="mt-4 space-y-1.5">
                    <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted">
                      {done}/{p.lessons.length} vidéos terminées
                    </p>
                  </div>
                  <Link href={`/mon-espace/${p.slug}/${next.id}`} className="btn-primary mt-auto justify-center !py-2.5 text-sm">
                    {done === 0 ? "Commencer" : done === p.lessons.length ? "Revoir" : "Continuer"}
                  </Link>
                </>
              ) : (
                <Link href={`/formations/${p.slug}`} className="btn-secondary mt-auto justify-center !py-2.5 text-sm">
                  Débloquer ce pack
                </Link>
              )}
            </article>
          );
        })}
      </div>

      {!ownsAll && owned.size > 0 && (
        <Link href={`/formations/${bundle.slug}`} className="block rounded-3xl border border-brand-400/30 bg-brand-400/5 p-5 text-sm transition hover:bg-brand-400/10">
          Envie d&apos;aller plus loin ? <span className="font-semibold text-brand-300">Découvre le pack complet des 16 vidéos →</span>
        </Link>
      )}
    </div>
  );
}
