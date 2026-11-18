import { SITE_URL, SITE_CONFIG } from '@/utils/seoConfig';

export const metadata = {
  title: 'Safety, Transparency & Zero-Malware Guarantee | AppScout',
  description:
    'Learn why AppScout provides 100% verified official download links, zero adware, zero malware wrappers, and strict open-source auditing.',
  keywords: [
    'software safety guarantee',
    'safe app downloads',
    'no malware free software',
    'clean official downloads',
    'open source verification',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'Safety, Transparency & Zero-Malware Guarantee | AppScout',
    description:
      'Learn why AppScout is the most trusted directory for official free and open-source software downloads.',
    url: `${SITE_URL}/about`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'AppScout Safety and Transparency Guarantee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safety, Transparency & Zero-Malware Guarantee | AppScout',
    description: 'Learn why AppScout provides 100% verified official downloads and zero malware.',
    images: [`${SITE_URL}/twitter-image`],
  },
};

export default function AboutLayout({ children }) {
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
        name: 'About & Zero-Malware Guarantee',
        item: `${SITE_URL}/about`,
      },
    ],
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AppScout & Verification Policy',
    description:
      'AppScout indexes verified open-source software and official downloads with strict virus checking and publisher authentication.',
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_URL,
      logo: SITE_CONFIG.logo,
      publishingPrinciples: `${SITE_URL}/about`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}
