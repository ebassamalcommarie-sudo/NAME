// Catalogue des formations : 4 packs de 4 vidéos + le pack complet.
//
// Pour brancher une vidéo : envoie-la sur Bunny Stream, copie son "Video ID"
// (ex. "3f2c1a9e-...") et colle-le dans `bunnyVideoId` de la leçon.
// Tant que le champ est vide, l'élève voit « Vidéo bientôt disponible ».

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  duration: string;
  bunnyVideoId: string;
};

export type Pack = {
  id: PackId;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  lessons: Lesson[];
};

export type PackId = "pack-1" | "pack-2" | "pack-3" | "pack-4";
export type ProductId = PackId | "bundle";

export const PACK_PRICE = 9900;
export const BUNDLE_PRICE = 34900;
export const CURRENCY = "XAF";

export const packs: Pack[] = [
  {
    id: "pack-1",
    slug: "fondations-du-contenu",
    number: 1,
    title: "Fondations du contenu",
    subtitle: "Poser une stratégie claire avant de publier",
    description:
      "Arrête de publier au hasard. Tu définis ton positionnement, ton audience et une ligne éditoriale qui attire les bonnes personnes.",
    outcomes: [
      "Un positionnement clair et différenciant",
      "Le portrait précis de ton client idéal",
      "Tes piliers de contenu pour ne jamais être à court d'idées",
      "Un calendrier éditorial prêt à l'emploi",
    ],
    lessons: [
      { id: "p1-l1", title: "Trouver ton positionnement", summary: "Ce qui te rend unique et pourquoi on doit te suivre toi.", duration: "", bunnyVideoId: "" },
      { id: "p1-l2", title: "Connaître ton audience", summary: "Identifier ses problèmes, ses désirs et où elle passe son temps.", duration: "", bunnyVideoId: "" },
      { id: "p1-l3", title: "Ta ligne éditoriale et tes piliers", summary: "Les 3 à 5 thèmes qui structurent tout ton contenu.", duration: "", bunnyVideoId: "" },
      { id: "p1-l4", title: "Construire ton calendrier éditorial", summary: "Planifier un mois de contenu en une après-midi.", duration: "", bunnyVideoId: "" },
    ],
  },
  {
    id: "pack-2",
    slug: "creation-au-smartphone",
    number: 2,
    title: "Créer du contenu pro au smartphone",
    subtitle: "Tourner, monter et captiver avec ton téléphone",
    description:
      "Pas besoin d'un gros budget. Tu apprends à filmer, éclairer, monter et écrire des accroches qui retiennent l'attention dès la première seconde.",
    outcomes: [
      "Des vidéos nettes avec un son propre",
      "Un montage rapide et dynamique sur CapCut",
      "Des accroches qui stoppent le scroll",
      "Des scripts simples qui donnent envie d'agir",
    ],
    lessons: [
      { id: "p2-l1", title: "Tourner comme un pro avec ton téléphone", summary: "Cadrage, stabilité et réglages qui changent tout.", duration: "", bunnyVideoId: "" },
      { id: "p2-l2", title: "Lumière et son avec les moyens du bord", summary: "Obtenir une image et un son propres sans matériel coûteux.", duration: "", bunnyVideoId: "" },
      { id: "p2-l3", title: "Monter rapidement sur CapCut", summary: "Coupes, sous-titres, rythme et musique.", duration: "", bunnyVideoId: "" },
      { id: "p2-l4", title: "Accroches et scripts qui captivent", summary: "Les structures qui gardent l'audience jusqu'à la fin.", duration: "", bunnyVideoId: "" },
    ],
  },
  {
    id: "pack-3",
    slug: "croissance-reseaux-sociaux",
    number: 3,
    title: "Croissance sur TikTok, Facebook & Instagram",
    subtitle: "Comprendre les algorithmes et grandir vite",
    description:
      "Tu comprends comment chaque plateforme distribue le contenu et tu appliques une stratégie adaptée pour gagner des abonnés qualifiés.",
    outcomes: [
      "Le fonctionnement réel des algorithmes",
      "Une stratégie TikTok pour exploser ta visibilité",
      "Facebook et Instagram Reels au service de ta marque",
      "Lire tes statistiques et ajuster ce qui marche",
    ],
    lessons: [
      { id: "p3-l1", title: "Comment fonctionnent les algorithmes", summary: "Ce que TikTok, Facebook et Instagram récompensent vraiment.", duration: "", bunnyVideoId: "" },
      { id: "p3-l2", title: "La stratégie TikTok", summary: "Formats, fréquence et tendances pour grandir vite.", duration: "", bunnyVideoId: "" },
      { id: "p3-l3", title: "Facebook et Instagram Reels", summary: "Adapter ton contenu et bâtir une communauté engagée.", duration: "", bunnyVideoId: "" },
      { id: "p3-l4", title: "Analyser tes statistiques", summary: "Les chiffres à suivre et comment décider quoi publier.", duration: "", bunnyVideoId: "" },
    ],
  },
  {
    id: "pack-4",
    slug: "vendre-avec-les-reseaux-et-l-ia",
    number: 4,
    title: "Vendre grâce aux réseaux & à l'IA",
    subtitle: "Transformer tes abonnés en clients",
    description:
      "Tu passes de la visibilité aux ventes : publicité à petit budget, conversion sur WhatsApp et outils d'IA pour produire 10 fois plus vite.",
    outcomes: [
      "Un tunnel simple de l'abonné au client",
      "Des publicités Meta efficaces avec un petit budget",
      "Une méthode de vente sur WhatsApp Business",
      "Les outils d'IA pour créer plus vite et mieux",
    ],
    lessons: [
      { id: "p4-l1", title: "Transformer tes abonnés en clients", summary: "Construire un parcours qui mène naturellement à l'achat.", duration: "", bunnyVideoId: "" },
      { id: "p4-l2", title: "La publicité Meta avec un petit budget", summary: "Cibler, tester et rentabiliser chaque franc dépensé.", duration: "", bunnyVideoId: "" },
      { id: "p4-l3", title: "Vendre sur WhatsApp Business", summary: "Catalogue, messages automatiques et conclusion de la vente.", duration: "", bunnyVideoId: "" },
      { id: "p4-l4", title: "L'IA pour créer 10 fois plus vite", summary: "Idées, scripts, visuels et voix générés avec l'IA.", duration: "", bunnyVideoId: "" },
    ],
  },
];

export const bundle = {
  id: "bundle" as const,
  slug: "pack-complet",
  title: "Pack complet — Les 16 vidéos",
  subtitle: "Les 4 packs, de la stratégie aux ventes",
  description:
    "Le parcours complet pour passer de zéro à une présence en ligne qui vend : stratégie, création, croissance et conversion avec l'IA.",
};

export type Product = {
  id: ProductId;
  title: string;
  price: number;
  packIds: PackId[];
};

export const products: Record<ProductId, Product> = {
  "pack-1": { id: "pack-1", title: `Pack 1 — ${packs[0].title}`, price: PACK_PRICE, packIds: ["pack-1"] },
  "pack-2": { id: "pack-2", title: `Pack 2 — ${packs[1].title}`, price: PACK_PRICE, packIds: ["pack-2"] },
  "pack-3": { id: "pack-3", title: `Pack 3 — ${packs[2].title}`, price: PACK_PRICE, packIds: ["pack-3"] },
  "pack-4": { id: "pack-4", title: `Pack 4 — ${packs[3].title}`, price: PACK_PRICE, packIds: ["pack-4"] },
  bundle: { id: "bundle", title: bundle.title, price: BUNDLE_PRICE, packIds: ["pack-1", "pack-2", "pack-3", "pack-4"] },
};

export const BUNDLE_SAVINGS = PACK_PRICE * packs.length - BUNDLE_PRICE;

export function isProductId(value: string): value is ProductId {
  return value in products;
}

export function getPackBySlug(slug: string) {
  return packs.find((p) => p.slug === slug);
}

export function getPackById(id: string) {
  return packs.find((p) => p.id === id);
}

export function formatFCFA(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount).replace(/ | /g, " ")} FCFA`;
}
