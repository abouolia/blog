/**
 * Builds `public/rss.xml` from the posts in `content/posts`.
 * Runs as part of `postbuild`, alongside `next-sitemap`.
 *
 * Keep the site constants in sync with `config/index.ts`.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-abouolia.vercel.app'
).replace(/\/+$/, '');
const SITE_TITLE = 'Ahmed Bouhuolia';
const SITE_DESCRIPTION =
  'Personal website and blog of Ahmed Bouhuolia — writing about JavaScript, TypeScript, React, web technologies, and software engineering.';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function excerptFromMdx(content = '', maxLength = 200) {
  const text = content
    .replace(/<[^>]*\/>/g, ' ')
    .replace(/<[^>]*>[\s\S]*?<\/[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}…`;
}

const posts = fs
  .readdirSync(postsDirectory)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const { data, content } = matter(
      fs.readFileSync(path.join(postsDirectory, file), 'utf8')
    );
    return {
      slug,
      ...data,
      excerpt: data.description || excerptFromMdx(content),
    };
  })
  .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));

const items = posts
  .map((post) => {
    const url = `${SITE_URL}/posts/${post.slug}`;
    const categories = (post.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => `      <category>${escapeXml(tag)}</category>`)
      .join('\n');

    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
      categories,
      `      <description>${escapeXml(post.excerpt)}</description>`,
      '    </item>',
    ]
      .filter(Boolean)
      .join('\n');
  })
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
fs.writeFileSync(outputPath, rss);
console.log(`Generated RSS feed with ${posts.length} posts at public/rss.xml`);
