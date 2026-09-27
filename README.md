# Tabis Dev — Site vitrine

Site vitrine du portfolio [tabisdev.com](https://tabisdev.com), présentant les produits numériques de Tabis Dev.

## Produits présentés

| Produit | URL | Backend |
|---------|-----|---------|
| Tibus | https://tibus.app | Application séparée |
| Tibus Courrier | https://courrier-agent.isidoretabati.workers.dev | Application séparée (monorepo tibus-front) |
| Tista | https://tista.isidoretabati.workers.dev | Application séparée |
| TiConnect | https://ticonnect.isidoretabati.workers.dev | Application séparée |
| Gestabiscom | https://gestabiscom.cervel.app | `hbr_backend` (NestJS) |
| TabisPay | https://tabispay.cervel.app | Backend dédié TabisPay |
| TabisRide | https://tibusride.lovable.app | Backend dédié TabisRide |

## Architecture — Où est le backend ?

**Ce site n'a pas de backend.** C'est une vitrine Next.js (pages pré-rendues) qui affiche du contenu et des liens vers vos applications. Elle est hébergée sur **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare).

```
tabisdev.com (Cloudflare Workers — Worker « tabisdev »)
└── Site vitrine — HTML/CSS/JS, images, pas d'API

tibus.app          → son propre backend
courrier-agent.*   → Tibus Courrier (monorepo tibus-front)
tista.*            → Tista
ticonnect.*        → TiConnect
gestabiscom.*      → hbr_backend (NestJS + PostgreSQL)
tabispay.*         → backend paiement dédié
tabisride.*        → backend mobilité dédié
```

Chaque produit garde son infrastructure indépendante. Ce repo ne contient que le frontend vitrine.

> Pour un formulaire de contact plus tard : route API servie par le Worker, Resend/Formspree, ou lien `mailto:` (déjà en place).

## Développement local

```bash
npm install
npm run dev        # http://localhost:3000
npm run preview    # aperçu dans le runtime Cloudflare (workerd)
```

## Déploiement Cloudflare Workers

Le site est déployé sur le Worker **`tabisdev`** (https://tabisdev.isidoretabati.workers.dev).
Configuration : `wrangler.jsonc` + `open-next.config.ts`.

### Automatique (Workers Builds)

Le Worker `tabisdev` est relié au dépôt GitHub (Cloudflare → Workers & Pages → tabisdev → **Settings → Build**).
Chaque `git push` sur `main` construit et déploie le site. Réglages attendus :

| Champ | Valeur |
|-------|--------|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` |

> Ne pas utiliser `npm run build` + `npx wrangler deploy` : le build Next.js seul ne produit pas
> la sortie OpenNext et le déploiement échoue (« Could not find compiled Open Next config »).

### Manuel

```bash
npx wrangler login   # une seule fois
npm run deploy
```

### Domaine personnalisé

Cloudflare → Workers & Pages → `tabisdev` → **Settings → Domains & Routes → Add → Custom domain** → `tabisdev.com` (le domaine doit être une zone de votre compte Cloudflare).

## Éditer le contenu du site

Tout le texte (email, titres, produits, liens…) est dans **`content/site.json`**.

- **Interface web** : [EDITING.md](./EDITING.md) — `/admin` avec Decap CMS
- **Rapide** : modifier `content/site.json` sur GitHub → Cloudflare redéploie automatiquement

```bash
npm run dev   # site
npm run cms   # éditeur local → http://localhost:3000/admin
```

## Captures d'écran

Les screenshots sont dans `public/screenshots/`. Pour les régénérer :

```bash
node scripts/capture-screenshots.cjs   # apps en ligne
node scripts/generate-mocks.cjs        # aperçus stylisés
```
