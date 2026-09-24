import { expect, test } from "@playwright/test";

const games = [
  { name: "5x Magic", gameId: 199 },
  { name: "Pimped", gameId: 291 },
  { name: "Fortune Teller", gameId: 196 },
  { name: "Lucky Diamonds", gameId: 5 },
] as const;

const base = "https://asccw.playngonetwork.com/";

test.only("probe official Play'n GO v2 runtime configuration", async ({ request }) => {
  const rows = [] as Array<{ name: string; url: string; status: number; body: string }>;

  for (const game of games) {
    const url = new URL("configuration/v2", base);
    url.searchParams.set("pid", "2");
    url.searchParams.set("gameid", String(game.gameId));
    url.searchParams.set("lang", "en_GB");
    url.searchParams.set("practice", "1");
    url.searchParams.set("brand", "");
    url.searchParams.set("ctx", "");
    url.searchParams.set("channel", "mobile");
    url.searchParams.set("jurisdiction", "");
    url.searchParams.set("platform", "megaton");
    url.searchParams.set("currency", "");
    url.searchParams.set("country", "");
    url.searchParams.set("region", "");
    url.searchParams.set("_r", crypto.randomUUID());

    const response = await request.get(url.toString(), { timeout: 30_000 });
    rows.push({
      name: game.name,
      url: response.url(),
      status: response.status(),
      body: (await response.text()).slice(0, 50_000),
    });
  }

  console.log("PLAYNGO_V2_CONFIG_PROBE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
