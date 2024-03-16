import React from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { ArticleRoot } from './ArticleRoot';
import { HighlightText } from '../Button';
import { formateDatePreview } from '../../utils/formatDate';
import { PostTag, PostTags } from './Tags';

/**
 * Posts list container.
 * @returns {JSX.Element}
 */
export function PostsList({ children }) {
  return <PostsListRoot>{children}</PostsListRoot>;
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
    <PostRoot>
      <PostEntry>
        <PostDate>{formateDatePreview(date)}</PostDate>

        <div>
          <PostLink slug={slug}>
            <PostTitle>{title}</PostTitle>
          </PostLink>
          {tags && (
            <PostTags>
              {tags.map((tag) => (
                <PostTag>#{tag}</PostTag>
              ))}
            </PostTags>
          )}
        </div>
      </PostEntry>
    </PostRoot>
  );
}

function PostLink({ slug, children }) {
  return (
    <Link href={`/posts/${slug}`}>
      <a>{children}</a>
    </Link>
  );
}

const PostRoot = tw(
  ArticleRoot
)`py-8 border-b dark:border-white dark:border-opacity-5 border-black border-opacity-5`;

const PostEntry = styled.div(() => [
  tw`
    flex
    items-center
    p-1
    capitalize
    transition-colors
    duration-200
    rounded
    outline-none
  `,
]);
const PostDate = styled.div(() => [tw`text-sm mr-6 min-w-[60px] opacity-90`]);
const PostTitle = styled.h3(() => [
  ...HighlightText(),
  tw`text-[20px] pl-2 pr-2`,
]);
const PostsListRoot = styled.div(() => [
  tw`
  w-full
  sm:max-w-[75ch]
  m-auto
  px-5
  py-16
  flex
  flex-col`,
]);
