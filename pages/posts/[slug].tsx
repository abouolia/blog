import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { getPostBySlug, getAllPosts } from '../../utils/posts';
import { MDXContent, SingularPost } from '../../components';
import { config } from '../../config';

export default function Post({ post, source }) {
  const router = useRouter();

  // Display not found error if the post not found.
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>
          {post.title} | {config.siteTitle}
        </title>
      </Head>
      <SingularPost title={post.title} content={<MDXContent {...source} />} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);
  const source = await serialize(post?.content || '');

  return {
    props: {
      post: {
        ...post,
      },
      source,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post?.slug || '',
        },
      };
    }),
    fallback: false,
  };
}
