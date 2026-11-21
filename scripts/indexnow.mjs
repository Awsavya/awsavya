// Tells IndexNow engines (Bing, Yandex, Naver, Seznam, Yep, Amazon) that the site's pages changed.
// Run after a deploy is live:  npm run indexnow
// The key is public by design: it only proves we control the domain, via public/<key>.txt.
const HOST = "www.awsavya.in";
const KEY = "02ad745434884afe96a916aa4ce99741";

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (!urlList.length) throw new Error("No URLs found in the live sitemap.");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200 = received, 202 = received (key check pending), 403 = key not found, 422 = URLs don't match the host.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);
