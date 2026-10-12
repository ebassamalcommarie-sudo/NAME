import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false } };

export default function InscriptionPage() {
  return (
    <AuthShell title="Crée ton compte" subtitle="Ton espace élève pour accéder à tes formations, sur tous tes appareils.">
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
