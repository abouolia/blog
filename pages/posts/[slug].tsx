import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { serialize } from 'next-mdx-remote/serialize';
import { getPostBySlug, getAllPosts } from '../../utils/posts';
import { MDXContent, SEO, SingularPost } from '../../components';
import { config } from '../../config';
import { blogPostingJsonLd, breadcrumbJsonLd, excerptFromMdx } from '../../utils/seo';

export default function Post({ post, source }) {
  const router = useRouter();

  // Display not found error if the post not found.
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const description =
    post.description || excerptFromMdx(post.content) || config.siteDescription;

  return (
    <>
      <SEO
        title={post.title}
        description={description}
        canonicalPath={`/posts/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.publishedAt}
        updatedTime={post.updatedAt}
        tags={post.tags}
        jsonLd={[
          blogPostingJsonLd({ ...post, description }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/posts' },
            { name: post.title, path: `/posts/${post.slug}` },
          ]),
        ]}
      />
      <SingularPost
        title={post.title}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        content={<MDXContent {...source} />}
        tags={post.tags}
      />
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'description',
    'image',
    'publishedAt',
    'updatedAt',
    'slug',
    'tags',
    'content',
  ]);
  const source = await serialize(post?.content || '', { blockJS: false });

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
