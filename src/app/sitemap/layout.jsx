import { SITE_URL, SITE_CONFIG } from '@/utils/seoConfig';

export const metadata = {
  title: 'Site Map - Complete Directory of Free & Open-Source Software | AppScout',
  description:
    'Explore the complete HTML site map of AppScout. Discover all verified free and open-source desktop and mobile software, category hubs, official download links, and indexing feeds.',
  keywords: [
    'appscout sitemap',
    'software directory sitemap',
    'free software sitemap',
    'open source software index',
    'all apps sitemap',
    'software categories list',
    'free downloads index',
    'appscout web sitemap',
  ],
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
  openGraph: {
    title: 'Site Map - Complete Directory of Free & Open-Source Software | AppScout',
    description:
      'Explore the complete HTML site map of AppScout. Discover all verified free and open-source desktop and mobile software, category hubs, and official mirrors.',
    url: `${SITE_URL}/sitemap`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'AppScout HTML Site Map Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Map - Complete Directory of Free & Open-Source Software | AppScout',
    description:
      'Explore the complete HTML site map of AppScout. Discover all verified free and open-source software and category hubs.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function SitemapLayout({ children }) {
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
        name: 'Site Map',
        item: `${SITE_URL}/sitemap`,
      },
    ],
  };

  const sitemapPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AppScout Web Site Map',
    description:
      'Comprehensive HTML directory index of all public routes, category hubs, verified applications, and technical metadata feeds on AppScout.',
    url: `${SITE_URL}/sitemap`,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_URL,
      logo: SITE_CONFIG.logo,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapPageSchema) }}
      />
      {children}
    </>
  );
}
