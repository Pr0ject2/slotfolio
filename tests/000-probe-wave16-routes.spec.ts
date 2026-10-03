import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";

const slugs = [
  "hacksaw-gaming-benny-the-beer",
  "hacksaw-gaming-booze-bash",
  "hacksaw-gaming-bouncy-bombs",
  "hacksaw-gaming-bullets-and-bounty",
  "hacksaw-gaming-cash-crew",
  "hacksaw-gaming-chaos-crew-3",
  "hacksaw-gaming-circle-of-life",
  "hacksaw-gaming-cloud-princess",
  "hacksaw-gaming-cursed-crypt",
  "hacksaw-gaming-dandy-diamonds",
];

test("wave16 catalog route diagnostic", async ({ page }) => {
  for (const slug of slugs) {
    const selected = catalogSeeds.some((seed) => seed.slug === slug);
    const response = await page.goto(`/slots/catalog/${slug}`);
    const h1 = await page.locator("h1").textContent().catch(() => null);
    const editorial = await page.locator("#how-it-works").count();
    console.log("WAVE16_ROUTE", JSON.stringify({ slug, selected, status: response?.status(), h1, editorial, url: page.url() }));
  }
});
