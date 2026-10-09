import { chromium } from "@playwright/test";
const cases = [
["joker_glitz_x1000","Joker Glitz x1000"],["lady_fortune","Lady Fortune"],["lava_coins","Lava Coins"],["lava_coins_2","Lava Coins 2"],
["little_farm","Little Farm"],["lord_of_thunder","Lord of Thunder"],["lucky_apple_x1000","Lucky Apple x1000"],["lucky_penny","Lucky Penny"],
["lucky_penny_2","Lucky Penny 2"],["lucky_penny_3_pots_super_wheel","Lucky Penny 3 Pots: Super Wheel"],
["lucky_penny_powerscatter","Lucky Penny Power Scatter"],["magic_apple","Magic Apple"],["magic_apple_2","Magic Apple 2"],["magic_clovers","Magic Clovers"],
];
const browser = await chromium.launch({headless:true,executablePath:"/usr/bin/google-chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
for (const [slug,name] of cases) {
  const page=await browser.newPage({viewport:{width:1280,height:900},ignoreHTTPSErrors:true});
  const media=new Set();
  page.on("response",r=>{const u=r.url();if(u.includes("3oaks.com/media/"))media.add(u);});
  try {
    const response=await page.goto("https://3oaks.com/game/"+slug,{waitUntil:"domcontentloaded",timeout:25000});
    await page.waitForTimeout(2800);
    for(const t of ["Yes, I am 18 years or older","Yes, I'm 18","Yes, I am 18"]){const b=page.getByText(t,{exact:false}).first();if(await b.isVisible().catch(()=>false)){await b.click({timeout:2000}).catch(()=>{});await page.waitForTimeout(1000);break;}}
    const data=await page.evaluate(()=>({title:document.title,body:document.body?.innerText?.slice(0,260),images:[...document.images].map(im=>({src:im.currentSrc||im.src,alt:im.alt,w:im.naturalWidth,h:im.naturalHeight})).filter(im=>im.src?.startsWith("http")).sort((a,b)=>(b.w*b.h)-(a.w*a.h)).slice(0,35),bg:[...document.querySelectorAll("*")].map(el=>getComputedStyle(el).backgroundImage).filter(s=>s?.includes("url(")).slice(0,20)}));
    console.log("PROBE_GAME "+JSON.stringify({slug,name,status:response?.status(),...data,media:[...media].slice(0,50)}));
  }catch(e){console.log("PROBE_ERROR "+JSON.stringify({slug,error:String(e).slice(0,500),media:[...media].slice(0,15)}));}
  await page.close();
}
await browser.close();