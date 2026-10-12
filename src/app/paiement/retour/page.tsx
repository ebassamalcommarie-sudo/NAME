import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CircleCheck, Clock, MessageCircle, XCircle } from "lucide-react";
import { products } from "@/content/catalogue";
import { whatsappLink } from "@/content/site";
import { isPaymentConfigured } from "@/lib/env";
import { confirmOrder } from "@/lib/orders";

export const metadata: Metadata = { title: "Paiement", robots: { index: false } };

export default function PaiementRetourPage({ searchParams }: PageProps<"/paiement/retour">) {
  return (
    <section className="container-page grid min-h-[65vh] place-items-center py-16">
      <div className="card w-full max-w-lg p-8 text-center">
        <Suspense fallback={<Status icon={<Clock className="size-12 animate-pulse text-brand-300" />} title="Vérification du paiement…" />}>
          <Result searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

function Status({ icon, title, children }: { icon: React.ReactNode; title: string; children?: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">{icon}</div>
      <h1 className="font-display text-2xl font-extrabold">{title}</h1>
      {children}
    </div>
  );
}

async function Result({ searchParams }: { searchParams: PageProps<"/paiement/retour">["searchParams"] }) {
  const sp = await searchParams;
  const pick = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const reference = pick("ref") ?? pick("reference") ?? pick("trxref");

  if (!reference || !isPaymentConfigured()) {
    return (
      <Status icon={<XCircle className="size-12 text-orange-money" />} title="Paiement introuvable">
        <Link href="/formations" className="btn-primary">
          Retour aux formations
        </Link>
      </Status>
    );
  }

  let result: Awaited<ReturnType<typeof confirmOrder>>;
  try {
    result = await confirmOrder(reference);
  } catch (e) {
    console.error("Vérification du paiement", e);
    result = { status: "pending" };
  }

  if (result.status === "paid") {
    return (
      <Status icon={<CircleCheck className="size-14 text-brand-300" />} title="Paiement confirmé 🎉">
        <p className="text-muted">
          Merci ! {result.order ? `« ${products[result.order.product_id].title} » est` : "Ta formation est"} maintenant disponible dans ton espace élève.
        </p>
        <Link href="/mon-espace" className="btn-primary">
          Commencer ma formation
        </Link>
      </Status>
    );
  }

  if (result.status === "pending") {
    return (
      <Status icon={<Clock className="size-12 text-mtn" />} title="Paiement en cours de confirmation">
        <p className="text-muted">
          Valide le paiement sur ton téléphone si ce n&apos;est pas encore fait. La confirmation peut prendre quelques instants.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/paiement/retour?ref=${encodeURIComponent(reference)}`} className="btn-primary justify-center">
            Vérifier à nouveau
          </Link>
          <Link href="/mon-espace" className="btn-secondary justify-center">
            Mon espace
          </Link>
        </div>
        <p className="text-xs text-muted">Référence : {reference}</p>
      </Status>
    );
  }

  return (
    <Status icon={<XCircle className="size-12 text-orange-money" />} title="Le paiement n'a pas abouti">
      <p className="text-muted">Aucun montant n&apos;a été débité. Tu peux réessayer ou nous contacter.</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/formations" className="btn-primary justify-center">
          Réessayer
        </Link>
        <a
          href={whatsappLink(`Bonjour Airgé, j'ai un souci avec mon paiement (référence ${reference}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary justify-center"
        >
          <MessageCircle className="size-4" aria-hidden /> Nous écrire
        </a>
      </div>
    </Status>
  );
}
