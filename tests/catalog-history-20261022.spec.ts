import {test,expect} from "@playwright/test";

test.use({locale:"ru-RU"});
for (const [prefix,nextName] of [["","Следующая страница"],["/en","Next"],["/es","Siguiente"]]) {
  test(`catalogue Back and Forward restore the visible page immediately: ${prefix||"ru"}`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${prefix}/slots/`);
    const first=page.locator(".catalog-game").first();
    await expect(first).toHaveAttribute("data-card-number","1");
    await page.getByRole("button",{name:nextName,exact:true}).click();
    await expect(first).toHaveAttribute("data-card-number","19");
    // Back can arrive while the framework's native-history update is pending.
    await page.goBack();
    await expect(first).toHaveAttribute("data-card-number","1");
    await expect(page).toHaveURL(/\/slots\/?$/);
    await page.goForward();
    await expect(first).toHaveAttribute("data-card-number","19");
    await expect(page).toHaveURL(/page=2/);
    await page.goBack();
    await expect(first).toHaveAttribute("data-card-number","1");
  });
}
