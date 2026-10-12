import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Camera, Check, Compass, Palette, PlayCircle, Sparkles, Target, Users } from "lucide-react";
import type { Service } from "@/content/services";
import { BUNDLE_PRICE, BUNDLE_SAVINGS, PACK_PRICE, bundle, formatFCFA, packs, type Pack } from "@/content/catalogue";
import { Reveal } from "./reveal";

const serviceIcons = {
  camera: Camera,
  users: Users,
  target: Target,
  sparkles: Sparkles,
  palette: Palette,
  compass: Compass,
} as const;

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = serviceIcons[icon];
  return <Icon className={className} aria-hidden />;
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">{title}</h2>
      {children && <p className="text-lg leading-relaxed text-pretty text-muted">{children}</p>}
    </Reveal>
  );
}

export function PackCard({ pack, delay = 0 }: { pack: Pack; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/formations/${pack.slug}`}
        className="card group relative flex h-full flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-500/50"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-brand-500/10 blur-3xl transition group-hover:bg-brand-400/20" />
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-5xl font-extrabold text-gradient">0{pack.number}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
            <PlayCircle className="size-3.5 text-brand-400" aria-hidden /> {pack.lessons.length} vidéos
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-balance">{pack.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{pack.subtitle}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {pack.lessons.map((l) => (
            <li key={l.id} className="flex gap-2 text-text/85">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
              {l.title}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between pt-6">
          <p className="font-display text-2xl font-bold">{formatFCFA(PACK_PRICE)}</p>
          <span className="grid size-10 place-items-center rounded-full bg-brand-400 text-ink transition group-hover:translate-x-1">
            <ArrowRight className="size-5" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function BundleCard() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] p-px">
        <div className="absolute inset-0 animate-shine bg-[linear-gradient(110deg,var(--color-brand-600),var(--color-brand-200),var(--color-brand-600),var(--color-brand-200))] bg-[length:200%_auto]" />
        <div className="relative grid gap-8 rounded-[calc(2rem-1px)] bg-surface p-6 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="eyebrow">⭐ Meilleure offre</p>
            <h3 className="font-display text-3xl font-extrabold text-balance sm:text-4xl">{bundle.title}</h3>
            <p className="text-muted">{bundle.description}</p>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {packs.map((p) => (
                <li key={p.id} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                  <span>
                    Pack {p.number} — {p.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-line bg-ink/60 p-6 text-center">
            <p className="text-sm text-muted line-through">{formatFCFA(PACK_PRICE * packs.length)}</p>
            <p className="font-display text-4xl font-extrabold text-gradient sm:text-5xl">{formatFCFA(BUNDLE_PRICE)}</p>
            <p className="inline-flex rounded-full bg-brand-400/15 px-3 py-1 text-sm font-semibold text-brand-300">
              Tu économises {formatFCFA(BUNDLE_SAVINGS)}
            </p>
            <Link href={`/formations/${bundle.slug}`} className="btn-primary w-full justify-center">
              Obtenir les 16 vidéos <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="text-xs text-muted">Accès à vie · Paiement unique</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-surface/60">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">
            {item.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-brand-300 transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="container-page relative py-16 sm:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">{title}</h1>
        {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{children}</p>}
      </div>
    </section>
  );
}
