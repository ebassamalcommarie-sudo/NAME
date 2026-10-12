// Lecture « tolérante » des clés Supabase : enlève les espaces et guillemets
// collés par erreur dans Vercel, et accepte les anciens noms de variables.
// Pas de "server-only" ici : ce fichier est aussi utilisé par le proxy.

function clean(value: string | undefined) {
  return (value ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

export function readSupabaseConfig() {
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/+$/, "");
  const publishableKey = clean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) || clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const secretKey = clean(process.env.SUPABASE_SECRET_KEY) || clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  return { url, publishableKey, secretKey, urlValid: isValidSupabaseUrl(url) };
}

function isValidSupabaseUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
