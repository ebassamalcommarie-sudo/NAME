import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <h2>Données collectées</h2>
        <ul>
          <li>Ton nom et ton adresse email, pour créer ton compte élève.</li>
          <li>L&apos;historique de tes commandes et ta progression dans les formations.</li>
        </ul>
        <p className="mt-3">
          Les informations de paiement (numéro Mobile Money, carte bancaire) sont traitées uniquement par Notch Pay et ne sont jamais
          stockées par {site.name}.
        </p>
      </section>
      <section>
        <h2>Utilisation</h2>
        <p>
          Ces données servent uniquement à te donner accès à tes formations, à assurer le support et, si tu l&apos;acceptes, à t&apos;informer
          de nos nouveautés. Elles ne sont jamais revendues.
        </p>
      </section>
      <section>
        <h2>Hébergement et sécurité</h2>
        <p>
          Les comptes sont hébergés par Supabase, le site par Vercel et les vidéos par Bunny.net. Les échanges sont chiffrés (HTTPS) et les mots
          de passe ne sont jamais stockés en clair.
        </p>
      </section>
      <section>
        <h2>Tes droits</h2>
        <p>Tu peux demander à consulter, corriger ou supprimer tes données à tout moment en écrivant à {site.email}.</p>
      </section>
    </LegalPage>
  );
}
