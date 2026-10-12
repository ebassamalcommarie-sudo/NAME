import "server-only";
import { randomBytes } from "node:crypto";
import { products, type PackId, type ProductId } from "@/content/catalogue";
import { createAdminClient } from "@/lib/supabase/admin";
import { FAILED_STATUSES, PAID_STATUSES, retrievePayment } from "@/lib/notchpay";

export type OrderStatus = "pending" | "paid" | "failed";

export type Order = {
  id: string;
  user_id: string;
  email: string;
  product_id: ProductId;
  amount: number;
  currency: string;
  reference: string;
  provider_reference: string | null;
  status: OrderStatus;
  created_at: string;
  paid_at: string | null;
};

export function newReference() {
  return `AIRGE-${Date.now().toString(36).toUpperCase()}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function getOwnedPackIds(userId: string): Promise<Set<PackId>> {
  const { data, error } = await createAdminClient().from("enrollments").select("pack_id").eq("user_id", userId);
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.pack_id as PackId));
}

async function findOrder(reference: string) {
  const db = createAdminClient();
  for (const column of ["reference", "provider_reference"]) {
    const { data, error } = await db.from("orders").select("*").eq(column, reference).limit(1).maybeSingle();
    if (error) throw error;
    if (data) return data as Order;
  }
  return null;
}

async function grantAccess(order: Order) {
  const db = createAdminClient();
  const rows = products[order.product_id].packIds.map((pack_id) => ({
    user_id: order.user_id,
    pack_id,
    order_id: order.id,
  }));
  const { error } = await db.from("enrollments").upsert(rows, { onConflict: "user_id,pack_id", ignoreDuplicates: true });
  if (error) throw error;
}

/**
 * Vérifie le paiement auprès de Notch Pay et, s'il est confirmé, donne l'accès aux packs.
 * Peut être appelée plusieurs fois sans risque (retour client + webhook).
 */
export async function confirmOrder(reference: string): Promise<{ status: OrderStatus | "not_found"; order?: Order }> {
  // Les références sont générées par nous ou par Notch Pay : on refuse tout le reste.
  if (!/^[A-Za-z0-9._-]{6,80}$/.test(reference)) return { status: "not_found" };

  const order = await findOrder(reference);
  if (!order) return { status: "not_found" };
  if (order.status === "paid") {
    await grantAccess(order);
    return { status: "paid", order };
  }

  const tx = await retrievePayment(order.provider_reference ?? order.reference);
  const txStatus = String(tx.status ?? "").toLowerCase();
  const amountOk = Number(tx.amount) >= order.amount && (!tx.currency || tx.currency.toUpperCase() === order.currency);

  const db = createAdminClient();
  if (PAID_STATUSES.has(txStatus) && amountOk) {
    const { error } = await db
      .from("orders")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", order.id);
    if (error) throw error;
    const paid = { ...order, status: "paid" as const };
    await grantAccess(paid);
    return { status: "paid", order: paid };
  }

  if (FAILED_STATUSES.has(txStatus)) {
    await db.from("orders").update({ status: "failed" }).eq("id", order.id).eq("status", "pending");
    return { status: "failed", order };
  }

  return { status: "pending", order };
}
