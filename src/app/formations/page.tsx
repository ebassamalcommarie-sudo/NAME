import type { Metadata } from "next";
import { PACKS_AVAILABLE, packs, specials } from "@/content/catalogue";
import { formationFaq } from "@/content/faq";
import { PaymentMethods } from "@/components/payment-methods";
import { Reveal } from "@/components/reveal";
import { BundleCard, Faq, PackCard, PageHero, SectionHeading, SpecialCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Formations création de contenu, réseaux sociaux & IA",
  description:
    "Formations spéciales du mois et parcours complet pour maîtriser la création de contenu, le marketing sur TikTok, Facebook, Instagram et l'IA. Paiement Orange Money, MTN MoMo ou carte.",
};

export default function FormationsPage() {
  const liveSpecials = specials.filter((s) => s.available);
  return (
    <>
      <PageHero eyebrow="Formations Airgé" title={<>Deviens le créateur de contenu <span className="text-gradient">dont ta marque a besoin</span>.</>}>
        Des formations courtes et concrètes, avec l&apos;IA au cœur. Paiement unique, accès immédiat et à vie.
      </PageHero>

      {liveSpecials.length > 0 && (
        <section className="container-page pt-16">
          <SectionHeading eyebrow="Formations spéciales" title={<>La formation <span className="text-gradient">du mois</span></>}>
            Chaque mois, une formation courte sur un outil ou une technique qui fait la différence en ce moment.
          </SectionHeading>
          <div className="space-y-6">
            {liveSpecials.map((s) => (
              <SpecialCard key={s.id} special={s} />
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <SectionHeading
          eyebrow={PACKS_AVAILABLE ? "Le parcours complet" : "Le parcours complet · Bientôt disponible"}
          title={<>4 packs. 16 vidéos. <span className="text-gradient">Un vrai plan.</span></>}
        >
          De la stratégie à la vente : tout le parcours pour bâtir une présence en ligne qui rapporte.
        </SectionHeading>
        <Reveal className="mb-10">
          <PaymentMethods />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((p, i) => (
            <PackCard key={p.id} pack={p} delay={i * 80} />
          ))}
        </div>
        <div className="mt-8">
          <BundleCard />
        </div>
      </section>

      <section className="container-page max-w-3xl pt-4">
        <SectionHeading eyebrow="Questions fréquentes" title="Avant de commencer" center />
        <Reveal>
          <Faq items={formationFaq} />
        </Reveal>
      </section>
    </>
  );
}
