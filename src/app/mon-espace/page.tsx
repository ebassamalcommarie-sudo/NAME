import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CircleCheck, Lock, LogOut, PlayCircle, Settings, Sparkles } from "lucide-react";
import { PACKS_AVAILABLE, bundle, getCourseBySlug, packs, specials, type Course } from "@/content/catalogue";
import { isAdmin, requireUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { getOwnedCourseIds } from "@/lib/orders";
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
  const [owned, completed] = await Promise.all([getOwnedCourseIds(user.id), getCompletedLessonIds(user.id)]);
  const ownsAllPacks = packs.every((p) => owned.has(p.id));
  const visibleSpecials = specials.filter((sp) => sp.available || owned.has(sp.id));

  return (
    <div className="space-y-12">
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
          <p>Tu n&apos;as pas encore de formation. Commence par la formation du mois !</p>
          <Link href="/formations" className="btn-primary shrink-0">
            Choisir une formation <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}

      {visibleSpecials.length > 0 && (
        <section className="space-y-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Sparkles className="size-5 text-brand-300" aria-hidden /> Formations spéciales
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSpecials.map((sp) => (
              <CourseCard
                key={sp.id}
                course={getCourseBySlug(sp.slug)!}
                owned={owned.has(sp.id)}
                completed={completed}
                mark={<Sparkles className="size-8 text-brand-300" aria-hidden />}
                lockedLabel="Débloquer"
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold">
          Programme complet {!PACKS_AVAILABLE && <span className="ml-2 align-middle text-xs font-semibold text-mtn">Bientôt disponible</span>}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((p) => (
            <CourseCard
              key={p.id}
              course={getCourseBySlug(p.slug)!}
              owned={owned.has(p.id)}
              completed={completed}
              mark={<span className="font-display text-4xl font-extrabold text-gradient">0{p.number}</span>}
              lockedLabel={PACKS_AVAILABLE ? "Débloquer ce pack" : "Bientôt disponible"}
            />
          ))}
        </div>
      </section>

      {PACKS_AVAILABLE && !ownsAllPacks && owned.size > 0 && (
        <Link href={`/formations/${bundle.slug}`} className="block rounded-3xl border border-brand-400/30 bg-brand-400/5 p-5 text-sm transition hover:bg-brand-400/10">
          Envie d&apos;aller plus loin ? <span className="font-semibold text-brand-300">Découvre le pack complet des 16 vidéos →</span>
        </Link>
      )}
    </div>
  );
}

function CourseCard({
  course,
  owned,
  completed,
  mark,
  lockedLabel,
}: {
  course: Course;
  owned: boolean;
  completed: Set<string>;
  mark: React.ReactNode;
  lockedLabel: string;
}) {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) => completed.has(l.id)).length;
  const next = course.lessons.find((l) => !completed.has(l.id)) ?? course.lessons[0];
  const pct = Math.round((done / total) * 100);
  return (
    <article className={`card flex flex-col p-6 ${owned ? "" : "opacity-80"}`}>
      <div className="flex items-center justify-between">
        {mark}
        {owned ? (
          done === total ? (
            <CircleCheck className="size-6 text-brand-300" aria-label="Terminé" />
          ) : (
            <PlayCircle className="size-6 text-brand-300" aria-hidden />
          )
        ) : (
          <Lock className="size-5 text-muted" aria-label="Verrouillé" />
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{course.title}</h3>
      {owned ? (
        <>
          <div className="mt-4 mb-5 space-y-1.5">
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-muted">
              {done}/{total} {total > 1 ? "vidéos terminées" : "vidéo terminée"}
            </p>
          </div>
          <Link href={`/mon-espace/${course.slug}/${next.id}`} className="btn-primary mt-auto justify-center !py-2.5 text-sm">
            {done === 0 ? "Commencer" : done === total ? "Revoir" : "Continuer"}
          </Link>
        </>
      ) : (
        <Link href={course.salesHref} className="btn-secondary mt-auto justify-center !py-2.5 text-sm">
          {lockedLabel}
        </Link>
      )}
    </article>
  );
}
