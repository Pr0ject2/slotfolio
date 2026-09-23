import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

function plainText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const patterns = [
  /\b[3-9]\s*[x×]\s*[3-9]\b/gi,
  /\b[3-9][ -]reels?\b/gi,
  /\b[3-9]\s+reels?\b/gi,
  /\b(?:three|four|five|six|seven|eight|nine)[ -]reels?\b/gi,
  /\b(?:three|four|five|six|seven|eight|nine)\s+reels?\b/gi,
];

function directLayoutSnippets(text: string) {
  const snippets: Array<{ match: string; snippet: string }> = [];
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const index = match.index ?? 0;
      const snippet = text.slice(Math.max(0, index - 150), Math.min(text.length, index + 300));
      if (!snippets.some((item) => item.match === match[0] && item.snippet === snippet)) {
        snippets.push({ match: match[0], snippet });
      }
      if (snippets.length >= 10) return snippets;
    }
  }
  return snippets;
}

test.only("probe exact current Play'n GO missing-field pages for direct official layout wording", async () => {
  const targets = catalogSeeds.filter(
    (seed) => seed.provider === "Play’n GO" && !getVerifiedCatalogDetails(seed.slug)?.field,
  );

  const rows = [];
  for (const seed of targets) {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
    });
    const text = plainText(await response.text());
    const matches = directLayoutSnippets(text);
    if (matches.length) {
      rows.push({ slug: seed.slug, source: seed.source, status: response.status, matches });
    }
  }

  console.log("PLAYNGO_FIELD_PROBE", JSON.stringify({ residual: targets.length, directOfficialRows: rows }));
  expect(targets.length).toBe(-1);
});
