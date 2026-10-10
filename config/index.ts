/**
 * Site-wide config shared by pages, components, and build scripts.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the hosting environment (e.g. Vercel) to the
 * production domain, without a trailing slash, so canonical URLs, the
 * sitemap, robots.txt, and the RSS feed point at the right place.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-abouolia.vercel.app'
).replace(/\/+$/, '');

export const config = {
  siteUrl,
  siteTitle: 'Ahmed Bouhuolia',
  siteDescription:
    'Personal website and blog of Ahmed Bouhuolia — writing about JavaScript, TypeScript, React, web technologies, and software engineering.',
  siteLocale: 'en_US',
  authorName: 'Ahmed Bouhuolia',
  twitterHandle: 'bouhuolia',
  githubHandle: 'abouolia',
  navbarAvatar: '/images/avatar.png',
  defaultOgImage: '/images/og-default.png',
};
