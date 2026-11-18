import { CATEGORIES } from '@/data/appsData';
import { SITE_URL, SITE_CONFIG } from '@/utils/seoConfig';

export const metadata = {
  title: 'Browse Free Software by Category | AppScout',
  description:
    'Explore verified free & open-source applications organized by category: Video Editing, Coding Tools, Graphic Design, Privacy & VPN, Audio, Utilities, and Productivity.',
  keywords: [
    'software categories',
    'free video editing software',
    'free coding tools',
    'graphic design open source',
    'privacy software download',
    'open source utilities',
    'free audio editors',
  ],
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: 'Browse Free Software by Category | AppScout',
    description: 'Explore verified free and open-source applications organized by categories and workflows.',
    url: `${SITE_URL}/categories`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Browse Free Software by Category | AppScout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Free Software by Category | AppScout',
    description: 'Explore verified free and open-source applications organized by categories and workflows.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function CategoriesLayout({ children }) {
  const categoriesList = CATEGORIES.filter((c) => c.id !== 'all');

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
        name: 'Categories',
        item: `${SITE_URL}/categories`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Software Categories Directory',
    description: 'Explore verified free and open-source applications organized by category.',
    url: `${SITE_URL}/categories`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoriesList.map((cat, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: cat.name,
        url: `${SITE_URL}/categories/${cat.id}`,
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
