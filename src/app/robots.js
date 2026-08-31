export default function robots() {
  const baseUrl =
    'https://app-scout-git-main-kms475531-5446s-projects.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
