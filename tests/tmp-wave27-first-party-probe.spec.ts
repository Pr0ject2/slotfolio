import { test } from "@playwright/test";

test.setTimeout(60_000);

const games = [
  [
    "nolimit-city-bowel-of-beelzebub",
    "https://nolimitcity.com/games/bowel-of-beelzebub"
  ],
  [
    "nolimit-city-ding-dong-death",
    "https://nolimitcity.com/games/ding-dong-death"
  ],
  [
    "nolimit-city-duck-hunters-2",
    "https://nolimitcity.com/games/duck-hunters-2"
  ],
  [
    "nolimit-city-fire-in-the-hole-4",
    "https://nolimitcity.com/games/game-1"
  ],
  [
    "nolimit-city-gator-hunters-2",
    "https://nolimitcity.com/games/gator-hunters-2"
  ],
  [
    "nolimit-city-six-feet-under",
    "https://nolimitcity.com/games/six-feet-under"
  ]
] as const;

for (const [key, url] of games) {
  test(`temporary meta probe ${key}`, async ({ page }) => {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    const title = await page.title();
    const meta = await page.locator("head").evaluate((head) => {
      const get = (selector: string) => head.querySelector(selector)?.getAttribute("content") || null;
      return {
        ogImage: get('meta[property="og:image"]'),
        twitterImage: get('meta[name="twitter:image"]'),
        ogTitle: get('meta[property="og:title"]'),
      };
    });
    console.log(`W27META_${key.toUpperCase().replace(/-/g,"_")}=` + JSON.stringify({ title, ...meta }));
  });
}
