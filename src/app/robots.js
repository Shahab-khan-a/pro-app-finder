export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

