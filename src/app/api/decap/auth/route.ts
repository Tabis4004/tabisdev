import { NextResponse, type NextRequest } from "next/server";
import { ALLOWED_SCOPES, STATE_COOKIE, getOAuthConfig } from "@/lib/decap-oauth";

export const dynamic = "force-dynamic";

/** Étape 1 : Decap ouvre cette URL dans une popup → redirection vers GitHub. */
export async function GET(request: NextRequest) {
  const { clientId } = await getOAuthConfig();
  if (!clientId) {
    return new NextResponse("OAuth GitHub non configuré (GITHUB_CLIENT_ID manquant).", {
      status: 500,
    });
  }

  const url = new URL(request.url);
  const requested = url.searchParams.get("scope") ?? "public_repo";
  const scope = (ALLOWED_SCOPES as readonly string[]).includes(requested)
    ? requested
    : "public_repo";
  const state = crypto.randomUUID();

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/decap/callback`);
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("allow_signup", "false");

  const response = NextResponse.redirect(authorize.toString());
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/decap",
    maxAge: 600,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
