import { connection } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

// Appelée chaque jour par Vercel (voir vercel.json) : une petite requête suffit
// pour que Supabase (offre gratuite) ne mette pas le projet en pause après 7 jours sans activité.
export async function GET() {
  await connection();
  if (!isSupabaseConfigured()) return Response.json({ ok: false, reason: "supabase non configuré" });
  const { error } = await createAdminClient().from("orders").select("id", { head: true, count: "exact" });
  return Response.json({ ok: !error, at: new Date().toISOString() }, { status: error ? 503 : 200 });
}
