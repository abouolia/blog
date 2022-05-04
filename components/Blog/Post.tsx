import React from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { ArticleRoot } from './ArticleRoot';
import { HighlightText } from '../Button';
import { formateDatePreview } from '../../utils/formatDate';

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
}
/**
 * Blog post.
 * @param   {PostProps}
 * @returns {JSX.Element}
 */
export function Post({ title, date, slug }: PostProps) {
  return (
    <PostRoot>
      <PostLink slug={slug}>
        <PostEntry>
          <PostDate>{formateDatePreview(date)}</PostDate>
          <PostTitle>{title}</PostTitle>
        </PostEntry>
      </PostLink>
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

const PostRoot = tw(ArticleRoot)`my-8`;
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
const PostDate = styled.div(() => [tw`text-sm mr-8 min-w-[50px]`]);
const PostTitle = styled.h3(() => [...HighlightText()]);
const PostsListRoot = styled.div(() => [
  tw`
  w-full
  sm:max-w-[75ch]
  m-auto
  px-5
  py-16
  flex
  flex-col
  justify-center
  items-center`,
]);
