import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Conditions générales de vente" };

// Modèle à faire relire et compléter (raison sociale, RCCM, NIU, adresse).
export default function CgvPage() {
  return (
    <LegalPage title="Conditions générales de vente">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions encadrent la vente des formations vidéo proposées par {site.name} sur ce site. Toute commande implique
          l&apos;acceptation de ces conditions.
        </p>
      </section>
      <section>
        <h2>2. Produits et prix</h2>
        <p>
          Les formations sont vendues sous forme de packs de vidéos accessibles en ligne. Les prix sont indiqués en francs CFA (XAF), toutes
          taxes comprises. {site.name} se réserve le droit de modifier ses prix à tout moment ; le prix appliqué est celui affiché au moment
          de la commande.
        </p>
      </section>
      <section>
        <h2>3. Paiement</h2>
        <p>
          Le paiement s&apos;effectue en ligne via le prestataire Notch Pay, par Orange Money, MTN Mobile Money ou carte bancaire.{" "}
          {site.name} n&apos;a jamais accès à tes informations bancaires ni à ton code de paiement.
        </p>
      </section>
      <section>
        <h2>4. Accès aux formations</h2>
        <ul>
          <li>L&apos;accès est ouvert dès la confirmation du paiement, depuis l&apos;espace élève.</li>
          <li>L&apos;accès est personnel, sans limite de durée tant que la plateforme est en service.</li>
          <li>Le partage de compte, l&apos;enregistrement ou la diffusion des vidéos sont interdits et peuvent entraîner la suspension de l&apos;accès.</li>
        </ul>
      </section>
      <section>
        <h2>5. Droit de rétractation et remboursement</h2>
        <p>
          Les formations étant des contenus numériques fournis immédiatement après l&apos;achat, elles ne sont pas remboursables une fois
          l&apos;accès ouvert, sauf problème technique empêchant leur visionnage et que nous ne parvenons pas à résoudre.
        </p>
      </section>
      <section>
        <h2>6. Propriété intellectuelle</h2>
        <p>Toutes les vidéos et tous les supports restent la propriété exclusive de {site.name}.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>Pour toute question : {site.email}.</p>
      </section>
    </LegalPage>
  );
}
