import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { products, formatFCFA } from "@/content/catalogue";
import { isAdmin, requireUser } from "@/lib/auth";
import { isPaymentConfigured } from "@/lib/env";
import type { Order } from "@/lib/orders";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Administration", robots: { index: false } };

export default function AdminPage() {
  return (
    <section className="container-page py-12">
      <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-surface-2/60" />}>
        <Admin />
      </Suspense>
    </section>
  );
}

const statusLabel: Record<Order["status"], { text: string; className: string }> = {
  paid: { text: "Payée", className: "bg-brand-400/15 text-brand-300" },
  pending: { text: "En attente", className: "bg-mtn/15 text-mtn" },
  failed: { text: "Échouée", className: "bg-orange-money/15 text-orange-money" },
};

async function Admin() {
  const user = await requireUser("/admin");
  if (!isAdmin(user) || !isPaymentConfigured()) notFound();

  const db = createAdminClient();
  const [{ data: paid }, { data: recent }] = await Promise.all([
    db.from("orders").select("amount, user_id, product_id").eq("status", "paid"),
    db.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
  ]);
  const paidOrders = paid ?? [];
  const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const students = new Set(paidOrders.map((o) => o.user_id)).size;
  const bundles = paidOrders.filter((o) => o.product_id === "bundle").length;

  const stats = [
    { label: "Revenus encaissés", value: formatFCFA(revenue) },
    { label: "Ventes", value: String(paidOrders.length) },
    { label: "Élèves", value: String(students) },
    { label: "Packs complets vendus", value: String(bundles) },
  ];

  return (
    <div className="space-y-10">
      <h1 className="font-display text-3xl font-extrabold">Tableau de bord</h1>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="px-5 pt-5 text-left font-display text-lg font-bold">50 dernières commandes</caption>
          <thead className="text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Client</th>
              <th className="px-5 py-3 font-semibold">Produit</th>
              <th className="px-5 py-3 text-right font-semibold">Montant</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {((recent ?? []) as Order[]).map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-3 whitespace-nowrap text-muted">
                  {new Date(o.created_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Douala" })}
                </td>
                <td className="px-5 py-3">{o.email}</td>
                <td className="px-5 py-3">{products[o.product_id]?.title ?? o.product_id}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatFCFA(o.amount)}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusLabel[o.status].className}`}>
                    {statusLabel[o.status].text}
                  </span>
                </td>
              </tr>
            ))}
            {(recent ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted">
                  Aucune commande pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
