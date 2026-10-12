import Link from "next/link";
import { ArrowRight, Bot, CirclePlay, GraduationCap, Heart, MessageCircle, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { packs } from "@/content/catalogue";
import { services } from "@/content/services";
import { formationFaq } from "@/content/faq";
import { whatsappLink } from "@/content/site";
import { PaymentMethods } from "@/components/payment-methods";
import { Reveal } from "@/components/reveal";
import { BundleCard, Faq, PackCard, SectionHeading, ServiceIcon } from "@/components/ui";

const keywords = ["Création de contenu", "TikTok", "Instagram", "Facebook", "Intelligence artificielle", "Publicité", "Branding", "WhatsApp Business"];

const method = [
  { n: "01", title: "Stratégie", text: "On clarifie ton positionnement, ton audience et ce que tu veux vendre." },
  { n: "02", title: "Création", text: "On produit des vidéos et visuels qui captent l'attention et inspirent confiance." },
  { n: "03", title: "Diffusion", text: "On publie au bon moment, sur les bonnes plateformes, avec régularité." },
  { n: "04", title: "Conversion", text: "On transforme l'attention en clients avec la publicité, WhatsApp et l'IA." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(72_200_211/0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(102_227_232/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(102_227_232/0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container-page relative grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div className="space-y-7">
            <p className="eyebrow">
              <Sparkles className="size-3.5" aria-hidden /> Agence de contenu propulsée par l&apos;IA
            </p>
            <h1 className="font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[4.1rem]">
              Ton contenu mérite d&apos;être vu. <span className="animate-shine text-gradient">Et de vendre.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted">
              Airgé aide les entrepreneurs et les marques africaines à créer du contenu qui attire, engage et convertit,
              grâce à la stratégie, la vidéo et l&apos;intelligence artificielle.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/formations" className="btn-primary justify-center">
                <GraduationCap className="size-5" aria-hidden /> Découvrir les formations
              </Link>
              <Link href="/services" className="btn-secondary justify-center">
                Travailler avec l&apos;agence <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Paiement simple et sécurisé</p>
              <PaymentMethods />
            </div>
          </div>

          {/* Visuel : téléphone stylisé */}
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm" aria-hidden>
            <div className="absolute inset-0 -z-10 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="animate-float rounded-[2.8rem] border border-brand-400/30 bg-surface p-3 shadow-2xl shadow-brand-500/20">
              <div className="relative aspect-[9/17] overflow-hidden rounded-[2.2rem] bg-[linear-gradient(160deg,#0f3a44,#071418_55%,#0b2a31)]">
                <div className="absolute inset-x-0 top-0 flex justify-center pt-3">
                  <div className="h-5 w-24 rounded-full bg-black/60" />
                </div>
                <div className="absolute -top-10 -left-16 size-56 rounded-full bg-brand-400/30 blur-3xl" />
                <div className="absolute -right-10 bottom-24 size-48 rounded-full bg-brand-600/40 blur-3xl" />
                <div className="absolute inset-x-5 top-16 space-y-2 text-center">
                  <p className="inline-block -rotate-2 rounded-lg bg-brand-300 px-3 py-1 font-display text-xs font-extrabold text-ink uppercase">Stop au scroll ✋</p>
                  <p className="font-display text-2xl leading-tight font-extrabold text-white sm:text-3xl">
                    3 erreurs qui <span className="text-brand-300">tuent</span> tes ventes
                  </p>
                </div>
                <div className="absolute inset-0 grid place-items-center pt-24">
                  <div className="grid size-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur sm:size-20">
                    <CirclePlay className="size-8 text-brand-200 sm:size-10" />
                  </div>
                </div>
                <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white/90">
                  <Heart className="size-7 fill-brand-400 text-brand-400" />
                  <MessageCircle className="size-7" />
                  <Rocket className="size-7" />
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                  <p className="font-display text-sm font-bold">@airge.agency</p>
                  <p className="text-xs text-white/80">Regarde jusqu&apos;à la fin 👇 #marketing #cameroun</p>
                  <div className="h-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-2/3 bg-brand-400" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/3 -left-8 hidden sm:flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-4 py-3 text-sm shadow-xl backdrop-blur sm:-left-14">
              <Bot className="size-5 text-brand-300" /> Script généré par IA
            </div>
            <div className="absolute -right-6 bottom-36 hidden sm:flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-4 py-3 text-sm shadow-xl backdrop-blur sm:-right-10">
              <Zap className="size-5 text-mtn" /> Nouveau client sur WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU */}
      <div className="overflow-hidden border-y border-line bg-surface/40 py-4">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...keywords, ...keywords].map((k, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-sm font-semibold tracking-wide whitespace-nowrap text-muted uppercase">
              {k} <Sparkles className="size-4 text-brand-500" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* DEUX CHEMINS */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Deux façons d'avancer avec Airgé" title="Apprends à le faire, ou laisse-nous le faire pour toi." center />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Link href="/formations" className="card group flex h-full flex-col gap-4 p-8 transition hover:border-brand-500/50">
              <GraduationCap className="size-10 text-brand-400" aria-hidden />
              <h3 className="font-display text-2xl font-bold">Les formations</h3>
              <p className="text-muted">
                16 vidéos en 4 packs pour maîtriser la création de contenu et le marketing sur les réseaux sociaux, à ton rythme.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold text-brand-300">
                Voir les packs <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/services" className="card group flex h-full flex-col gap-4 p-8 transition hover:border-brand-500/50">
              <Sparkles className="size-10 text-brand-400" aria-hidden />
              <h3 className="font-display text-2xl font-bold">L&apos;agence</h3>
              <p className="text-muted">
                Création de contenu, community management, publicité et solutions IA : on construit ta présence en ligne de A à Z.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold text-brand-300">
                Voir les services <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-line bg-surface/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Services de l'agence" title={<>Tout ce qu&apos;il faut pour <span className="text-gradient">grandir en ligne</span>.</>}>
            Une équipe qui combine créativité, stratégie et intelligence artificielle pour produire plus, mieux et plus vite.
          </SectionHeading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 80}>
                <div className={`card h-full p-6 ${s.highlight ? "ring-1 ring-brand-400/40" : ""}`}>
                  <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-brand-400/10 ring-1 ring-brand-400/25">
                    <ServiceIcon icon={s.icon} className="size-6 text-brand-300" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.pitch}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link href="/services" className="btn-secondary">
              Voir le détail des services <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* METHODE */}
      <section id="methode" className="container-page scroll-mt-20 py-20 sm:py-28">
        <SectionHeading eyebrow="La méthode Airgé" title="Du contenu qui ne fait pas que plaire : il vend.">
          Chaque projet suit les mêmes 4 étapes, et l&apos;IA accélère chacune d&apos;elles.
        </SectionHeading>
        <ol className="grid gap-5 md:grid-cols-4">
          {method.map((m, i) => (
            <Reveal as="li" key={m.n} delay={i * 90} className="relative">
              <div className="card h-full p-6">
                <span className="font-display text-4xl font-extrabold text-gradient">{m.n}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FORMATIONS */}
      <section className="border-y border-line bg-surface/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Les formations" title={<>4 packs. 16 vidéos. <span className="text-gradient">Un vrai plan.</span></>}>
            Choisis le pack dont tu as besoin, ou prends le parcours complet. Accès immédiat et à vie.
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((p, i) => (
              <PackCard key={p.id} pack={p} delay={i * 80} />
            ))}
          </div>
          <div className="mt-8">
            <BundleCard />
          </div>
        </div>
      </section>

      {/* ACHAT EN 3 ÉTAPES */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Simple et rapide" title="Accède à ta formation en 2 minutes." center />
        <ol className="grid gap-5 md:grid-cols-3">
          {[
            { t: "Choisis ton pack", d: "Un pack à 9 900 FCFA ou les 16 vidéos à 34 900 FCFA." },
            { t: "Paie comme tu veux", d: "Orange Money, MTN MoMo ou carte bancaire, en toute sécurité." },
            { t: "Regarde tout de suite", d: "Tes vidéos t'attendent dans ton espace élève, sur mobile et ordinateur." },
          ].map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 90}>
              <div className="card flex h-full gap-4 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gradient font-display font-extrabold text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
          <ShieldCheck className="size-4 text-brand-400" aria-hidden /> Paiements sécurisés par Notch Pay
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-page max-w-3xl pb-8">
        <SectionHeading eyebrow="Questions fréquentes" title="Tu te poses des questions ?" center />
        <Reveal>
          <Faq items={formationFaq} />
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="container-page pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 text-ink sm:p-14">
            <div className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full bg-white/30 blur-3xl" />
            <div className="relative max-w-2xl space-y-5">
              <h2 className="font-display text-3xl font-extrabold text-balance sm:text-5xl">Prêt à faire décoller ta marque ?</h2>
              <p className="text-lg text-ink/80">
                Parle-nous de ton projet sur WhatsApp. On te répond rapidement avec une proposition adaptée à ton budget.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink("Bonjour Airgé, j'ai un projet et j'aimerais être accompagné(e).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display font-bold text-text transition hover:bg-surface active:scale-98"
                >
                  <MessageCircle className="size-5" aria-hidden /> Discuter sur WhatsApp
                </a>
                <Link
                  href="/formations"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-3.5 font-display font-bold transition hover:bg-white/20"
                >
                  Voir les formations
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
