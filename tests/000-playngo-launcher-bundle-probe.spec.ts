import { expect, test } from "@playwright/test";

const games = [
  { name: "5x Magic", gid: "5xmagic", gameId: 199 },
  { name: "Pimped", gid: "pimped", gameId: 291 },
  { name: "Fortune Teller", gid: "fortuneteller", gameId: 196 },
  { name: "Lucky Diamonds", gid: "luckydiamonds", gameId: 5 },
] as const;

const base = "https://asccw.playngonetwork.com/";

test.only("probe official Play'n GO game metadata endpoints", async ({ request }) => {
  const rows = [] as Array<{ name: string; kind: string; url: string; status: number; body: string }>;

  for (const game of games) {
    for (const target of [
      { kind: "gameId", path: `games/${game.gameId}` },
      { kind: "gid", path: `games/getgamebygid/${game.gid}` },
    ]) {
      const url = new URL(target.path, base).toString();
      const response = await request.get(url, { timeout: 30_000 });
      rows.push({
        name: game.name,
        kind: target.kind,
        url: response.url(),
        status: response.status(),
        body: (await response.text()).slice(0, 30_000),
      });
    }
  }

  console.log("PLAYNGO_GAME_METADATA_PROBE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
