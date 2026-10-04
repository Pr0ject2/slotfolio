import { test } from "@playwright/test";

test.setTimeout(180_000);

const games = [
  [
    "agent-destiny",
    "https://www.playngo.com/games/agent-destiny"
  ],
  [
    "agent-of-hearts",
    "https://www.playngo.com/games/agent-of-hearts"
  ],
  [
    "alice-cooper-and-the-tome-of-madness",
    "https://www.playngo.com/games/alice-cooper-and-the-tome-of-madness"
  ],
  [
    "animal-madness",
    "https://www.playngo.com/games/animal-madness"
  ],
  [
    "ankh-of-anubis",
    "https://www.playngo.com/games/ankh-of-anubis"
  ],
  [
    "ankh-of-anubis-awakening",
    "https://www.playngo.com/games/ankh-of-anubis-awakening"
  ],
  [
    "annihilator",
    "https://www.playngo.com/games/annihilator"
  ],
  [
    "athena-ascending",
    "https://www.playngo.com/games/athena-ascending"
  ],
  [
    "aztec-idols",
    "https://www.playngo.com/games/aztec-idols"
  ],
  [
    "aztec-warrior-princess",
    "https://www.playngo.com/games/aztec-warrior-princess"
  ]
] as const;

test("temporary wave29 Play'n GO first-party probe", async ({ page }) => {
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
    console.log(`W29_${key.toUpperCase().replace(/-/g,"_")}_TITLE=` + JSON.stringify(title));
    console.log(`W29_${key.toUpperCase().replace(/-/g,"_")}_META=` + JSON.stringify(meta));
    console.log(`W29_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
  }
});
