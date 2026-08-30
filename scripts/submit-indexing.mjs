// Script to submit all 78+ URLs to search engines via IndexNow and Sitemap ping
import https from 'https';

const INDEXNOW_KEY = 'appscout9940268a7f10438c8230b0e5d9';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';
const host = SITE_URL.replace(/^https?:\/\//, '').replace(/\/+$/, '');

console.log(`\n🚀 Starting Search Engine Indexing for: ${SITE_URL} (${host})\n`);

// 1. Submit to IndexNow (Bing, Yandex, Naver, Seznam)
const payload = JSON.stringify({
  host: host,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: [
    `${SITE_URL}/`,
    `${SITE_URL}/popular`,
    `${SITE_URL}/categories`,
    `${SITE_URL}/about`,
    `${SITE_URL}/categories/video-editing`,
    `${SITE_URL}/categories/development`,
    `${SITE_URL}/categories/design`,
    `${SITE_URL}/categories/productivity`,
    `${SITE_URL}/categories/security`,
    `${SITE_URL}/categories/browsers`,
    `${SITE_URL}/categories/education`,
    `${SITE_URL}/categories/audio`,
    `${SITE_URL}/categories/utilities`,
    `${SITE_URL}/app/capcut-pro`,
    `${SITE_URL}/app/vscode`,
    `${SITE_URL}/app/blender`,
    `${SITE_URL}/app/vlc`,
    `${SITE_URL}/app/remini`,
    `${SITE_URL}/app/wink-pro`,
  ],
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
    console.log(`📡 IndexNow submission status: ${res.statusCode} (${res.statusMessage})`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ URLs submitted successfully to Bing & Partner Search Engines!');
    } else {
      console.log('ℹ️ IndexNow response received.');
    }
  }
);

req.on('error', (e) => {
  console.error(`❌ IndexNow Error: ${e.message}`);
});

req.write(payload);
req.end();
