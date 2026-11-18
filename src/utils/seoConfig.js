// Centralized SEO and Site Configuration for AppScout
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://app-scout-git-main-kms475531-5446s-projects.vercel.app';

export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '').replace(/\/+$/, '');

export const SITE_CONFIG = {
  name: 'AppScout',
  shortName: 'AppScout',
  tagline: 'Free Pro Apps, Unlocked APKs & Verified Software Directory',
  description:
    'Download 10,000+ free pro apps, unlocked APKs, open-source software, and verified desktop tools for Windows, macOS, Linux, Android, and iOS. Direct official links, zero malware, zero adware, and 100% verified working mirrors.',
  url: SITE_URL,
  domain: SITE_DOMAIN,
  ogImage: `${SITE_URL}/opengraph-image`,
  twitterImage: `${SITE_URL}/twitter-image`,
  logo: `${SITE_URL}/favicon.svg`,
  twitterHandle: '@AppScout',
  googleVerificationTokens: [
    'W4WuwZJ4td4JVT1Nl6eKPw6hvQzC8Vwx0OtmD57VOKU',
    'i9p0jcuKO_11lvYKwmbcOeqjL1ZT8ZC2ZH-lTM-FAzQ',
    'yBgDKdm2b3hmW9Pywsmr4QuAgqEBRQME-6x4rBZlM5w',
  ],
  bingVerificationToken: process.env.NEXT_PUBLIC_BING_VERIFICATION || '3780517D16641FD44F69553ED84E334D',
  yandexVerificationToken: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
};
