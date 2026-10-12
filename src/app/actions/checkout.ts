"use server";

import { redirect } from "next/navigation";
import { CURRENCY, isProductId, products } from "@/content/catalogue";
import { env, isPaymentConfigured } from "@/lib/env";
import { getCurrentUser } from "@/lib/auth";
import { initializePayment } from "@/lib/notchpay";
import { getOwnedPackIds, newReference } from "@/lib/orders";
import { createAdminClient } from "@/lib/supabase/admin";

export type CheckoutState = { error?: string } | undefined;

export async function startCheckout(_: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const productId = String(formData.get("productId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/formations");
  if (!isProductId(productId)) return { error: "Produit introuvable." };
  if (!isPaymentConfigured()) {
    return { error: "Le paiement en ligne sera disponible très bientôt. Écris-nous sur WhatsApp pour réserver ta place." };
  }

  const user = await getCurrentUser();
  if (!user) redirect(`/connexion?next=${encodeURIComponent(returnTo.startsWith("/") ? returnTo : "/formations")}`);

  const product = products[productId];
  const owned = await getOwnedPackIds(user.id);
  if (product.packIds.every((id) => owned.has(id))) redirect("/mon-espace");

  const reference = newReference();
  const db = createAdminClient();
  const { data: order, error } = await db
    .from("orders")
    .insert({
      user_id: user.id,
      email: user.email,
      product_id: product.id,
      amount: product.price,
      currency: CURRENCY,
      reference,
    })
    .select("id")
    .single();
  if (error || !order) {
    console.error("Création de commande impossible", error);
    return { error: "Impossible de créer la commande. Réessaie dans un instant." };
  }

  let authorizationUrl: string;
  try {
    const payment = await initializePayment({
      amount: product.price,
      currency: CURRENCY,
      email: user.email,
      name: user.name,
      reference,
      description: `Airgé Agency — ${product.title}`,
      callback: `${env.siteUrl}/paiement/retour?ref=${reference}`,
    });
    authorizationUrl = payment.authorizationUrl;
    if (payment.providerReference) {
      await db.from("orders").update({ provider_reference: payment.providerReference }).eq("id", order.id);
    }
  } catch (e) {
    console.error("Initialisation Notch Pay impossible", e);
    await db.from("orders").update({ status: "failed" }).eq("id", order.id);
    return { error: "Le service de paiement ne répond pas. Réessaie dans quelques minutes." };
  }

  redirect(authorizationUrl);
}
