import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] });
await mkdir('card-visual-artifacts', { recursive: true });
const results = [];
for (const [w, h] of [[1440,900],[390,844],[320,720]]) {
  const context = await browser.newContext({ viewport: {width:w,height:h} });
  for (const view of ['list','covers']) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('http://127.0.0.1:3000/slotfolio/slots/?view=' + view, { waitUntil:'domcontentloaded' });
    await page.locator('[data-slot]').first().waitFor({ timeout: 30000 });
    await page.screenshot({ path:'card-visual-artifacts/' + view + '-' + w + '.png' });
    const details = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.catalog-results [data-slot]')].slice(0, 6);
      return {
        docWidth: document.documentElement.scrollWidth, viewport: innerWidth,
        cards: cards.map(card => ({
          slug: card.getAttribute('data-slot'), coverage: card.getAttribute('data-coverage'),
          rect: card.getBoundingClientRect().toJSON(),
          title: card.querySelector('h2')?.innerText,
          artOk: !!card.querySelector('img')?.naturalWidth,
          facts: [...card.querySelectorAll('dt,dd')].map(el => ({
            text: el.innerText, font: getComputedStyle(el).fontSize,
            rect: el.getBoundingClientRect().toJSON()
          }))
        }))
      };
    });
    results.push({ width:w, view, errors, details });
    await page.close();
  }
  await context.close();
}
await browser.close();
await writeFile('card-visual-artifacts/metrics.json', JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(x => ({
  width:x.width,view:x.view,overflow:x.details.docWidth>x.details.viewport,
  shown:x.details.cards.length,errors:x.errors
}))));
