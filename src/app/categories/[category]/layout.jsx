import { CATEGORIES, APPS_DATA } from '@/data/appsData';
import { SITE_URL } from '@/utils/seoConfig';

export async function generateStaticParams() {
  return CATEGORIES.filter((c) => c.id !== 'all').map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.id === resolvedParams.category);

  if (!category) {
    return {
      title: 'Category Not Found | AppScout',
      description: 'The requested software category could not be found.',
    };
  }

  const title = `Best Free ${category.name} Software & Apps (2026) - Verified Downloads`;
  const description = `Explore top verified free & open-source software for ${category.name}. Official mirrors, malware-free downloads, and zero adware for Windows, Mac, Linux, Android, and iOS.`;

  return {
    title,
    description,
    keywords: [
      `free ${category.name.toLowerCase()} software`,
      `best ${category.name.toLowerCase()} apps`,
      `open source ${category.name.toLowerCase()} tools`,
      `free software for ${category.name.toLowerCase()}`,
      'verified safe software',
      'malware free downloads',
    ],
    alternates: {
      canonical: `${SITE_URL}/categories/${category.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/categories/${category.id}`,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Best Free ${category.name} Software`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/twitter-image`],
    },
  };
}

export default async function CategoryLayout({ children, params }) {
  const resolvedParams = await params;
  const category = CATEGORIES.find((c) => c.id === resolvedParams.category);

  const categoryApps = category
    ? APPS_DATA.filter((app) => app.category === category.id)
    : [];

  const breadcrumbSchema = category
    ? {
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
            name: 'Categories',
            item: `${SITE_URL}/categories`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `${SITE_URL}/categories/${category.id}`,
          },
        ],
      }
    : null;

  const collectionSchema = category
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Best Free ${category.name} Software & Apps`,
        description: `Curated directory of verified open-source and free applications for ${category.name}.`,
        url: `${SITE_URL}/categories/${category.id}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: categoryApps.length,
          itemListElement: categoryApps.map((app, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: app.name,
            url: `${SITE_URL}/app/${app.id}`,
            description: app.tagline,
            image: app.icon,
          })),
        },
      }
    : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {collectionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      )}
      {children}
    </>
  );
}
