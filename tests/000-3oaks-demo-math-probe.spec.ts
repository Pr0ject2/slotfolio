import { expect, test } from "@playwright/test";

const absoluteUrl = (base: string, value: string) => {
  try {
    return new URL(value, base).toString();
  } catch {
    return null;
  }
};

const snippets = (text: string) => {
  const lowered = text.toLowerCase();
  const keys = ["rtp", "returntoplayer", "return to player", "maxwin", "max_win", "max win", "volatility", "variance"];
  const out: string[] = [];
  for (const key of keys) {
    let from = 0;
    while (out.length < 40) {
      const index = lowered.indexOf(key, from);
      if (index < 0) break;
      out.push(text.slice(Math.max(0, index - 250), Math.min(text.length, index + 500)).replace(/\s+/g, " "));
      from = index + key.length;
    }
  }
  return [...new Set(out)].slice(0, 40);
};

test.only("probe official 3 Oaks demo math configuration", async ({ request }) => {
  const apiUrl = "https://3oaks.com/api/v1/games/15_dragon_pearls";
  const apiResponse = await request.get(apiUrl, { timeout: 30_000 });
  const apiText = await apiResponse.text();
  const api = JSON.parse(apiText) as { data?: { game_url?: string } };
  const gameUrl = api.data?.game_url;
  if (!gameUrl) throw new Error(`No game_url in provider API: ${apiText.slice(0, 1000)}`);

  const pageResponse = await request.get(gameUrl, { timeout: 30_000 });
  const html = await pageResponse.text();
  const assetRefs = [
    ...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|json)(?:\?[^"']*)?)["']/gi),
  ]
    .map((match) => absoluteUrl(gameUrl, match[1]))
    .filter((value): value is string => Boolean(value));

  const assets = [...new Set(assetRefs)].slice(0, 30);
  const hits: Array<{ url: string; status: number; snippets: string[] }> = [];
  for (const url of assets) {
    try {
      const response = await request.get(url, { timeout: 20_000 });
      const text = await response.text();
      const found = snippets(text);
      if (found.length) hits.push({ url, status: response.status(), snippets: found });
    } catch {
      // Diagnostic only: one inaccessible asset must not stop the rest of the probe.
    }
  }

  console.log("THREE_OAKS_DEMO_MATH", JSON.stringify({
    apiStatus: apiResponse.status(),
    gameUrl,
    pageStatus: pageResponse.status(),
    htmlLength: html.length,
    htmlSnippets: snippets(html),
    assets,
    hits,
  }));

  expect(hits.length + snippets(html).length).toBe(-1);
});
