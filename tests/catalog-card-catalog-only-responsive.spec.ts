import { test, expect } from "@playwright/test";

test("long catalog-only names and verified facts wrap cleanly on mobile", async ({ page }) => {
  test.setTimeout(90_000);
  const examples = [
    { slug: "playn-go-reactoonz-100", query: "reactoonz 100" },
    { slug: "playn-go-rich-wilde-and-the-book-of-dead", query: "rich wilde and the book of dead" },
  ];
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 850 });
    for (const view of ["list", "covers"]) {
      for (const example of examples) {
        await page.goto("/slots/?view=" + view + "&q=" + encodeURIComponent(example.query));
        const card = page.locator('[data-slot="' + example.slug + '"]');
        await expect(card).toBeVisible();
        await expect(card).toHaveAttribute("data-coverage", "catalog");
        const info = await card.evaluate((root) => {
          const bounds = root.getBoundingClientRect();
          const title = root.querySelector("h2")!.getBoundingClientRect();
          const facts = Array.from(root.querySelectorAll<HTMLElement>('dl[aria-label="Характеристики"] dd'));
          return {
            cardRight: bounds.right,
            titleRight: title.right,
            factsCount: facts.length,
            factRights: facts.map((fact) => fact.getBoundingClientRect().right),
            fontSizes: facts.map((fact) => parseFloat(getComputedStyle(fact).fontSize)),
            scroll: document.documentElement.scrollWidth,
            viewport: innerWidth,
          };
        });
        expect(info.factsCount).toBeGreaterThanOrEqual(4);
        expect(info.scroll).toBeLessThanOrEqual(width + 1);
        expect(info.titleRight).toBeLessThanOrEqual(info.cardRight + 1);
        for (const right of info.factRights) expect(right).toBeLessThanOrEqual(info.cardRight + 1);
        for (const size of info.fontSizes) expect(size).toBeGreaterThanOrEqual(12);
      }
    }
  }
});
