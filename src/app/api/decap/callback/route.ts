import type { NextRequest } from "next/server";
import { STATE_COOKIE, decapResultPage, getOAuthConfig } from "@/lib/decap-oauth";

export const dynamic = "force-dynamic";

/** Étape 2 : GitHub revient ici → échange du code, contrôle du compte, envoi du jeton à Decap. */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    return decapResultPage(origin, "error", { message: "Requête OAuth invalide ou expirée." });
  }

  const { clientId, clientSecret, allowedUsers } = await getOAuthConfig();
  if (!clientId || !clientSecret) {
    return decapResultPage(origin, "error", { message: "OAuth GitHub non configuré." });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "tabisdev-decap-oauth",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${origin}/api/decap/callback`,
    }),
  });
  const tokenData = (await tokenResponse.json().catch(() => ({}))) as {
    access_token?: string;
    error_description?: string;
  };

  if (!tokenData.access_token) {
    return decapResultPage(origin, "error", {
      message: tokenData.error_description ?? "Échec de l'échange du code GitHub.",
    });
  }

  // Seuls les comptes GitHub listés dans DECAP_ALLOWED_USERS peuvent éditer
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tabisdev-decap-oauth",
    },
  });
  const user = (await userResponse.json().catch(() => ({}))) as { login?: string };

  if (!user.login || !allowedUsers.includes(user.login.toLowerCase())) {
    return decapResultPage(origin, "error", {
      message: "Ce compte GitHub n'est pas autorisé à éditer le site.",
    });
  }

  return decapResultPage(origin, "success", {
    token: tokenData.access_token,
    provider: "github",
  });
}
