const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://appscout.io';

export const metadata = {
  title: 'Top Popular & Trending Free Software Leaderboard | AppScout',
  description: 'Discover the most downloaded free software, highest-rated open-source apps, and editor picks voted by the global developer & creator community.',
  keywords: [
    'top free software',
    'most popular apps',
    'trending open source',
    'highest rated free apps',
    'best software leaderboard',
    'popular apk mods',
  ],
  alternates: {
    canonical: `${siteUrl}/popular`,
  },
  openGraph: {
    title: 'Top Popular & Trending Free Software Leaderboard | AppScout',
    description: 'Weekly curated leaderboard of the most popular and highest rated free desktop & mobile applications.',
    url: `${siteUrl}/popular`,
    type: 'website',
  },
};

export default function PopularLayout({ children }) {
  return <>{children}</>;
}
