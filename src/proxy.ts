import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { readSupabaseConfig } from "@/lib/supabase/config";

// Rafraîchit la session Supabase avant d'afficher les pages qui en ont besoin.
export async function proxy(request: NextRequest) {
  const { url, publishableKey, urlValid } = readSupabaseConfig();
  if (!urlValid || !publishableKey) return NextResponse.next();

  let response = NextResponse.next({ request });
  try {
    const supabase = createServerClient(url, publishableKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
          for (const [name, value] of Object.entries(headers ?? {})) response.headers.set(name, value);
        },
      },
    });
    await supabase.auth.getUser();
  } catch (e) {
    // Une clé mal configurée ne doit jamais rendre le site inaccessible.
    console.error("Proxy Supabase", e);
    return NextResponse.next();
  }
  return response;
}

export const config = {
  matcher: ["/mon-espace/:path*", "/admin/:path*", "/connexion", "/inscription", "/paiement/:path*"],
};
