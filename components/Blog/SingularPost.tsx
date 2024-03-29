import React from 'react';
import tw from 'twin.macro';
import { formateDateFull } from '../../utils/formatDate';
import { ArticleRoot } from './ArticleRoot';
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
    <SingularPostRoot>
      <SingularPostHeader>
        <SingularPostTitle>{title}</SingularPostTitle>
        <SingularPostDate>
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
        </SingularPostDate>

        {tags && (
          <SingularTags>
            {tags.map((tag) => (
              <PostTag>#{tag}</PostTag>
            ))}
          </SingularTags>
        )}
      </SingularPostHeader>

      <SingularPostContent>{content}</SingularPostContent>
    </SingularPostRoot>
  );
}

const SingularPostRoot = tw(ArticleRoot)`
  max-w-[85ch]
  mx-auto
  pt-12
  pb-28
  px-5
`;
const SingularPostHeader = tw.div`pb-8`;
const SingularPostTitle = tw.h1`
  mb-1
  text-3xl
  font-black
  capitalize
  md:text-4xl
  
`;
const SingularPostContent = tw.div``;
const SingularPostDate = tw.div`
  flex
  flex-col
  pt-4
  text-sm
  font-thin
  uppercase
  text-warmGray-500
  dark:text-warmGray-400
  tracking-widest
`;
const SingularTags = tw(PostTags)`mt-5`