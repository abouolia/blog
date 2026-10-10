import { config } from '../config';

/**
 * Turns a path into an absolute URL using the configured site URL.
 */
export function absoluteUrl(path = ''): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return `${config.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Builds a plain text excerpt from raw MDX content, used as a
 * description fallback when a post has no `description` frontmatter.
 */
export function excerptFromMdx(content = '', maxLength = 160): string {
  const text = content
    // Remove self-closing and paired JSX/MDX components.
    .replace(/<[^>]*\/>/g, ' ')
    .replace(/<[^>]*>[\s\S]*?<\/[^>]*>/g, ' ')
    // Markdown images, links, emphasis, code, headings, and lists.
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

interface JsonLdPost {
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
}

/** Structured data for the author, used on the home page. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.authorName,
    url: config.siteUrl,
    image: absoluteUrl(config.navbarAvatar),
    sameAs: [
      `https://github.com/${config.githubHandle}`,
      `https://twitter.com/${config.twitterHandle}`,
    ],
  };
}

/** Structured data for a single blog post. */
export function blogPostingJsonLd(post: JsonLdPost) {
  const url = absoluteUrl(`/posts/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: config.authorName,
      url: config.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: config.authorName,
      url: config.siteUrl,
    },
    image: absoluteUrl(post.image || config.defaultOgImage),
    keywords: post.tags?.join(', '),
  };
}

/** Structured data for the breadcrumb trail of a page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Structured data for the list of posts. */
export function blogListJsonLd(posts: JsonLdPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${config.siteTitle} Blog`,
    url: absoluteUrl('/posts'),
    description: config.siteDescription,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/posts/${post.slug}`),
      datePublished: post.publishedAt,
    })),
  };
}
