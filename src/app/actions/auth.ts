"use server";

import { redirect } from "next/navigation";
import { env, isSupabaseConfigured } from "@/lib/env";
import { safeNext } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string } | undefined;

const NOT_CONFIGURED = "La connexion n'est pas encore activée sur le site. Réessaie bientôt.";

function translate(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Confirme d'abord ton email grâce au lien reçu dans ta boîte mail.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Un compte existe déjà avec cet email. Connecte-toi.";
  if (m.includes("password")) return "Le mot de passe doit contenir au moins 8 caractères.";
  if (m.includes("rate limit")) return "Trop de tentatives. Patiente quelques minutes puis réessaie.";
  return "Une erreur est survenue. Réessaie dans un instant.";
}

export async function signIn(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));
  if (!email || !password) return { error: "Renseigne ton email et ton mot de passe." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: translate(error.message) };
  redirect(next);
}

export async function signUp(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));
  if (!name || !email) return { error: "Renseigne ton nom et ton email." };
  if (password.length < 8) return { error: "Le mot de passe doit contenir au moins 8 caractères." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${env.siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });
  if (error) return { error: translate(error.message) };
  // Si la confirmation par email est activée dans Supabase, il n'y a pas encore de session.
  if (!data.session) {
    return { message: `Compte créé ! Ouvre l'email envoyé à ${email} pour confirmer ton adresse, puis connecte-toi.` };
  }
  redirect(next);
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
