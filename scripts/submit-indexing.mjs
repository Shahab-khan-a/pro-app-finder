// Script to submit all URLs to search engines via IndexNow (Bing, Yandex, Naver, Seznam)
import https from 'https';
import { APPS_DATA, CATEGORIES } from '../src/data/appsData.js';
import { SITE_URL, SITE_DOMAIN } from '../src/utils/seoConfig.js';

const INDEXNOW_KEY = 'appscout9940268a7f10438c8230b0e5d9';
const host = SITE_DOMAIN;

console.log(`\n🚀 Starting Search Engine Indexing for: ${SITE_URL} (${host})\n`);

// Build comprehensive list of all indexable URLs
const staticUrls = [
  `${SITE_URL}/`,
  `${SITE_URL}/popular`,
  `${SITE_URL}/categories`,
  `${SITE_URL}/about`,
  `${SITE_URL}/sitemap`,
];

const categoryUrls = CATEGORIES.filter((c) => c.id !== 'all').map(
  (c) => `${SITE_URL}/categories/${c.id}`
);

const appUrls = APPS_DATA.map((app) => `${SITE_URL}/app/${app.id}`);

const allUrls = [...staticUrls, ...categoryUrls, ...appUrls];

console.log(`📋 Total URLs queued for IndexNow submission: ${allUrls.length}`);
console.log(`   - Static routes: ${staticUrls.length}`);
console.log(`   - Category hubs: ${categoryUrls.length}`);
console.log(`   - Application pages: ${appUrls.length}\n`);

// 1. Submit to IndexNow (Bing, Yandex, Naver, Seznam)
const payload = JSON.stringify({
  host: host,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: allUrls,
});

const req = https.request(
  {
    hostname: 'api.indexnow.org',
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    console.log(`📡 IndexNow response status: ${res.statusCode} (${res.statusMessage})`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`✅ ${allUrls.length} URLs submitted successfully to Bing & Partner Search Engines!`);
    } else {
      console.log('ℹ️ IndexNow response received.');
    }
    process.exit(0);
  }
);

req.on('error', (e) => {
  console.error(`❌ IndexNow Error: ${e.message}`);
  process.exit(1);
});

req.write(payload);
req.end();
