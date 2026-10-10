import React from 'react';
import Link from 'next/link';
import { highlightText } from '../Button';
import { formateDatePreview } from '../../utils/formatDate';
import { PostTag, PostTags } from './Tags';

/**
 * Posts list container.
 * @returns {JSX.Element}
 */
export function PostsList({ children }) {
  return (
    <div className="w-full sm:max-w-[75ch] m-auto md:px-5 px-4 md:py-16 py-12 flex flex-col">
      {children}
    </div>
  );
}

interface PostProps {
  title: string;
  date: string;
  slug: string;
  tags: string[];
}
/**
 * Blog post.
 * @param   {PostProps}
 * @returns {JSX.Element}
 */
export function Post({ title, date, slug, tags }: PostProps) {
  return (
    <article className="md:py-8 py-6 border-b dark:border-white dark:border-opacity-5 border-black border-opacity-5">
      <div className="flex md:items-center md:p-1 capitalize transition-colors duration-200 rounded outline-none md:flex-row flex-col">
        <div className="text-sm mr-6 md:min-w-[60px] md:mb-0 mb-1 md:opacity-90 opacity-50">
          {formateDatePreview(date)}
        </div>

        <div>
          <PostLink slug={slug}>
            <h2 className={`${highlightText} text-[20px] pl-2 pr-2`}>
              {title}
            </h2>
          </PostLink>
          {tags && (
            <PostTags>
              {tags.map((tag) => (
                <PostTag key={tag}>#{tag}</PostTag>
              ))}
            </PostTags>
          )}
        </div>
      </div>
    </article>
  );
}

function PostLink({ slug, children }) {
  return (
    <Link href={`/posts/${slug}`}>
      <a className="inline-block">{children}</a>
    </Link>
  );
}
