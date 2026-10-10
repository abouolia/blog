const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Keep in sync with `config/index.ts`. Set NEXT_PUBLIC_SITE_URL in the
// hosting environment (e.g. Vercel) to the production domain.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-abouolia.vercel.app'
).replace(/\/+$/, '');

/**
 * Reads `lastmod` from a post's frontmatter.
 */
function getPostLastmod(slug) {
  try {
    const file = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    const lastmod = data.updatedAt || data.publishedAt;
    return lastmod ? new Date(lastmod).toISOString() : null;
  } catch (error) {
    return null;
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  trailingSlash: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1,
        lastmod: config.lastmod,
      };
    }

    if (path === '/posts') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: config.lastmod,
      };
    }

    const postMatch = path.match(/^\/posts\/(.+)$/);
    if (postMatch) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: getPostLastmod(postMatch[1]) || config.lastmod,
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.lastmod,
    };
  },
};
