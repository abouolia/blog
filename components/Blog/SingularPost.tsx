import React from 'react';
import tw from 'twin.macro';

interface ISinglePostProps {
  title: string;
  content: string | JSX.Element;
}

export function SingularPost({ title, content }: ISinglePostProps) {
  return (
    <SingularPostRoot>
      <SingularPostHeader>
        <SingularPostTitle>{title}</SingularPostTitle>
        <SingularPostDate>
          <time datetime="2022-04-21">Published on 21 April, 2022</time>
          <time datetime="2022-04-21">Published on 21 April, 2022</time>
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
