import "server-only";

// Toutes les clés secrètes viennent des variables d'environnement (voir .env.example).
// Les anciens noms de Supabase (ANON_KEY, SERVICE_ROLE_KEY) sont aussi acceptés.

export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  notchpayPublicKey: process.env.NOTCHPAY_PUBLIC_KEY ?? "",
  notchpayHashKey: process.env.NOTCHPAY_HASH_KEY ?? "",
  bunnyLibraryId: process.env.BUNNY_STREAM_LIBRARY_ID ?? "",
  bunnyTokenKey: process.env.BUNNY_STREAM_TOKEN_KEY ?? "",
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export const isSupabaseConfigured = () => Boolean(env.supabaseUrl && env.supabasePublishableKey);
export const isPaymentConfigured = () => Boolean(env.notchpayPublicKey && env.supabaseSecretKey && isSupabaseConfigured());
