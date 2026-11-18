import './globals.css';
import { APPS_DATA } from '@/data/appsData';
import { SITE_CONFIG, SITE_URL } from '@/utils/seoConfig';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name} - Free Software & Unlocked APKs`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'free pro apps',
    'unlocked apk download',
    'pro apk',
    'mod apk download',
    'free software directory',
    'open source software',
    'best desktop apps',
    'windows 11 free software',
    'mac free apps',
    'linux open source tools',
    'android apk mirror',
    'apk mod premium',
    'CapCut Pro',
    'Wink Video Retouch',
    'VS Code download',
    'Blender 3D',
    'Remini AI Pro',
    'VLC Media Player',
    'Brave Browser',
    'Bitwarden Password Manager',
    'OBS Studio',
    'Notion free',
    'GIMP',
    'Filmora Pro free',
    'Lightroom Pro APK',
    'Alight Motion Pro',
    'Truecaller Gold APK',
  ],
  authors: [{ name: 'AppScout Team', url: SITE_URL }],
  creator: 'AppScout',
  publisher: 'AppScout Open Software Index',
  applicationName: 'AppScout',
  generator: 'Next.js',
  category: 'Software & Technology',
  classification: 'Software Directory, APK Downloader, Open Source Registry',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Verified Free Software & Pro APK Downloads`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
    images: [`${SITE_URL}/twitter-image`],
  },
  verification: {
    google: SITE_CONFIG.googleVerificationTokens,
    yandex: SITE_CONFIG.yandexVerificationToken,
    other: {
      'msvalidate.01': SITE_CONFIG.bingVerificationToken,
    },
  },
};

export default function RootLayout({ children }) {
  // Top 10 featured apps for schema.org/ItemList
  const topFeaturedApps = APPS_DATA.slice(0, 10).map((app, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: app.name,
    url: `${SITE_URL}/app/${app.id}`,
    description: app.tagline,
    image: app.icon,
  }));

  // JSON-LD Structured Data Schema Markup
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AppScout',
    url: SITE_URL,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AppScout',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Safe and transparent free software directory offering official and verified open source download mirrors.',
    sameAs: [
      'https://github.com/Shahab-khan-a/pro-app-finder',
      'https://twitter.com/AppScout',
    ],
  };

  const jsonLdItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Trending Free Software & Apps',
    itemListElement: topFeaturedApps,
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AppScout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AppScout is a verified free and open-source software directory indexing official downloads, desktop tools, and unlocked APKs across Windows, macOS, Linux, Android, and iOS with zero malware and zero ads.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all software downloads on AppScout free and safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every listed application is checked against multi-engine antivirus scanners and links directly to official developer domains, GitHub repositories, and verified mirrors.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often is software updated on AppScout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our indexes are updated daily to track the latest software versions, releases, and changelogs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find the XML Sitemap for search engines?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can access our full search engine sitemap anytime at ${SITE_URL}/sitemap.xml.`,
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Site Verification Meta Tags */}
        {SITE_CONFIG.googleVerificationTokens.map((token) => (
          <meta key={token} name="google-site-verification" content={token} />
        ))}
        {SITE_CONFIG.bingVerificationToken && (
          <meta name="msvalidate.01" content={SITE_CONFIG.bingVerificationToken} />
        )}

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Dynamic Sitemap Link */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        {/* JSON-LD Structured Data for Google Sitelinks Search & Rich Cards */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />

        {/* Theme Initializer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('appfinder_theme');
                  var isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
