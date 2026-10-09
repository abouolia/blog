import React from 'react';
import { formateDateFull } from '../../utils/formatDate';
import { PostTag, PostTags } from './Tags';

interface ISinglePostProps {
  title: string;
  content: string | JSX.Element;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
}

export function SingularPost({
  title,
  content,
  tags,
  publishedAt,
  updatedAt,
}: ISinglePostProps) {
  return (
    <article className="max-w-[85ch] mx-auto pt-12 pb-28 px-5">
      <div className="pb-8">
        <h1 className="mb-1 text-3xl font-black capitalize md:text-4xl">
          {title}
        </h1>
        <div className="flex flex-col pt-4 text-sm font-thin uppercase text-stone-500 dark:text-stone-400 tracking-widest">
          {publishedAt && (
            <time dateTime="2022-04-21">
              Published on {formateDateFull(publishedAt)}
            </time>
          )}
          {updatedAt && (
            <time dateTime="2022-04-21">
              Published on {formateDateFull(updatedAt)}
            </time>
          )}
        </div>

        {tags && (
          <PostTags className="mt-5">
            {tags.map((tag) => (
              <PostTag key={tag}>#{tag}</PostTag>
            ))}
          </PostTags>
        )}
      </div>

      <div>{content}</div>
    </article>
  );
}
