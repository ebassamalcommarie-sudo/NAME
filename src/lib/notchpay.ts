import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

// Notch Pay : Orange Money, MTN Mobile Money et cartes bancaires au Cameroun.
// https://notchpay.co — les clés se trouvent dans Paramètres > Développeur.

const API_BASE = "https://api.notchpay.co";

export type NotchTransaction = {
  reference?: string;
  merchant_reference?: string;
  trxref?: string;
  status?: string;
  amount?: number | string;
  currency?: string;
};

async function notchFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: env.notchpayPublicKey,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const message = typeof body.message === "string" ? body.message : `HTTP ${res.status}`;
    throw new Error(`Notch Pay: ${message}`);
  }
  return body;
}

export async function initializePayment(params: {
  amount: number;
  currency: string;
  email: string;
  name: string;
  reference: string;
  description: string;
  callback: string;
}) {
  const body = await notchFetch("/payments", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      email: params.email,
      customer: { email: params.email, name: params.name },
      reference: params.reference,
      description: params.description,
      callback: params.callback,
    }),
  });
  const transaction = (body.transaction ?? {}) as NotchTransaction;
  const authorizationUrl = body.authorization_url;
  if (typeof authorizationUrl !== "string") throw new Error("Notch Pay: lien de paiement manquant");
  return { authorizationUrl, providerReference: transaction.reference ?? null };
}

export async function retrievePayment(reference: string) {
  const body = await notchFetch(`/payments/${encodeURIComponent(reference)}`);
  return (body.transaction ?? body) as NotchTransaction;
}

/**
 * Vérifie la signature d'un webhook (HMAC SHA-256 du corps brut avec la clé de hachage).
 * Le paiement est de toute façon re-vérifié auprès de l'API avant de donner l'accès.
 */
export function isValidWebhookSignature(rawBody: string, signature: string | null) {
  if (!env.notchpayHashKey) return true;
  if (!signature) return false;
  const expected = createHmac("sha256", env.notchpayHashKey).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature.trim().toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

export const PAID_STATUSES = new Set(["complete", "completed", "success", "successful"]);
export const FAILED_STATUSES = new Set(["failed", "canceled", "cancelled", "expired", "rejected", "abandoned"]);
