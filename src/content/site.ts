// Informations générales du site. Modifie ce fichier pour mettre à jour
// les contacts et les liens vers les réseaux sociaux.

export const site = {
  name: "Airgé Agency",
  shortName: "Airgé",
  tagline: "Marketing de contenu & IA pour les marques africaines",
  description:
    "Airgé Agency aide les entrepreneurs et les marques africaines à créer du contenu qui vend, grâce à la stratégie, la création vidéo et l'intelligence artificielle. Formations en création de contenu et marketing des réseaux sociaux.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  city: "Cameroun",
  // Numéro WhatsApp au format international sans "+" ni espaces, ex. 2376XXXXXXXX
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@airge.agency",
  socials: [
    { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://www.tiktok.com/" },
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/" },
  ],
} as const;

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `mailto:${site.email}?subject=${encodeURIComponent("Demande - Airgé Agency")}&body=${text}`;
}

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/formations", label: "Formations" },
  { href: "/#methode", label: "Méthode" },
  { href: "/contact", label: "Contact" },
] as const;
