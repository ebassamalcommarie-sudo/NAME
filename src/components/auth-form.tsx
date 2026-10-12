"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn, signUp, type AuthState } from "@/app/actions/auth";

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full justify-center text-base">
      {pending ? <Loader2 className="size-5 animate-spin" aria-label="Chargement" /> : children}
    </button>
  );
}

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const params = useSearchParams();
  const next = params.get("next") ?? "/mon-espace";
  const linkError = params.get("erreur") === "lien";
  const [state, action] = useActionState<AuthState, FormData>(mode === "signin" ? signIn : signUp, undefined);
  const otherHref = `${mode === "signin" ? "/inscription" : "/connexion"}?next=${encodeURIComponent(next)}`;

  if (state?.message) {
    return (
      <div role="status" className="space-y-4 rounded-2xl border border-brand-400/30 bg-brand-400/10 p-5 text-sm">
        <p>{state.message}</p>
        <Link href={`/connexion?next=${encodeURIComponent(next)}`} className="font-semibold text-brand-300">
          Aller à la connexion →
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      {mode === "signup" && (
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Nom complet</span>
          <input name="name" required autoComplete="name" className="field" placeholder="Ton nom et prénom" />
        </label>
      )}
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Email</span>
        <input name="email" type="email" required autoComplete="email" inputMode="email" className="field" placeholder="ton@email.com" />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Mot de passe</span>
        <input
          name="password"
          type="password"
          required
          minLength={mode === "signup" ? 8 : undefined}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="field"
          placeholder={mode === "signup" ? "8 caractères minimum" : "••••••••"}
        />
      </label>
      {(state?.error || linkError) && (
        <p role="alert" className="rounded-2xl border border-orange-money/30 bg-orange-money/10 px-4 py-3 text-sm text-orange-200">
          {state?.error ?? "Ce lien de confirmation a expiré. Connecte-toi ou crée ton compte à nouveau."}
        </p>
      )}
      <Submit>{mode === "signin" ? "Se connecter" : "Créer mon compte"}</Submit>
      <p className="text-center text-sm text-muted">
        {mode === "signin" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
        <Link href={otherHref} className="font-semibold text-brand-300 hover:underline">
          {mode === "signin" ? "Créer un compte" : "Se connecter"}
        </Link>
      </p>
    </form>
  );
}
