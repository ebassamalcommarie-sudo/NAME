import { connection } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/content/site";
import { readSupabaseConfig } from "@/lib/supabase/config";

// Page de vérification de la configuration : /diagnostic
// N'affiche jamais le contenu des clés, seulement si elles sont présentes et valides.
export async function GET() {
  await connection();
  const { url, publishableKey, secretKey, urlValid } = readSupabaseConfig();
  const lines: string[] = ["DIAGNOSTIC AIRGÉ", ""];
  const ok = (good: boolean, label: string, help = "") => lines.push(`${good ? "✅" : "❌"} ${label}${!good && help ? ` → ${help}` : ""}`);

  ok(site.url.startsWith("https://"), `Adresse du site : ${site.url}`, "vérifie NEXT_PUBLIC_SITE_URL (ex. https://name-ebassa.vercel.app)");
  ok(urlValid, "NEXT_PUBLIC_SUPABASE_URL", url ? "la valeur doit ressembler à https://xxxx.supabase.co" : "variable absente");
  if (urlValid) {
    // L'adresse du projet n'est pas secrète : on l'affiche pour pouvoir la comparer.
    lines.push(`   Adresse lue : ${url}`);
    const badChar = [...url].find((c) => c.charCodeAt(0) > 126 || c.charCodeAt(0) < 33);
    const { hostname, pathname } = new URL(url);
    if (badChar) lines.push(`❌ L'adresse contient un caractère interdit « ${badChar} » : recopie le Project URL avec le bouton 📋`);
    else if (!/^[a-z0-9]{20}\.supabase\.co$/.test(hostname)) {
      lines.push("⚠️ Une adresse Supabase a la forme https://(20 lettres).supabase.co : compare avec le « Project URL » de Supabase (Project Settings → Data API)");
    }
    if (pathname !== "/") lines.push("⚠️ L'adresse ne doit rien contenir après « .supabase.co » : enlève la fin (ex. /rest/v1)");
  }
  const keyIssue = (value: string, kind: "publique" | "secrète") => {
    if (!value) return "variable absente";
    const bad = [...value].findIndex((c) => c.charCodeAt(0) > 126 || c.charCodeAt(0) < 33);
    if (bad >= 0) {
      return `contient un caractère interdit « ${value[bad]} » (position ${bad + 1} sur ${value.length}) : la clé a été mal copiée. Recopie-la avec le bouton 📋 de Supabase`;
    }
    const looksPublic = value.startsWith("sb_publishable_");
    const looksSecret = value.startsWith("sb_secret_");
    if (kind === "publique" && looksSecret) return "c'est la clé SECRÈTE qui est collée ici : les deux clés sont inversées";
    if (kind === "secrète" && looksPublic) return "c'est la clé PUBLIQUE qui est collée ici : les deux clés sont inversées";
    if (!looksPublic && !looksSecret && !value.startsWith("eyJ")) return "ne ressemble pas à une clé Supabase (elle doit commencer par sb_publishable_, sb_secret_ ou eyJ)";
    return "";
  };
  const publicIssue = keyIssue(publishableKey, "publique");
  const secretIssue = keyIssue(secretKey, "secrète");
  if (publishableKey && secretKey && publishableKey === secretKey) lines.push("❌ La clé publique et la clé secrète sont identiques : la clé secrète doit être différente");
  ok(!publicIssue, "Clé publique Supabase (PUBLISHABLE_KEY ou ANON_KEY)", publicIssue);
  ok(!secretIssue, "Clé secrète Supabase (SECRET_KEY ou SERVICE_ROLE_KEY)", secretIssue);

  if (urlValid && publishableKey && !publicIssue) {
    try {
      const res = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: publishableKey }, cache: "no-store" });
      ok(res.ok, "Connexion à Supabase avec la clé publique", `refusée (code ${res.status}) : la clé publique ou l'URL ne correspondent pas`);
    } catch (e) {
      const code = (e as { cause?: { code?: string } }).cause?.code;
      const why = code === "ENOTFOUND" ? "cette adresse n'existe pas (faute de frappe, ou projet supprimé/en pause)" : `injoignable${code ? ` (${code})` : ""}`;
      ok(false, "Connexion à Supabase", `${why} : vérifie NEXT_PUBLIC_SUPABASE_URL et que le projet est actif dans Supabase`);
    }
  }

  if (urlValid && secretKey && !secretIssue) {
    try {
      const db = createClient(url, secretKey, { auth: { persistSession: false } });
      const { error } = await db.from("orders").select("id", { head: true, count: "exact" });
      if (!error) ok(true, "Base de données (tables créées)");
      else if (/fetch failed/i.test(error.message)) ok(false, "Base de données", "injoignable : même problème d'adresse que ci-dessus");
      else if (/relation|does not exist|schema cache/i.test(error.message)) ok(false, "Base de données", "les tables n'existent pas : refais l'étape SQL Editor → Run");
      else ok(false, "Clé secrète Supabase", `refusée (${error.message})`);
    } catch {
      ok(false, "Base de données", "erreur de connexion");
    }
  }

  ok(Boolean((process.env.NOTCHPAY_PUBLIC_KEY ?? "").trim()), "Clé Notch Pay (paiements)", "pas encore ajoutée — normal pour l'instant");
  ok(Boolean((process.env.ADMIN_EMAILS ?? "").trim()), "ADMIN_EMAILS (accès au tableau de bord)", "pas encore ajouté");

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
