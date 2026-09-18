import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
}

function decodeText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&times;/gi, "×")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeVolatility(value: string | null) {
  if (!value) return null;
  const key = value.toLowerCase().replace(/\s+/g, " ").trim();
  const map: Record<string, string> = {
    low: "Низкая",
    "low-medium": "Низкая–средняя",
    medium: "Средняя",
    standard: "Стандартная",
    "medium-high": "Средняя–высокая",
    high: "Высокая",
    "very high": "Очень высокая",
    extreme: "Экстремальная",
  };
  return map[key] ?? value;
}

function parseGameInfo(html: string) {
  const text = decodeText(html);
  const start = text.indexOf("Game Info");
  const end = text.indexOf("Features", start + 1);
  const info = start >= 0 ? text.slice(start, end > start ? end : start + 1500) : "";
  const rawRtp = info.match(/RTP:\s*([0-9]+(?:[.,][0-9]+)?\s*%)/i)?.[1] ?? null;
  const rawMaxWin = info.match(/Max Win:\s*([0-9][0-9., ]*x(?:\s*bet)?)/i)?.[1]?.trim() ?? null;
  const rawVolatility = info.match(/Volatility:\s*([A-Za-z]+(?:[\s–-]+[A-Za-z]+)*?)(?=\s+(?:Series:|Theme:|Release date:|Features|Availability|$))/i)?.[1]?.trim() ?? null;
  const rtp = rawRtp?.replace(/\s+/g, "").replace(".", ",") ?? null;
  const maxWin = rawMaxWin?.replace(/\s*bet$/i, "").replace(/[ ,]/g, "") ?? null;
  const volatility = normalizeVolatility(rawVolatility);
  return { rtp, maxWin, volatility, hasGameInfo: start >= 0 };
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

test.only("probe official Wazdan Game Info for score-four cards", async () => {
  test.setTimeout(240_000);
  const targets = catalogSeeds.filter((seed) => seed.provider === "Wazdan" && scoreFor(seed.slug) === 4);
  expect(targets.length).toBeGreaterThan(100);

  const rows = await mapLimit(targets, 8, async (seed) => {
    try {
      const response = await fetch(seed.source, {
        headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
        signal: AbortSignal.timeout(20_000),
      });
      const html = await response.text();
      return { slug: seed.slug, source: seed.source, status: response.status, ...parseGameInfo(html) };
    } catch (error) {
      return { slug: seed.slug, source: seed.source, status: 0, rtp: null, maxWin: null, volatility: null, hasGameInfo: false, error: String(error) };
    }
  });

  const complete = rows.filter((row) => row.rtp && row.maxWin && row.volatility);
  const partial = rows.filter((row) => (row.rtp || row.maxWin || row.volatility) && !(row.rtp && row.maxWin && row.volatility));
  const empty = rows.filter((row) => !row.rtp && !row.maxWin && !row.volatility);
  const importRows = rows.map(({ slug, source, rtp, maxWin, volatility }) => ({ slug, source, rtp, maxWin, volatility }));
  console.log("WAZDAN_SCORE4_GAME_INFO", JSON.stringify({ total: rows.length, complete: complete.length, partial: partial.length, empty: empty.length, rows: importRows }));
  expect(rows).toHaveLength(targets.length);
});
