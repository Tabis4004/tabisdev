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

1. Allez sur **https://tabisdev.com/admin** (ou tabisdev.isidoretabati.workers.dev/admin)
2. Connectez-vous avec votre compte **GitHub** (accès au repo `Tabis4004/tabisdev`)
3. Modifiez et publiez — Cloudflare redéploie automatiquement

> **Première utilisation en prod** : il faut configurer l'authentification GitHub OAuth. Voir la section ci-dessous.

---

## Option 2 — GitHub directement

1. Ouvrez [content/site.json](https://github.com/Tabis4004/tabisdev/edit/main/content/site.json) sur GitHub
2. Modifiez le texte
3. Cliquez **Commit changes** — le site est redéployé sur Cloudflare en ~2 min

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

La connexion GitHub de `/admin` passe par une petite passerelle OAuth intégrée au site
(`src/app/api/decap/auth` et `src/app/api/decap/callback`). Aucun service externe à déployer.

1. **Créer l'OAuth App GitHub** — GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Application name : `Tabis Dev CMS`
   - Homepage URL : `https://tabisdev.isidoretabati.workers.dev`
   - Authorization callback URL : `https://tabisdev.isidoretabati.workers.dev/api/decap/callback`
   - Puis **Generate a new client secret** et notez le *Client ID* et le *Client secret*.

2. **Enregistrer les secrets dans le Worker** :
   ```bash
   npx wrangler secret put GITHUB_CLIENT_ID      # colle le Client ID
   npx wrangler secret put GITHUB_CLIENT_SECRET  # colle le Client secret
   ```

3. **Comptes autorisés** : seuls les logins GitHub listés dans `DECAP_ALLOWED_USERS`
   (`wrangler.jsonc` → `vars`, par défaut `Tabis4004`) peuvent se connecter, même s'ils ont accès au dépôt.

4. **(Recommandé) Verrouiller `/admin` avec Cloudflare Access** — Zero Trust → Access → Applications →
   Self-hosted → domaine du site, chemin `admin` → policy *Allow* sur votre e-mail (code à usage unique).

### Passage sur tabisdev.com

Quand le domaine sera branché au Worker, remplacez l'adresse `tabisdev.isidoretabati.workers.dev` :
- dans `public/admin/config.yml` (`base_url`) ;
- dans l'OAuth App GitHub (Homepage + callback URL).

En attendant, l'éditeur **local** (option 1) et **GitHub** (option 2) fonctionnent toujours.
