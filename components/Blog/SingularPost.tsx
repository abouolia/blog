import React from 'react';
import tw from 'twin.macro';
import { formateDateFull } from '../../utils/formatDate';

interface ISinglePostProps {
  title: string;
  content: string | JSX.Element;
  publishedAt: string;
  updatedAt?: string;
}

export function SingularPost({
  title,
  content,
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
      </SingularPostHeader>

      <SingularPostContent>{content}</SingularPostContent>
    </SingularPostRoot>
  );
}

const SingularPostRoot = tw.article`
  max-w-[85ch]
  mx-auto
  pt-12
  pb-28
  px-5
`;
const SingularPostHeader = tw.div``;
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
  pb-8
  text-sm
  font-thin
  uppercase
  text-warmGray-500
  dark:text-warmGray-400
`;
