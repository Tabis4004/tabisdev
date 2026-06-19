# Éditer le site tabisdev.com

Tout le contenu textuel du site est dans **`content/site.json`**.

## Option 1 — Interface web (recommandé)

### En local

```bash
npm install
npm run dev        # terminal 1 — site sur http://localhost:3000
npm run cms        # terminal 2 — éditeur sur http://localhost:3000/admin
```

Ouvrez **http://localhost:3000/admin**, modifiez le contenu, puis cliquez **Publier**. Les changements sont enregistrés dans `content/site.json` et poussés sur GitHub après commit.

### En production

1. Allez sur **https://tabisdev.com/admin** (ou tabisdev.vercel.app/admin)
2. Connectez-vous avec votre compte **GitHub** (accès au repo `Tabis4004/tabisdev`)
3. Modifiez et publiez — Vercel redéploie automatiquement

> **Première utilisation en prod** : il faut configurer l'authentification GitHub OAuth. Voir la section ci-dessous.

---

## Option 2 — GitHub directement

1. Ouvrez [content/site.json](https://github.com/Tabis4004/tabisdev/edit/main/content/site.json) sur GitHub
2. Modifiez le texte
3. Cliquez **Commit changes** — Vercel redéploie en ~1 min

---

## Option 3 — Cursor / éditeur de code

Modifiez `content/site.json` localement, puis :

```bash
git add content/site.json
git commit -m "Mise à jour du contenu"
git push
```

---

## Ce que vous pouvez modifier

| Section | Exemples |
|---------|----------|
| **Email, domaine** | `email`, `domain` |
| **Hero** | Titre, sous-titre, statistiques (4+, 5K+…) |
| **Produits** | Nom, slogan, description, URL, fonctionnalités |
| **À propos** | Titre, texte, 3 valeurs |
| **Contact** | Titre, texte, bouton |

Les **couleurs** et **captures d'écran** de chaque produit restent dans le code (`src/data/portfolio.ts`). Contactez un développeur pour les changer.

---

## Configurer l'éditeur en production (une fois)

Pour que `/admin` fonctionne sur tabisdev.com sans `npm run cms` :

1. GitHub → **Settings → Developer settings → OAuth Apps → New**
   - Homepage : `https://tabisdev.com`
   - Callback : `https://api.netlify.com/auth/done` *(ou votre propre service OAuth)*

2. Déployez un petit service OAuth (ex. [decap-cms-github-oauth](https://github.com/daresaydigital/decap-cms-github-oauth-provider)) sur Vercel

3. Dans `public/admin/config.yml`, ajoutez :
   ```yaml
   backend:
     name: github
     repo: Tabis4004/tabisdev
     branch: main
     base_url: https://votre-oauth.vercel.app
     auth_endpoint: auth
   ```

En attendant, utilisez **GitHub** (option 2) ou l'éditeur **local** (option 1).
