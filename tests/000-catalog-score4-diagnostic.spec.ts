import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function facts(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return {
    field: Boolean(details?.field),
    rtp: Boolean(details?.rtp),
    maxWin: Boolean(details?.maxWin),
    volatility: Boolean(details?.volatility),
    releaseDate: Boolean(details?.releaseDate),
    gameType: Boolean(gameType),
    mechanics: research?.mechanics.length ?? 0,
  };
}

function score(slug: string) {
  const f = facts(slug);
  return Number(f.field) + Number(f.rtp) + Number(f.maxWin) + Number(f.volatility) + Number(f.releaseDate) + Number(f.gameType) + f.mechanics;
}

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

function snippets(text: string, marker: string) {
  const lower = text.toLowerCase();
  const needle = marker.toLowerCase();
  const results: string[] = [];
  let start = 0;
  while (results.length < 4) {
    const index = lower.indexOf(needle, start);
    if (index < 0) break;
    results.push(text.slice(Math.max(0, index - 100), Math.min(text.length, index + 240)));
    start = index + needle.length;
  }
  return results;
}

test.only("probe official Hacksaw game data for score-four cards", async () => {
  const targets = catalogSeeds.filter((seed) => {
    if (seed.provider !== "Hacksaw Gaming" || score(seed.slug) !== 4) return false;
    const f = facts(seed.slug);
    return f.field && !f.rtp && f.maxWin && !f.volatility && !f.releaseDate && f.gameType && f.mechanics === 1;
  });

  const rows = [];
  for (const seed of targets) {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
    });
    const text = plainText(await response.text());
    rows.push({
      slug: seed.slug,
      source: seed.source,
      status: response.status,
      rtp: snippets(text, "RTP"),
      volatility: snippets(text, "Volatility"),
      gameData: snippets(text, "GAME DATA"),
    });
  }

  console.log("HACKSAW_SCORE4_GAME_DATA", JSON.stringify(rows));
  expect(targets).toHaveLength(28);
});
