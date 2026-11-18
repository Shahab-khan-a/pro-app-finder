import { APPS_DATA } from '@/data/appsData';
import { SITE_URL } from '@/utils/seoConfig';

export const metadata = {
  title: 'Top Popular & Trending Free Software Leaderboard | AppScout',
  description:
    'Discover the most downloaded free software, highest-rated open-source apps, and editor picks voted by the global developer & creator community.',
  keywords: [
    'top free software',
    'most popular apps',
    'trending open source',
    'highest rated free apps',
    'best software leaderboard',
    'popular apk mods',
  ],
  alternates: {
    canonical: `${SITE_URL}/popular`,
  },
  openGraph: {
    title: 'Top Popular & Trending Free Software Leaderboard | AppScout',
    description:
      'Weekly curated leaderboard of the most popular and highest rated free desktop & mobile applications.',
    url: `${SITE_URL}/popular`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Top Popular Free Software Leaderboard | AppScout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Popular & Trending Free Software Leaderboard | AppScout',
    description: 'Weekly curated leaderboard of the most popular and highest rated free apps.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function PopularLayout({ children }) {
  const topPopularApps = APPS_DATA.filter((a) => a.popular || a.featured).slice(0, 15);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Popular Apps Leaderboard',
        item: `${SITE_URL}/popular`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Top Popular & Trending Free Software Leaderboard',
    description: 'Community leaderboard of the highest rated and most downloaded software on AppScout.',
    url: `${SITE_URL}/popular`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: topPopularApps.length,
      itemListElement: topPopularApps.map((app, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: app.name,
        url: `${SITE_URL}/app/${app.id}`,
        description: app.tagline,
        image: app.icon,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {children}
    </>
  );
}
