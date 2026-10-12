import "server-only";
import { createHash } from "node:crypto";
import { env } from "@/lib/env";

/**
 * Lien de lecture Bunny Stream signé, valable quelques heures.
 * Active « Token authentication » dans la librairie Bunny pour que seuls
 * les liens signés fonctionnent (les vidéos ne peuvent alors pas être partagées).
 */
export function signedEmbedUrl(videoId: string, ttlSeconds = 4 * 60 * 60) {
  if (!env.bunnyLibraryId || !videoId) return null;
  const url = new URL(`https://iframe.mediadelivery.net/embed/${env.bunnyLibraryId}/${videoId}`);
  if (env.bunnyTokenKey) {
    const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
    const token = createHash("sha256").update(env.bunnyTokenKey + videoId + expires).digest("hex");
    url.searchParams.set("token", token);
    url.searchParams.set("expires", String(expires));
  }
  url.searchParams.set("autoplay", "false");
  url.searchParams.set("preload", "true");
  url.searchParams.set("responsive", "true");
  return url.toString();
}
