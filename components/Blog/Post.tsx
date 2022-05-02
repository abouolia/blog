import React from 'react';
import tw from 'twin.macro';
import Link from 'next/link';
import { ArticleRoot } from './ArticleRoot';

export function PostsList({ children }) {
  return <PostsListRoot>{children}</PostsListRoot>;
}

export function Post({ title, date, slug, tags }) {
  return (
    <PostRoot>
      <PostLink slug={slug}>
        <PostEntry>
          <PostDate>{date}</PostDate>
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
const PostEntry = tw.div`
  flex
  items-center
  p-1
  capitalize
  transition-colors
  duration-200
  rounded
  outline-none
`;
const PostDate = tw.div`
  text-sm
  mr-8
  min-w-[50px]
`;
const PostTitle = tw.h3`
  font-light
`;
const PostsListRoot = tw.div`
  w-full
  sm:max-w-[75ch]
  m-auto
  px-5
  py-16
  flex
  flex-col
  justify-center
  items-center
`;
