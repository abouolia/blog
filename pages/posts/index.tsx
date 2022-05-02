import Head from 'next/head';
import { Post, PostsList } from '../../components';
import { config } from '../../config';
import { getAllPosts } from '../../utils/posts';

function BlogPosts({ posts }) {
  return posts.map((post) => (
    <Post
      key={post.slug}
      title={post.title}
      date={post.date}
      slug={post.slug}
    />
  ));
}

export default function Index({ allPosts }) {
  return (
    <div>
      <Head>
        <title>Blog | { config.siteTitle }</title>
      </Head>
      <PostsList>
        {allPosts.length > 0 && <BlogPosts posts={allPosts} />}
      </PostsList>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
}
