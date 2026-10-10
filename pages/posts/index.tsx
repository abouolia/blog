import { Post, PostsList, SEO } from '../../components';
import { config } from '../../config';
import { getAllPosts } from '../../utils/posts';
import { blogListJsonLd } from '../../utils/seo';

function BlogPosts({ posts }) {
  return posts.map((post) => (
    <Post
      key={post.slug}
      title={post.title}
      date={post.publishedAt}
      slug={post.slug}
      tags={post.tags}
    />
  ));
}

export default function Index({ allPosts }) {
  return (
    <div>
      <SEO
        title="Blog"
        description={`Articles and deep dives on JavaScript, TypeScript, React, and web engineering by ${config.authorName}.`}
        canonicalPath="/posts"
        jsonLd={blogListJsonLd(allPosts)}
      />
      <PostsList>
        <h1 className="sr-only">Blog</h1>
        {allPosts.length > 0 && <BlogPosts posts={allPosts} />}
      </PostsList>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'slug',
    'publishedAt',
    'tags'
  ]);

  return {
    props: { allPosts },
  };
}
