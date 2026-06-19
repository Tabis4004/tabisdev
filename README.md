# Tabis Dev — Site vitrine

Site vitrine du portfolio [tabisdev.com](https://tabisdev.com), présentant les produits numériques de Tabis Dev.

## Produits présentés

| Produit | URL | Backend |
|---------|-----|---------|
| Tibus | https://tibus.app | Application séparée |
| Gestabiscom | https://gestabiscom.cervel.app | `hbr_backend` (NestJS) |
| TabisPay | https://tabispay.cervel.app | Backend dédié TabisPay |
| TabisRide | https://tabisride.vercel.app | Backend dédié TabisRide |

## Architecture — Où est le backend ?

**Ce site n'a pas de backend.** C'est une vitrine statique (Next.js) qui affiche du contenu et des liens vers vos applications.

```
tabisdev.com (Vercel)
└── Site vitrine statique — HTML/CSS/JS, images, pas d'API

tibus.app          → son propre backend
gestabiscom.*      → hbr_backend (NestJS + PostgreSQL)
tabispay.*         → backend paiement dédié
tabisride.*        → backend mobilité dédié
```

Chaque produit garde son infrastructure indépendante. Ce repo ne contient que le frontend vitrine.

> Pour un formulaire de contact plus tard : API route Vercel serverless, Resend/Formspree, ou lien `mailto:` (déjà en place).

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement Vercel

1. Importer ce repo GitHub sur [vercel.com/new](https://vercel.com/new)
2. Framework : **Next.js** (détecté automatiquement)
3. Build : `npm run build` — Output : défaut Next.js
4. Ajouter le domaine `tabisdev.com` dans **Settings → Domains**
5. Configurer les DNS chez votre registrar (enregistrements fournis par Vercel)

Aucune variable d'environnement requise pour l'instant.

## Captures d'écran

Les screenshots sont dans `public/screenshots/`. Pour les régénérer :

```bash
node scripts/capture-screenshots.cjs   # apps en ligne
node scripts/generate-mocks.cjs        # aperçus stylisés
```
