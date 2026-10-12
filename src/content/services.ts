// Services de l'agence. Modifie librement les textes et les prix.

export type Service = {
  id: string;
  icon: "camera" | "users" | "target" | "sparkles" | "palette" | "compass";
  title: string;
  pitch: string;
  deliverables: string[];
  price: string;
  highlight?: boolean;
};

export const services: Service[] = [
  {
    id: "creation-contenu",
    icon: "camera",
    title: "Création de contenu",
    pitch: "Des vidéos et visuels qui arrêtent le scroll et racontent ta marque.",
    deliverables: ["Vidéos courtes TikTok / Reels", "Visuels et carrousels", "Scripts et accroches", "Tournage et montage"],
    price: "Sur devis",
  },
  {
    id: "community-management",
    icon: "users",
    title: "Community management",
    pitch: "On anime tes pages chaque semaine pendant que tu gères ton business.",
    deliverables: ["Calendrier éditorial mensuel", "Publication et modération", "Réponses aux messages", "Rapport de performance"],
    price: "Sur devis",
  },
  {
    id: "contenu-ia",
    icon: "sparkles",
    title: "Contenu & automatisation IA",
    pitch: "L'intelligence artificielle au service de ta marque pour produire plus, plus vite.",
    deliverables: ["Visuels et vidéos générés par IA", "Avatars et voix off IA", "Chatbot WhatsApp / site", "Automatisation des réponses"],
    price: "Sur devis",
    highlight: true,
  },
  {
    id: "publicite",
    icon: "target",
    title: "Publicité en ligne",
    pitch: "Des campagnes Meta et TikTok Ads rentables, même avec un petit budget.",
    deliverables: ["Stratégie et ciblage", "Création des publicités", "Suivi et optimisation", "Rapport des résultats"],
    price: "Sur devis",
  },
  {
    id: "branding",
    icon: "palette",
    title: "Branding & identité",
    pitch: "Une image de marque cohérente qui inspire confiance au premier regard.",
    deliverables: ["Logo et charte graphique", "Templates réseaux sociaux", "Ton et message de marque", "Optimisation des profils"],
    price: "Sur devis",
  },
  {
    id: "coaching",
    icon: "compass",
    title: "Stratégie & coaching",
    pitch: "Un accompagnement personnalisé pour bâtir ta présence en ligne.",
    deliverables: ["Audit de tes réseaux", "Plan d'action sur 90 jours", "Séances de coaching", "Suivi personnalisé"],
    price: "Sur devis",
  },
];
