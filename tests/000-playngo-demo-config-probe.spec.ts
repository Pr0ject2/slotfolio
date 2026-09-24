import { expect, test } from "@playwright/test";

const gids = ["5xmagic", "pimped", "fortuneteller", "luckydiamonds"] as const;

test.only("probe official Play'n GO demo launcher for explicit technical config", async ({ request }) => {
  const rows = [] as Array<{
    gid: string;
    status: number;
    url: string;
    contentType?: string;
    body: string;
    matches: string[];
  }>;

  for (const gid of gids) {
    const url = `https://asccw.playngonetwork.com/casino/ContainerLauncher?channel=mobile&demo=2&gid=${gid}&lang=en_GB&pid=2&practice=1`;
    const response = await request.get(url, { timeout: 30_000 });
    const body = await response.text();
    const matches = [...body.matchAll(/.{0,120}(?:rtp|return.?to.?player|reels?|rows?|paylines?|lines|config|gameId|gid).{0,180}/gi)]
      .map((match) => match[0].replace(/\s+/g, " ").trim())
      .slice(0, 30);
    rows.push({
      gid,
      status: response.status(),
      url: response.url(),
      contentType: response.headers()["content-type"],
      body: body.slice(0, 20_000),
      matches,
    });
  }

  console.log("PLAYNGO_DEMO_CONFIG_PROBE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
