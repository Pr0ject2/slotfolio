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

async function fetchOfficialPage(source: string) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      return await fetch(source, {
        headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
        signal: AbortSignal.timeout(8_000),
      });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

test.only("probe exact current Play'n GO missing-field pages for direct official layout wording", async () => {
  test.setTimeout(120_000);

  const targets = catalogSeeds.filter(
    (seed) => seed.provider === "Play’n GO" && !getVerifiedCatalogDetails(seed.slug)?.field,
  );

  const rows: Array<{
    slug: string;
    source: string;
    status: number;
    matches: Array<{ match: string; snippet: string }>;
  }> = [];
  const errors: Array<{ slug: string; source: string; error: string }> = [];
  const batchSize = 6;

  for (let index = 0; index < targets.length; index += batchSize) {
    const batch = targets.slice(index, index + batchSize);
    const results = await Promise.all(
      batch.map(async (seed) => {
        try {
          const response = await fetchOfficialPage(seed.source);
          const text = plainText(await response.text());
          return {
            row: {
              slug: seed.slug,
              source: seed.source,
              status: response.status,
              matches: directLayoutSnippets(text),
            },
          };
        } catch (error) {
          return { error: { slug: seed.slug, source: seed.source, error: String(error) } };
        }
      }),
    );

    for (const result of results) {
      if (result.row?.matches.length) rows.push(result.row);
      if (result.error) errors.push(result.error);
    }
  }

  console.log(
    "PLAYNGO_FIELD_PROBE",
    JSON.stringify({ residual: targets.length, directOfficialRows: rows, errors }),
  );
  expect(targets.length).toBe(-1);
});
