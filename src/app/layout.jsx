import './globals.css';
import { APPS_DATA } from '@/data/appsData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appo-rho.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AppScout - Free Pro Apps, Unlocked APKs & Verified Software Downloads',
    template: '%s | AppScout - Free Software & Unlocked APKs',
  },
  description: 'Download 10,000+ free pro apps, unlocked APKs, open-source software, and verified desktop tools for Windows, macOS, Linux, Android, and iOS. Direct official links, zero malware, zero adware, and 100% verified working mirrors.',
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
    'Truecaller Gold APK'
  ],
  authors: [{ name: 'AppScout Team', url: siteUrl }],
  creator: 'AppScout',
  publisher: 'AppScout Open Software Index',
  applicationName: 'AppScout',
  generator: 'Next.js',
  category: 'Software & Technology',
  classification: 'Software Directory, APK Downloader, Open Source Registry',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
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
    title: 'AppScout - Free Pro Apps, Unlocked APKs & Verified Software Downloads',
    description: 'Browse 10,000+ verified free desktop applications, open-source tools, and unlocked mobile APKs with direct official download links.',
    url: siteUrl,
    siteName: 'AppScout',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AppScout - Verified Free Software & Pro APK Downloads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppScout - Free Pro Apps, Unlocked APKs & Verified Software Downloads',
    description: 'Discover thousands of open-source tools, free pro software, and unlocked APKs with direct official publisher download links.',
    creator: '@AppScout',
    site: '@AppScout',
    images: [`${siteUrl}/og-image.png`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'i9p0jcuKO_11lvYKwmbcOeqjL1ZT8ZC2ZH-lTM-FAzQ',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || undefined,
    },
  },
};

export default function RootLayout({ children }) {
  // Top 10 featured apps for schema.org/ItemList
  const topFeaturedApps = APPS_DATA.slice(0, 10).map((app, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: app.name,
    url: `${siteUrl}/app/${app.id}`,
    description: app.tagline,
    image: app.icon,
  }));

  // JSON-LD Structured Data Schema Markup
  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AppScout',
    url: siteUrl,
    description: 'Free pro apps, unlocked APKs, open-source software, and verified desktop tools directory.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AppScout',
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description: 'Safe and transparent free software directory offering official and verified open source download mirrors.',
    sameAs: [
      'https://github.com/appscout',
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
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

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
