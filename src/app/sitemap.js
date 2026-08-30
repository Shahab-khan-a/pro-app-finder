import { APPS_DATA, CATEGORIES } from '@/data/appsData';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';
  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic category hub routes
  const categoryRoutes = CATEGORIES.filter((c) => c.id !== 'all').map((category) => ({
    url: `${baseUrl}/categories/${category.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic app detail routes
  const appRoutes = APPS_DATA.map((app) => ({
    url: `${baseUrl}/app/${app.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: app.featured || app.popular ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...appRoutes];
}

