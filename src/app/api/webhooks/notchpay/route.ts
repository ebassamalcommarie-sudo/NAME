import { NextResponse, type NextRequest } from "next/server";
import { isPaymentConfigured } from "@/lib/env";
import { isValidWebhookSignature } from "@/lib/notchpay";
import { confirmOrder } from "@/lib/orders";

// Webhook Notch Pay : à déclarer dans Notch Pay > Paramètres > Développeur > Webhooks
// avec l'URL https://TON-DOMAINE/api/webhooks/notchpay
export async function POST(request: NextRequest) {
  if (!isPaymentConfigured()) return NextResponse.json({ ok: false }, { status: 503 });

  const raw = await request.text();
  const signature = request.headers.get("x-notch-signature") ?? request.headers.get("x-notchpay-signature");
  if (!isValidWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false, error: "signature" }, { status: 401 });
  }

  let payload: { event?: string; data?: Record<string, unknown> };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = payload.data ?? {};
  const candidates = [data.merchant_reference, data.reference, data.trxref].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );

  // On ne fait jamais confiance au contenu du webhook : confirmOrder re-vérifie auprès de Notch Pay.
  for (const reference of candidates) {
    try {
      const result = await confirmOrder(reference);
      if (result.status !== "not_found") return NextResponse.json({ ok: true, status: result.status });
    } catch (e) {
      console.error("Webhook Notch Pay", e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true, status: "ignored" });
}
