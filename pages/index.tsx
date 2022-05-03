import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import tw from 'twin.macro';
import { config } from '../config';
import { getHomePage } from '../utils/posts';
import { MDXContent } from '../components';
const components = {};

export default function Index({ source }) {
  return (
    <div>
      <Head>
        <title>{config.siteTitle}</title>
      </Head>

      <HomepageRoot>
        <MDXContent {...source} />
      </HomepageRoot>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getHomePage(['title', 'date', 'slug', 'content']);
  const source = await serialize(post?.content || '');

  return {
    props: {
      source,
    },
  };
}

const HomepageRoot = tw.div`
  w-full
  sm:max-w-[75ch]
  m-auto
  px-5
  py-16
  flex
  flex-col
`;
