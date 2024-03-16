import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'content/posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

interface PostContentMeta {
  slug?: string;
  content?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  title?: string;
}
interface HomepageContentMeta {
  slug?: string;
  content?: string;
}

export function getPostBySlug(slug, fields = []): PostContentMeta {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
    if (field === 'tags') {
      items[field] = items[field]?.split(',')?.map(tag => tag.trim());
    }
  });
  return items;
}

export function getAllPosts(fields = []): PostContentMeta[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));

  return posts;
}

export function getHomePage(fields): HomepageContentMeta {
  const fullPath = join('content/', `home.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {
    slug: 'home',
  };
  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });
  return items;
}
