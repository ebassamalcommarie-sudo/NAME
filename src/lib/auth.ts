import "server-only";
import { redirect } from "next/navigation";
import { env, isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type CurrentUser = { id: string; email: string; name: string };

/** Utilisateur connecté, ou null. Lit la session : à appeler derrière un <Suspense>. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.email) return null;
  const name = (user.user_metadata?.full_name as string | undefined)?.trim() || user.email.split("@")[0];
  return { id: user.id, email: user.email, name };
}

export async function requireUser(next: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/connexion?next=${encodeURIComponent(next)}`);
  return user;
}

export function isAdmin(user: CurrentUser) {
  return env.adminEmails.includes(user.email.toLowerCase());
}

/** N'accepte que les redirections internes, pour éviter les redirections vers un autre site. */
export function safeNext(value: unknown, fallback = "/mon-espace") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
