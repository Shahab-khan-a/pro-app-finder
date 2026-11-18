import { APPS_DATA, CATEGORIES } from '../data/appsData.js';
import { SITE_URL } from '../utils/seoConfig.js';

export default function sitemap() {
  const currentDate = new Date();

  // 1. Static Core Landing Pages
  const staticRoutes = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/popular`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // 2. Category Hub Pages
  const categoryRoutes = CATEGORIES.filter((category) => category.id !== 'all').map(
    (category) => ({
      url: `${SITE_URL}/categories/${category.id}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    })
  );

  // 3. Individual App Detail Pages (All 57+ Verified Applications)
  const appRoutes = APPS_DATA.map((app) => ({
    url: `${SITE_URL}/app/${app.id}`,
    lastModified: currentDate,
    changeFrequency: app.featured || app.popular ? 'daily' : 'weekly',
    priority: app.featured ? 0.85 : app.popular ? 0.82 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...appRoutes];
}
