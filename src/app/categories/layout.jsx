const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appo-rho.vercel.app';

export const metadata = {
  title: 'Browse Free Software by Category | AppScout',
  description: 'Explore verified free & open-source applications organized by category: Video Editing, Coding Tools, Graphic Design, Privacy & VPN, Audio, Utilities, and Productivity.',
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
    canonical: `${siteUrl}/categories`,
  },
  openGraph: {
    title: 'Browse Free Software by Category | AppScout',
    description: 'Explore verified free and open-source applications organized by categories and workflows.',
    url: `${siteUrl}/categories`,
    type: 'website',
  },
};

export default function CategoriesLayout({ children }) {
  return <>{children}</>;
}
