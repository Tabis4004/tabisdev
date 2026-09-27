import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Passerelle OAuth GitHub pour Decap CMS (/admin), servie par le Worker du site.
 *
 * Secrets (Cloudflare → Worker tabisdev → Settings → Variables and Secrets,
 * ou `npx wrangler secret put …`) :
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 * Variable (wrangler.jsonc → vars) :
 *   DECAP_ALLOWED_USERS — logins GitHub autorisés, séparés par des virgules
 */

type OAuthEnv = {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  DECAP_ALLOWED_USERS?: string;
};

export const STATE_COOKIE = "decap_oauth_state";
export const ALLOWED_SCOPES = ["public_repo", "repo"] as const;

export async function getOAuthConfig() {
  let env: OAuthEnv = {};
  try {
    env = (await getCloudflareContext({ async: true })).env as OAuthEnv;
  } catch {
    // Hors runtime Cloudflare : on se rabat sur process.env
  }

  const allowed =
    env.DECAP_ALLOWED_USERS ?? process.env.DECAP_ALLOWED_USERS ?? "Tabis4004";

  return {
    clientId: env.GITHUB_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: env.GITHUB_CLIENT_SECRET ?? process.env.GITHUB_CLIENT_SECRET ?? "",
    allowedUsers: allowed
      .split(",")
      .map((u) => u.trim().toLowerCase())
      .filter(Boolean),
  };
}

/** Page renvoyée dans la popup : transmet le résultat à Decap par postMessage. */
export function decapResultPage(
  origin: string,
  status: "success" | "error",
  payload: Record<string, string>
) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const safe = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Connexion…</title></head>
<body>
<p>${status === "success" ? "Connexion réussie, vous pouvez fermer cette fenêtre." : "Connexion refusée."}</p>
<script>
(function () {
  var ORIGIN = ${safe(origin)};
  var MESSAGE = ${safe(message)};
  if (!window.opener) return;
  function receive(e) {
    if (e.origin !== ORIGIN) return;
    window.removeEventListener("message", receive, false);
    window.opener.postMessage(MESSAGE, ORIGIN);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", ORIGIN);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status: status === "success" ? 200 : 403,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${STATE_COOKIE}=; Path=/api/decap; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
