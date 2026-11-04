import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Infinity as InfinityIcon, PlayCircle, Smartphone, Sparkles, Users, Zap } from "lucide-react";
import { formatFCFA, getSpecialBySlug, specials } from "@/content/catalogue";
import { BuyButton } from "@/components/buy-button";
import { PaymentMethods } from "@/components/payment-methods";
import { Reveal } from "@/components/reveal";
import { NotifyButton } from "@/components/ui";

export function generateStaticParams() {
  return specials.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/formations/speciales/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const special = getSpecialBySlug(slug);
  return special ? { title: special.title, description: special.subtitle } : {};
}

const perks = [
  { icon: Zap, text: "Accès immédiat après paiement" },
  { icon: InfinityIcon, text: "Accès à vie, revois autant que tu veux" },
  { icon: Smartphone, text: "Sur téléphone et ordinateur" },
];

export default async function SpecialPage({ params }: PageProps<"/formations/speciales/[slug]">) {
  const { slug } = await params;
  const special = getSpecialBySlug(slug);
  if (!special) notFound();

  const buy = special.available ? (
    <BuyButton productId={special.id} returnTo={`/formations/speciales/${special.slug}`} label="Acheter maintenant" />
  ) : (
    <NotifyButton subject={`la formation « ${special.title} »`} />
  );

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="container-page relative py-10 sm:py-16">
        <Link href="/formations" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-text">
          <ArrowLeft className="size-4" aria-hidden /> Toutes les formations
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-10">
            <header className="space-y-5">
              <p className="eyebrow">
                <Sparkles className="size-3.5" aria-hidden /> {special.badge}
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{special.title}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">{special.description}</p>
              <div className="flex flex-wrap gap-2">
                {special.tools.map((t) => (
                  <span key={t} className="rounded-full bg-brand-400/10 px-3 py-1 text-sm font-semibold text-brand-200 ring-1 ring-brand-400/25">
                    {t}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-sm text-muted">
                  <Clock className="size-4 text-brand-400" aria-hidden /> Vidéo de {special.duration}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface/70 p-4 lg:hidden">
                <p className="font-display text-2xl font-extrabold text-gradient">{formatFCFA(special.price)}</p>
                <a href="#acheter" className="btn-primary !py-2.5 text-sm">
                  {special.available ? "Acheter" : "Bientôt"}
                </a>
              </div>
            </header>

            <Reveal className="card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">Ce que tu vas apprendre</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {special.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-400/15">
                      <Check className="size-4 text-brand-300" aria-hidden />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="card p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                <Users className="size-5 text-brand-300" aria-hidden /> Pour qui ?
              </h2>
              <ul className="mt-5 space-y-3">
                {special.audience.map((a) => (
                  <li key={a} className="flex gap-3 text-text/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden /> {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="card overflow-hidden">
              <h2 className="border-b border-line px-6 py-4 font-display text-xl font-bold">Contenu</h2>
              <ol className="divide-y divide-line">
                {special.lessons.map((l) => (
                  <li key={l.id} className="flex items-center gap-4 px-6 py-4">
                    <PlayCircle className="size-6 shrink-0 text-brand-300" aria-hidden />
                    <div className="flex-1">
                      <p className="font-semibold">{l.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{l.summary}</p>
                    </div>
                    <span className="text-sm text-muted">{l.duration}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside id="acheter" className="scroll-mt-20 lg:sticky lg:top-24">
            <div className="card space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-sm text-muted">Prix</p>
                <p className="font-display text-4xl font-extrabold text-gradient">{formatFCFA(special.price)}</p>
              </div>
              {buy}
              <ul className="space-y-3 border-t border-line pt-6 text-sm">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-text/85">
                    <Icon className="size-4 text-brand-400" aria-hidden /> {text}
                  </li>
                ))}
              </ul>
              <PaymentMethods compact />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
