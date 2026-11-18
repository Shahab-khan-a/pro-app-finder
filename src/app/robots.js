import { SITE_URL, SITE_DOMAIN } from '../utils/seoConfig.js';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/favorites'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_DOMAIN,
  };
}
