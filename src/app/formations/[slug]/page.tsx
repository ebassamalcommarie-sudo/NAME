import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Infinity as InfinityIcon, PlayCircle, Smartphone, Zap } from "lucide-react";
import { BUNDLE_PRICE, BUNDLE_SAVINGS, PACK_PRICE, bundle, formatFCFA, getPackBySlug, packs } from "@/content/catalogue";
import { BuyButton } from "@/components/buy-button";
import { PaymentMethods } from "@/components/payment-methods";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return [...packs.map((p) => ({ slug: p.slug })), { slug: bundle.slug }];
}

export async function generateMetadata({ params }: PageProps<"/formations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug === bundle.slug) return { title: bundle.title, description: bundle.description };
  const pack = getPackBySlug(slug);
  return pack ? { title: `Pack ${pack.number} — ${pack.title}`, description: pack.description } : {};
}

const perks = [
  { icon: Zap, text: "Accès immédiat après paiement" },
  { icon: InfinityIcon, text: "Accès à vie, revois autant que tu veux" },
  { icon: Smartphone, text: "Sur téléphone et ordinateur" },
];

export default async function PackPage({ params }: PageProps<"/formations/[slug]">) {
  const { slug } = await params;
  const isBundle = slug === bundle.slug;
  const pack = isBundle ? null : getPackBySlug(slug);
  if (!isBundle && !pack) notFound();

  const title = isBundle ? bundle.title : `Pack ${pack!.number} — ${pack!.title}`;
  const description = isBundle ? bundle.description : pack!.description;
  const price = isBundle ? BUNDLE_PRICE : PACK_PRICE;
  const contents = isBundle ? packs : [pack!];
  const productId = isBundle ? bundle.id : pack!.id;

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
                <PlayCircle className="size-3.5" aria-hidden /> {contents.length * 4} vidéos
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
              <div className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface/70 p-4 lg:hidden">
                <p className="font-display text-2xl font-extrabold text-gradient">{formatFCFA(price)}</p>
                <a href="#acheter" className="btn-primary !py-2.5 text-sm">
                  Acheter
                </a>
              </div>
            </header>

            {!isBundle && (
              <Reveal className="card p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold">Ce que tu vas obtenir</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {pack!.outcomes.map((o) => (
                    <li key={o} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-400/15">
                        <Check className="size-4 text-brand-300" aria-hidden />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">Programme</h2>
              {contents.map((p) => (
                <Reveal key={p.id} className="card overflow-hidden">
                  {isBundle && (
                    <div className="border-b border-line px-6 py-4">
                      <p className="text-xs font-semibold tracking-wide text-brand-300 uppercase">Pack {p.number}</p>
                      <h3 className="font-display text-lg font-bold">{p.title}</h3>
                    </div>
                  )}
                  <ol className="divide-y divide-line">
                    {p.lessons.map((l, i) => (
                      <li key={l.id} className="flex gap-4 px-6 py-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-sm font-bold text-brand-300">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold">{l.title}</p>
                          <p className="mt-0.5 text-sm text-muted">{l.summary}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              ))}
            </div>
          </div>

          <aside id="acheter" className="scroll-mt-20 lg:sticky lg:top-24">
            <div className="card space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-sm text-muted">Prix</p>
                <p className="font-display text-4xl font-extrabold text-gradient">{formatFCFA(price)}</p>
                {isBundle && (
                  <p className="mt-2 text-sm text-brand-300">
                    Au lieu de {formatFCFA(PACK_PRICE * packs.length)} · tu économises {formatFCFA(BUNDLE_SAVINGS)}
                  </p>
                )}
              </div>
              <BuyButton productId={productId} returnTo={`/formations/${slug}`} label="Acheter maintenant" />
              <ul className="space-y-3 border-t border-line pt-6 text-sm">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-text/85">
                    <Icon className="size-4 text-brand-400" aria-hidden /> {text}
                  </li>
                ))}
              </ul>
              <PaymentMethods compact />
            </div>
            {!isBundle && (
              <Link
                href={`/formations/${bundle.slug}`}
                className="mt-4 block rounded-3xl border border-brand-400/30 bg-brand-400/5 p-5 text-sm transition hover:bg-brand-400/10"
              >
                <span className="font-semibold text-brand-300">Astuce :</span> les 16 vidéos pour {formatFCFA(BUNDLE_PRICE)} au lieu de{" "}
                {formatFCFA(PACK_PRICE * packs.length)}. Voir le pack complet →
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
