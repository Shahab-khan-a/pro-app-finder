import { APPS_DATA } from '@/data/appsData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app-scout-git-main-kms475531-5446s-projects.vercel.app';

export async function generateStaticParams() {
  return APPS_DATA.map((app) => ({
    id: app.id,
  }));
}

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
      `${app.name} latest version`,
      `${app.name} open source`,
      app.publisher,
      app.categoryName,
      app.licenseType,
      'verified safe download',
      'no malware software',
      'free software download',
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
          availability: 'https://schema.org/InStock',
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
        downloadUrl: `${siteUrl}/app/${app.id}`,
        publisher: {
          '@type': 'Organization',
          name: app.publisher,
        },
      }
    : null;

  const breadcrumbSchema = app
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: app.categoryName || 'Software',
            item: `${siteUrl}/categories/${app.category || 'all'}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: app.name,
            item: `${siteUrl}/app/${app.id}`,
          },
        ],
      }
    : null;

  const faqSchema = app
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is ${app.name} safe and malware-free to download?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes, all mirrors for ${app.name} on AppScout are verified through official publisher domains, open-source repositories, and multi-engine security scans to guarantee zero malware and zero bundled adware.`,
            },
          },
          {
            '@type': 'Question',
            name: `What platforms and operating systems does ${app.name} support?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${app.name} is available on ${app.platforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is ${app.name} completely free or open-source?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${app.name} is distributed under the ${app.licenseType || 'Free'} license model. AppScout indexes direct official links at zero cost to users.`,
            },
          },
        ],
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
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {children}
    </>
  );
}
