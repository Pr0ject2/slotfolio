import { test } from "@playwright/test";

test.setTimeout(180_000);

const games = [
  [
    "1001-mystery-genie-fortunes",
    "https://www.playngo.com/games/1001-mystery-genie-fortunes"
  ],
  [
    "13th-trial-hercules-abyssways",
    "https://www.playngo.com/games/13th-trial-hercules-abyssways"
  ],
  [
    "15-crystal-roses-a-tale-of-love",
    "https://www.playngo.com/games/15-crystal-roses%3A-a-tale-of-love"
  ],
  [
    "24k-dragon",
    "https://www.playngo.com/games/24k-dragon"
  ],
  [
    "3-blades-and-blessings",
    "https://www.playngo.com/games/3-blades-%26-blessings"
  ],
  [
    "3-clown-monty",
    "https://www.playngo.com/games/3-clown-monty"
  ],
  [
    "3-clown-monty-ii",
    "https://www.playngo.com/games/3-clown-monty-ii"
  ],
  [
    "5x-magic",
    "https://www.playngo.com/games/5x-magic"
  ],
  [
    "7-sins",
    "https://www.playngo.com/games/7-sins"
  ],
  [
    "ace-of-spades",
    "https://www.playngo.com/games/ace-of-spades"
  ]
] as const;

test("temporary wave28 Play'n GO first-party probe", async ({ page }) => {
  for (const [key, url] of games) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(1200);
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
    console.log(`W28_${key.toUpperCase().replace(/-/g,"_")}_TITLE=` + JSON.stringify(title));
    console.log(`W28_${key.toUpperCase().replace(/-/g,"_")}_META=` + JSON.stringify(meta));
    console.log(`W28_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
  }
});
