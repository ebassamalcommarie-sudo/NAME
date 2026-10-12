import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parle-nous de ton projet : création de contenu, réseaux sociaux, publicité ou IA.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Parlons de <span className="text-gradient">ton projet</span>.</>}>
        Le plus rapide, c&apos;est WhatsApp. Dis-nous ce que tu veux accomplir, on te répond avec une proposition claire.
      </PageHero>
      <section className="container-page grid gap-5 py-16 md:grid-cols-2">
        <Reveal>
          <a
            href={whatsappLink("Bonjour Airgé Agency, j'aimerais discuter de mon projet.")}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex h-full flex-col gap-4 p-8 transition hover:border-[#25d366]/60"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-[#25d366]/15">
              <MessageCircle className="size-7 text-[#25d366]" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-bold">WhatsApp</h2>
            <p className="text-muted">Réponse rapide, du lundi au samedi.</p>
            <span className="mt-auto font-semibold text-[#25d366]">Ouvrir la discussion →</span>
          </a>
        </Reveal>
        <Reveal delay={90}>
          <a href={`mailto:${site.email}`} className="card group flex h-full flex-col gap-4 p-8 transition hover:border-brand-500/50">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-400/10">
              <Mail className="size-7 text-brand-300" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-bold">Email</h2>
            <p className="text-muted">Pour les demandes détaillées et les partenariats.</p>
            <span className="mt-auto font-semibold break-all text-brand-300">{site.email}</span>
          </a>
        </Reveal>
        <Reveal className="md:col-span-2">
          <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
            <p className="font-display font-semibold">Suis Airgé sur les réseaux</p>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2 text-sm">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
