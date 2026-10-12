import type { Metadata } from "next";
import { packs } from "@/content/catalogue";
import { formationFaq } from "@/content/faq";
import { PaymentMethods } from "@/components/payment-methods";
import { Reveal } from "@/components/reveal";
import { BundleCard, Faq, PackCard, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Formations création de contenu & réseaux sociaux",
  description: "4 packs de 4 vidéos pour maîtriser la création de contenu et le marketing sur TikTok, Facebook et Instagram. 9 900 FCFA le pack, 34 900 FCFA les 16 vidéos.",
};

export default function FormationsPage() {
  return (
    <>
      <PageHero eyebrow="Formations Airgé" title={<>Deviens le créateur de contenu <span className="text-gradient">dont ta marque a besoin</span>.</>}>
        16 vidéos concrètes, réparties en 4 packs, pour passer de la stratégie à la vente. Paiement unique, accès à vie.
      </PageHero>
      <section className="container-page py-16">
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
      <section className="container-page max-w-3xl pt-12">
        <SectionHeading eyebrow="Questions fréquentes" title="Avant de commencer" center />
        <Reveal>
          <Faq items={formationFaq} />
        </Reveal>
      </section>
    </>
  );
}
