const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';

export const metadata = {
  title: 'Safety, Transparency & Zero-Malware Guarantee | AppScout',
  description: 'Learn why AppScout provides 100% verified official download links, zero adware, zero malware wrappers, and strict open-source auditing.',
  keywords: [
    'software safety guarantee',
    'safe app downloads',
    'no malware free software',
    'clean official downloads',
    'open source verification',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'Safety, Transparency & Zero-Malware Guarantee | AppScout',
    description: 'Learn why AppScout is the most trusted directory for official free and open-source software downloads.',
    url: `${siteUrl}/about`,
    type: 'article',
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
