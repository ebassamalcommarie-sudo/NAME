# Airgé Agency — Plateforme

Site de l'agence + plateforme de formations vidéo, avec paiement par **Orange Money, MTN MoMo et carte bancaire**.

- **Site** : Next.js 16 (pages pré-générées, chargement instantané), hébergé sur **Vercel**
- **Comptes élèves et base de données** : **Supabase**
- **Paiement** : **Notch Pay** (Cameroun : Orange Money, MTN Mobile Money, Visa/Mastercard)
- **Vidéos protégées** : **Bunny Stream** (liens signés, impossibles à partager)

## Pages

| Adresse | Contenu |
|---|---|
| `/` | Accueil |
| `/services` | Services de l'agence (devis via WhatsApp) |
| `/formations` | Les 4 packs + le pack complet |
| `/formations/[pack]` | Détail d'un pack et bouton d'achat |
| `/connexion`, `/inscription` | Comptes élèves |
| `/mon-espace` | Formations achetées et progression |
| `/mon-espace/[pack]/[vidéo]` | Lecteur vidéo |
| `/paiement/retour` | Confirmation du paiement |
| `/admin` | Ventes, revenus, élèves (réservé aux emails de `ADMIN_EMAILS`) |
| `/cgv`, `/confidentialite` | Pages légales (modèles à faire relire) |

## Modifier le contenu

- Packs, vidéos et prix : `src/content/catalogue.ts`
- Services : `src/content/services.ts`
- Questions fréquentes : `src/content/faq.ts`
- Contacts et réseaux : variables `NEXT_PUBLIC_*` (voir `.env.example`)

## Mise en ligne — étape par étape

### 1. Supabase (comptes + base de données)
1. Crée un compte sur [supabase.com](https://supabase.com), puis un projet (région la plus proche : Europe).
2. **SQL Editor → New query** : colle le contenu de `supabase/schema.sql` puis **Run**.
3. **Authentication → URL Configuration** : mets l'adresse du site dans *Site URL* et ajoute `https://TON-DOMAINE/auth/callback` dans *Redirect URLs*.
4. **Project Settings → API Keys** : récupère l'URL, la clé *publishable* et la clé *secret*.

### 2. Notch Pay (paiements)
1. Crée un compte sur [notchpay.co](https://notchpay.co) et complète la vérification de l'entreprise (KYC).
2. **Paramètres → Développeur** : copie la clé publique (`pk_test...` pour tester, `pk...` en réel) et la clé de hachage.
3. Ajoute le webhook : `https://TON-DOMAINE/api/webhooks/notchpay`.

### 3. Bunny Stream (vidéos)
1. Crée un compte sur [bunny.net](https://bunny.net) → **Stream → Add Video Library**.
2. Envoie les 16 vidéos, puis copie l'ID de chaque vidéo dans `src/content/catalogue.ts` (champ `bunnyVideoId`).
3. **Security** : active *Embed view token authentication* et copie la clé dans `BUNNY_STREAM_TOKEN_KEY`. Ajoute ton domaine dans *Allowed domains*.

### 4. Vercel (hébergement)
1. Sur [vercel.com](https://vercel.com), importe ce dépôt GitHub.
2. Colle toutes les variables de `.env.example` dans **Settings → Environment Variables**.
3. **Deploy**, puis branche ton nom de domaine dans **Settings → Domains**.

### 5. Tester avant de vendre
Avec la clé Notch Pay de test, achète un pack : tu dois être redirigé vers Notch Pay, puis revenir sur `/paiement/retour` avec « Paiement confirmé » et voir le pack dans `/mon-espace`. Passe ensuite à la clé live.

## Développement local

```bash
npm install
cp .env.example .env.local   # puis remplis les valeurs
npm run dev                  # http://localhost:3000
```

Sans clés, le site fonctionne en mode vitrine : les pages s'affichent, et l'achat ainsi que la connexion indiquent qu'ils seront bientôt disponibles.

## Sécurité du paiement

L'accès à un pack n'est jamais donné sur la seule base de ce que renvoie le navigateur ou le webhook : le serveur re-vérifie toujours la transaction (statut et montant) auprès de l'API Notch Pay avant d'ouvrir l'accès.
