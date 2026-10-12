import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Connexion", robots: { index: false } };

export default function ConnexionPage() {
  return (
    <AuthShell title="Bon retour 👋" subtitle="Connecte-toi pour retrouver tes formations.">
      <AuthForm mode="signin" />
    </AuthShell>
  );
}
