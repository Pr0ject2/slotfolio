import { test } from "@playwright/test";

test.setTimeout(180_000);

const games = [
  [
    "bakers-treat",
    "https://www.playngo.com/games/baker%27s-treat"
  ],
  [
    "banana-rock",
    "https://www.playngo.com/games/banana-rock"
  ],
  [
    "banana-rush",
    "https://www.playngo.com/games/banana-rush"
  ],
  [
    "banquet-of-dead",
    "https://www.playngo.com/games/banquet-of-dead"
  ],
  [
    "bao-shi",
    "https://www.playngo.com/games/bao-shi"
  ],
  [
    "barn-busters",
    "https://www.playngo.com/games/barn-busters"
  ],
  [
    "baron-lord-of-saturday",
    "https://www.playngo.com/games/baron%3A-lord-of-saturday"
  ],
  [
    "battle-royal",
    "https://www.playngo.com/games/battle-royal"
  ],
  [
    "beasts-of-fire",
    "https://www.playngo.com/games/beasts-of-fire"
  ],
  [
    "beasts-of-fire-maximum",
    "https://www.playngo.com/games/beasts-of-fire-maximum"
  ]
] as const;

test("temporary wave30 Play'n GO first-party probe", async ({ page }) => {
  for (const [key, url] of games) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(1000);
    const title = await page.title();
    const bodyText = (await page.locator("body").innerText()).replace(/\r/g, "");
    const meta = await page.locator("head").evaluate((head) => {
      const get = (selector: string) => head.querySelector(selector)?.getAttribute("content") || null;
      return {
        ogImage: get('meta[property="og:image"]'),
        twitterImage: get('meta[name="twitter:image"]'),
        description: get('meta[name="description"]'),
        ogDescription: get('meta[property="og:description"]'),
      };
    });
    console.log(`W30_${key.toUpperCase().replace(/-/g,"_")}_TITLE=` + JSON.stringify(title));
    console.log(`W30_${key.toUpperCase().replace(/-/g,"_")}_META=` + JSON.stringify(meta));
    console.log(`W30_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
  }
});
