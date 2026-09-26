import { expect, test } from "@playwright/test";

const games = [
  {
    name: "5x Magic",
    gid: "5xmagic",
    root: "https://cdn.playngonetwork.com/7.3.0-5xmagic.176/",
  },
  {
    name: "Pimped",
    gid: "pimped",
    root: "https://cdn.playngonetwork.com/9.3.0-pimped.348/",
  },
  {
    name: "Fortune Teller",
    gid: "fortuneteller",
    root: "https://cdn.playngonetwork.com/9.3.0-fortuneteller.231/",
  },
  {
    name: "Lucky Diamonds",
    gid: "luckydiamonds",
    root: "https://cdn.playngonetwork.com/7.4.0-luckydiamonds.243/",
  },
] as const;

function snippets(body: string, pattern: RegExp, limit = 25) {
  const rows: string[] = [];
  for (const match of body.matchAll(pattern)) {
    const index = match.index ?? 0;
    const value = body
      .slice(Math.max(0, index - 180), Math.min(body.length, index + match[0].length + 260))
      .replace(/\s+/g, " ")
      .trim();
    if (!rows.includes(value)) rows.push(value);
    if (rows.length >= limit) break;
  }
  return rows;
}

test.only("probe official Play'n GO per-game CDN config", async ({ request }) => {
  const rows = [] as Array<{
    name: string;
    kind: string;
    url: string;
    status: number;
    size: number;
    contentType?: string;
    facts: string[];
    body: string;
  }>;

  for (const game of games) {
    for (const target of [
      {
        kind: "config_mobile",
        url: `${game.root}resources/games/videoslot/${game.gid}/config_mobile.json`,
      },
      {
        kind: "game_bundle",
        url: `${game.root}resources/games/videoslot/${game.gid}/game_bundle.json`,
      },
    ]) {
      const response = await request.get(target.url, { timeout: 30_000 });
      const body = await response.text();
      const facts = [
        ...snippets(body, /(?:rtp|return.?to.?player)/gi),
        ...snippets(body, /(?:reels?|rows?|columns?|paylines?|lines|win.?lines?)/gi),
        ...snippets(body, /(?:max(?:imum)?.?win|win.?up.?to|winCap|maximumPayout)/gi),
      ].slice(0, 60);
      rows.push({
        name: game.name,
        kind: target.kind,
        url: response.url(),
        status: response.status(),
        size: body.length,
        contentType: response.headers()["content-type"],
        facts,
        body: body.slice(0, 20_000),
      });
    }
  }

  console.log("PLAYNGO_CDN_CONFIG_PROBE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
