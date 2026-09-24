import { expect, test } from "@playwright/test";

const games = [
  { name: "5x Magic", gameId: 199 },
  { name: "Pimped", gameId: 291 },
  { name: "Fortune Teller", gameId: 196 },
  { name: "Lucky Diamonds", gameId: 5 },
] as const;

const base = "https://asccw.playngonetwork.com/";

test.only("probe official Play'n GO prelaunch configuration", async ({ request }) => {
  const rows = [] as Array<{ name: string; gameId: number; url: string; status: number; body: string }>;

  for (const game of games) {
    const url = new URL("configuration/prelaunchconfiguration", base);
    url.searchParams.set("gameId", String(game.gameId));
    url.searchParams.set("language", "en_GB");
    url.searchParams.set("productGroup", "2");
    url.searchParams.set("gapTime", "");
    url.searchParams.set("brand", "");
    url.searchParams.set("ctx", "");
    url.searchParams.set("practice", "1");
    url.searchParams.set("channel", "mobile");

    const response = await request.get(url.toString(), { timeout: 30_000 });
    rows.push({
      ...game,
      url: response.url(),
      status: response.status(),
      body: (await response.text()).slice(0, 30_000),
    });
  }

  console.log("PLAYNGO_PRELAUNCH_PROBE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
