const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';

export const metadata = {
  title: 'My Saved & Bookmarked Software | AppScout',
  description: 'Access and manage your personal collection of bookmarked free software and unlocked apps on AppScout.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesLayout({ children }) {
  return <>{children}</>;
}
