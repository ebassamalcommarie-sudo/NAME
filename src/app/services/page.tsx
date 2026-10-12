import type { Metadata } from "next";
import { Check, MessageCircle } from "lucide-react";
import { services } from "@/content/services";
import { whatsappLink } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { PageHero, ServiceIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services de l'agence",
  description: "Création de contenu, community management, publicité en ligne, branding et solutions IA pour les marques africaines.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services Airgé Agency" title={<>On construit ta présence en ligne. <span className="text-gradient">Toi, tu vends.</span></>}>
        Stratégie, création, diffusion et intelligence artificielle : choisis le service dont tu as besoin ou un accompagnement complet.
        Chaque proposition est adaptée à ton budget.
      </PageHero>
      <section className="container-page py-16">
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 2) * 90}>
              <article className={`card flex h-full flex-col p-6 sm:p-8 ${s.highlight ? "ring-1 ring-brand-400/40" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-14 place-items-center rounded-2xl bg-brand-400/10 ring-1 ring-brand-400/25">
                    <ServiceIcon icon={s.icon} className="size-7 text-brand-300" />
                  </div>
                  {s.highlight && <span className="eyebrow">Nouveau · IA</span>}
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">{s.title}</h2>
                <p className="mt-2 text-muted">{s.pitch}</p>
                <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden /> {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                  <p className="font-display font-bold text-brand-200">{s.price}</p>
                  <a
                    href={whatsappLink(`Bonjour Airgé, je suis intéressé(e) par le service « ${s.title} ».`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !py-2.5 text-sm"
                  >
                    <MessageCircle className="size-4" aria-hidden /> Demander un devis
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
