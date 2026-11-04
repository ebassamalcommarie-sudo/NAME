import "server-only";
import { site } from "@/content/site";
import { readSupabaseConfig } from "@/lib/supabase/config";

// Toutes les clés secrètes viennent des variables d'environnement (voir .env.example).
// Les anciens noms de Supabase (ANON_KEY, SERVICE_ROLE_KEY) sont aussi acceptés.

const supabase = readSupabaseConfig();

export const env = {
  siteUrl: site.url,
  supabaseUrl: supabase.url,
  supabasePublishableKey: supabase.publishableKey,
  supabaseSecretKey: supabase.secretKey,
  notchpayPublicKey: (process.env.NOTCHPAY_PUBLIC_KEY ?? "").trim(),
  notchpayHashKey: process.env.NOTCHPAY_HASH_KEY ?? "",
  // Numéro (non secret) de la bibliothèque Bunny Stream « airge-formations ».
  bunnyLibraryId: (process.env.BUNNY_STREAM_LIBRARY_ID ?? "").trim() || "799718",
  bunnyTokenKey: (process.env.BUNNY_STREAM_TOKEN_KEY ?? "").trim(),
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export const isSupabaseConfigured = () => Boolean(supabase.urlValid && env.supabasePublishableKey);
/** Clé Notch Pay de test : les paiements sont fictifs, l'achat est donc réservé aux administrateurs. */
export const isPaymentTestMode = () => env.notchpayPublicKey.toLowerCase().startsWith("pk_test");
export const isPaymentConfigured = () => Boolean(env.notchpayPublicKey && env.supabaseSecretKey && isSupabaseConfigured());
