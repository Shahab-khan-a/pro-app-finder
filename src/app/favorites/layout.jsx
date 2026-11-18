import { SITE_URL } from '@/utils/seoConfig';

export const metadata = {
  title: 'My Saved & Bookmarked Software | AppScout',
  description: 'Access and manage your personal collection of bookmarked free software and unlocked apps on AppScout.',
  alternates: {
    canonical: `${SITE_URL}/favorites`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesLayout({ children }) {
  return <>{children}</>;
}
