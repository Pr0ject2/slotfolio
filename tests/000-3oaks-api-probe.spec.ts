import { expect, test } from "@playwright/test";

const slugs = [
  "3_super_hot_teapots",
  "4_fortune_clovers",
  "lucky_penny_3_pots_super_wheel",
  "hot_fire_fruits",
];

const newsSlugs = [
  "new-release-3-super-hot-teapots",
  "new-release-4-fortune-clovers",
  "new-release-lucky-penny-3-pots-super-wheel",
];

test.only("probe official 3 Oaks public game API", async ({ request }) => {
  const rows: Array<{ url: string; status: number; contentType: string | undefined; body: string }> = [];

  for (const slug of slugs) {
    const url = `https://3oaks.com/api/v1/games/${slug}`;
    const response = await request.get(url, { timeout: 30_000 });
    const body = await response.text();
    rows.push({ url, status: response.status(), contentType: response.headers()["content-type"], body: body.slice(0, 20_000) });
  }

  for (const slug of newsSlugs) {
    const url = `https://3oaks.com/api/v1/news/articles/${slug}`;
    const response = await request.get(url, { timeout: 30_000 });
    const body = await response.text();
    rows.push({ url, status: response.status(), contentType: response.headers()["content-type"], body: body.slice(0, 20_000) });
  }

  console.log("THREE_OAKS_PUBLIC_API", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
