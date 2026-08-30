import { NextResponse } from 'next/server';
import { APPS_DATA, CATEGORIES } from '@/data/appsData';

const INDEXNOW_KEY = 'appscout9940268a7f10438c8230b0e5d9';

export async function GET(request) {
  return handleIndexNow(request);
}

export async function POST(request) {
  return handleIndexNow(request);
}

async function handleIndexNow(request) {
  const host = request.headers.get('host') || 'appscout.io';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

  const staticUrls = [
    `${baseUrl}/`,
    `${baseUrl}/popular`,
    `${baseUrl}/categories`,
    `${baseUrl}/about`,
    `${baseUrl}/favorites`,
  ];

  const categoryUrls = CATEGORIES.filter((c) => c.id !== 'all').map(
    (c) => `${baseUrl}/categories/${c.id}`
  );

  const appUrls = APPS_DATA.map((app) => `${baseUrl}/app/${app.id}`);

  const allUrls = [...staticUrls, ...categoryUrls, ...appUrls];

  const cleanHost = host.replace(/^https?:\/\//, '').split(':')[0];

  const payload = {
    host: cleanHost,
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
    urlList: allUrls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const isSuccess = status === 200 || status === 202;

    return NextResponse.json({
      success: isSuccess,
      status,
      message: isSuccess
        ? `Successfully submitted ${allUrls.length} URLs to IndexNow search engines (Bing, Yandex, etc.)!`
        : `IndexNow responded with status ${status}`,
      submittedUrlsCount: allUrls.length,
      host: cleanHost,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        urlsCount: allUrls.length,
      },
      { status: 500 }
    );
  }
}
