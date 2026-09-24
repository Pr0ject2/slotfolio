import { expect, test } from "@playwright/test";

const bundleUrl = "https://cdn.playngonetwork.com/hera/hera-1.46.0.29/container-launcher/ContainerLauncher_bundle.js";

function snippets(body: string, needle: RegExp, limit = 20) {
  const rows: string[] = [];
  for (const match of body.matchAll(needle)) {
    const index = match.index ?? 0;
    const text = body.slice(Math.max(0, index - 220), Math.min(body.length, index + match[0].length + 320));
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!rows.includes(normalized)) rows.push(normalized);
    if (rows.length >= limit) break;
  }
  return rows;
}

test.only("probe official Play'n GO launcher bundle for runtime endpoints", async ({ request }) => {
  const response = await request.get(bundleUrl, { timeout: 30_000 });
  const body = await response.text();

  const absoluteUrls = [...new Set(body.match(/https?:\\?\/\\?\/[^"'`\\s)]+/g) ?? [])].slice(0, 100);
  const pathStrings = [...new Set(
    [...body.matchAll(/["'`]([^"'`]{0,180}(?:casino|launch|config|resource|game|api|ticket)[^"'`]{0,180})["'`]/gi)]
      .map((match) => match[1])
      .filter((value) => value.includes("/") || value.includes("Url") || value.includes("URL")),
  )].slice(0, 150);

  const result = {
    status: response.status(),
    contentType: response.headers()["content-type"],
    size: body.length,
    absoluteUrls,
    pathStrings,
    gameId: snippets(body, /gameId/gi),
    resourceRoot: snippets(body, /resourceRoot/gi),
    ticket: snippets(body, /ticket/gi),
    launch: snippets(body, /launch/gi),
    config: snippets(body, /config/gi),
    api: snippets(body, /api/gi),
  };

  console.log("PLAYNGO_LAUNCHER_BUNDLE_PROBE", JSON.stringify(result));
  expect(body.length).toBe(-1);
});
