import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, Clapperboard, PlayCircle } from "lucide-react";
import { getPackBySlug } from "@/content/catalogue";
import { requireUser } from "@/lib/auth";
import { signedEmbedUrl } from "@/lib/bunny";
import { getOwnedPackIds } from "@/lib/orders";
import { getCompletedLessonIds } from "@/lib/progress";
import { CompleteToggle } from "@/components/complete-toggle";

export const metadata: Metadata = { title: "Formation", robots: { index: false } };

type Params = PageProps<"/mon-espace/[pack]/[lesson]">["params"];

export default function LessonPage({ params }: PageProps<"/mon-espace/[pack]/[lesson]">) {
  return (
    <section className="container-page py-8 sm:py-12">
      <Suspense fallback={<div className="aspect-video w-full animate-pulse rounded-3xl bg-surface-2/60" />}>
        <Lesson params={params} />
      </Suspense>
    </section>
  );
}

async function Lesson({ params }: { params: Params }) {
  const { pack: packSlug, lesson: lessonId } = await params;
  const pack = getPackBySlug(packSlug);
  const index = pack?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  if (!pack || index < 0) notFound();

  const user = await requireUser(`/mon-espace/${packSlug}/${lessonId}`);
  const [owned, completed] = await Promise.all([getOwnedPackIds(user.id), getCompletedLessonIds(user.id)]);
  if (!owned.has(pack.id)) redirect(`/formations/${pack.slug}`);

  const lesson = pack.lessons[index];
  const prev = pack.lessons[index - 1];
  const next = pack.lessons[index + 1];
  const embed = signedEmbedUrl(lesson.bunnyVideoId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-6">
        <Link href="/mon-espace" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
          <ArrowLeft className="size-4" aria-hidden /> Mon espace
        </Link>
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-black">
          {embed ? (
            <iframe
              src={embed}
              title={lesson.title}
              loading="lazy"
              className="absolute inset-0 size-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div className="space-y-3">
                <Clapperboard className="mx-auto size-10 text-brand-300" aria-hidden />
                <p className="font-display font-semibold">Vidéo bientôt disponible</p>
                <p className="text-sm text-muted">Elle apparaîtra ici automatiquement dès sa mise en ligne.</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-300">
              Pack {pack.number} · Vidéo {index + 1}/{pack.lessons.length}
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{lesson.title}</h1>
            <p className="mt-2 text-muted">{lesson.summary}</p>
          </div>
          <CompleteToggle lessonId={lesson.id} completed={completed.has(lesson.id)} />
        </div>
        <div className="flex justify-between gap-3 border-t border-line pt-6">
          {prev ? (
            <Link href={`/mon-espace/${pack.slug}/${prev.id}`} className="btn-secondary !py-2.5 text-sm">
              <ArrowLeft className="size-4" aria-hidden /> Précédente
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/mon-espace/${pack.slug}/${next.id}`} className="btn-primary !py-2.5 text-sm">
              Suivante <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      <aside className="card h-fit overflow-hidden lg:sticky lg:top-24">
        <div className="border-b border-line px-5 py-4">
          <p className="text-xs font-semibold tracking-wide text-brand-300 uppercase">Pack {pack.number}</p>
          <p className="font-display font-bold">{pack.title}</p>
        </div>
        <ol className="divide-y divide-line">
          {pack.lessons.map((l, i) => {
            const active = l.id === lesson.id;
            return (
              <li key={l.id}>
                <Link
                  href={`/mon-espace/${pack.slug}/${l.id}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-5 py-4 text-sm transition ${active ? "bg-brand-400/10" : "hover:bg-surface-2"}`}
                >
                  {completed.has(l.id) ? (
                    <CircleCheck className="size-5 shrink-0 text-brand-300" aria-label="Terminée" />
                  ) : (
                    <PlayCircle className={`size-5 shrink-0 ${active ? "text-brand-300" : "text-muted"}`} aria-hidden />
                  )}
                  <span className={active ? "font-semibold" : ""}>
                    {i + 1}. {l.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
