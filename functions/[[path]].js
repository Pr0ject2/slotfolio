// _routes.json invokes this Function only for the retired information sections.
// Active pages and assets keep the existing static Pages serving path.
export const retiredInformationPath = /^\/(?:(?:en|es)\/)?(?:disclosure|regions)(?:\/|$)/;

export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Strict-Transport-Security": "max-age=86400",
};

function fallbackHtml(locale) {
  const copy = {
    ru: ["Страница не найдена", "Эта страница больше недоступна.", "Открыть каталог"],
    en: ["Page not found", "This page is no longer available.", "Browse the catalogue"],
    es: ["Página no encontrada", "Esta página ya no está disponible.", "Ver el catálogo"],
  }[locale];
  const prefix = locale === "ru" ? "" : "/" + locale;
  // Only fixed locale strings are interpolated, never request/query content.
  return `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${copy[0]} — Slotfolio</title><body><main><p>slotfolio.</p><h1>${copy[0]}</h1><p>${copy[1]}</p><a href="${prefix}/slots/">${copy[2]}</a></main></body></html>`;
}

/** @param {{request: Request, env: {ASSETS: {fetch: (request: Request) => Promise<Response>}}, next: () => Promise<Response>}} context */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (!retiredInformationPath.test(url.pathname)) return context.next();
  const locale = /^\/(en|es)(?:\/|$)/.exec(url.pathname)?.[1] || "ru";
  const headers = new Headers({
    ...securityHeaders,
    "Content-Type": "text/html; charset=utf-8",
    "Content-Language": locale,
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Slotfolio-Route-State": "removed",
  });
  if (context.request.method === "HEAD") return new Response(null, { status: 404, headers });

  let body = fallbackHtml(locale);
  try {
    // Read the current build's existing 404 asset, never the retired URL.
    // Do not forward conditional, authorization, cookie or user query headers.
    const assetUrl = new URL(locale === "es" ? "/es/404/" : "/404/", url.origin);
    const asset = await context.env.ASSETS.fetch(new Request(assetUrl, {
      method: "GET", headers: { Accept: "text/html" },
    }));
    if ((asset.status === 200 || asset.status === 404) &&
        asset.headers.get("content-type")?.toLowerCase().startsWith("text/html")) {
      body = await asset.text();
    } else await asset.body?.cancel();
  } catch {
    // The retired route must remain 404 even if the 404 asset cannot be read.
  }
  // Fresh headers intentionally discard an asset's ETag/Age/cache/cookies.
  return new Response(body, { status: 404, headers });
}
