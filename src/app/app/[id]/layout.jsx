import { APPS_DATA } from '@/data/appsData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const app = APPS_DATA.find((a) => a.id === resolvedParams.id);

  if (!app) {
    return {
      title: 'App Not Found | AppScout',
      description: 'The requested software application could not be found.',
    };
  }

  const platformsStr = app.platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(', ');
  const title = `Download ${app.name} Free (${platformsStr}) - Verified Official & Pro Mirrors`;
  const description = `Download ${app.name} (${app.latestVersion || 'Latest'}). ${app.tagline} Free official download for ${platformsStr}. Rating: ${app.rating}/5.0 with verified malware-free guarantee.`;

  return {
    title,
    description,
    keywords: [
      `${app.name} free download`,
      `${app.name} pro apk`,
      `${app.name} mod apk`,
      `${app.name} download for pc`,
      `${app.name} for ${platformsStr}`,
      app.publisher,
      app.categoryName,
      app.licenseType,
      'verified safe download',
      'no malware software',
    ],
    alternates: {
      canonical: `${siteUrl}/app/${app.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/app/${app.id}`,
      type: 'article',
      images: [
        {
          url: app.icon || `${siteUrl}/og-image.png`,
          width: 256,
          height: 256,
          alt: `${app.name} Logo`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [app.icon || `${siteUrl}/og-image.png`],
    },
  };
}

export default async function AppDetailLayout({ children, params }) {
  const resolvedParams = await params;
  const app = APPS_DATA.find((a) => a.id === resolvedParams.id);

  const softwareApplicationSchema = app
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: app.name,
        operatingSystem: app.platforms.join(', '),
        applicationCategory: app.categoryName || 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: app.rating.toString(),
          ratingCount: (app.reviewCount || 1000).toString(),
          bestRating: '5',
          worstRating: '1',
        },
        description: app.description,
        image: app.icon,
        publisher: {
          '@type': 'Organization',
          name: app.publisher,
        },
      }
    : null;

  return (
    <>
      {softwareApplicationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      )}
      {children}
    </>
  );
}
