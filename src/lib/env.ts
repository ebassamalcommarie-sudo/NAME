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
  bunnyLibraryId: process.env.BUNNY_STREAM_LIBRARY_ID ?? "",
  bunnyTokenKey: process.env.BUNNY_STREAM_TOKEN_KEY ?? "",
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export const isSupabaseConfigured = () => Boolean(supabase.urlValid && env.supabasePublishableKey);
export const isPaymentConfigured = () => Boolean(env.notchpayPublicKey && env.supabaseSecretKey && isSupabaseConfigured());
