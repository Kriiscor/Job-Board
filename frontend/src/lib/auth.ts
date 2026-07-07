const CLIENT_ID = import.meta.env.VITE_FRANCE_TRAVAIL_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_FRANCE_TRAVAIL_CLIENT_SECRET;
const TOKEN_URL = "/proxy/token?realm=/partenaire";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: "api_offresdemploiv2 o2dsoffre",
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error_description ??
        `Authentification échouée (${response.status})`,
    );
  }

  const data = await response.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return tokenCache.token;
}

export function clearTokenCache() {
  tokenCache = null;
}
