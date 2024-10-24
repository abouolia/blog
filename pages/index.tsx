import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import tw from 'twin.macro';
import { config } from '../config';
import { getHomePage } from '../utils/posts';
import { MDXContent } from '../components';
import { ArticleRoot } from '../components/Blog/ArticleRoot';

const activeRepositories = [
  {
    ttile: 'bigcapital',
    href: 'https://github.com/bigcapitalhq/bigcapital',
    description:
      'Bigcapital is financial accounting with intelligent reporting for faster decision-making, an open-source alternative to Quickbooks, Xero, etc.',
  },
  {
    ttile: 'sticky-sidebar',
    href: 'https://github.com/abouolia/sticky-sidebar',
    description:
      'Pure JavaScript tool for making smart and high performance sticky sidebar.',
  },
  {
    ttile: 'blueprintjs-formik',
    href: 'https://github.com/abouolia',
    description:
      'Binds Blueprint.js components with Formik for easy development.',
  },
  {
    ttile: 'use-next-context',
    href: 'https://github.com/abouolia/use-next-context',
    description: 'Performance optimized React Context API.',
  },
  {
    ttile: 'noya-prose-editor',
    href: 'https://github.com/noya-app/prose-theme',
    description: 'Noya (YC 23) prose editor for content editing and typography styling',
  },
  {
    ttile: 'noya-media-editor',
    href: 'https://github.com/noya-app/media-editor',
    description: 'Noya (YC 23) media editor',
  },
  {
    ttile: 'time-progress-bar-extension',
    href: 'https://github.com/abouolia/time-progress-bar-extension',
    description: 'Time progress bar by day, month and year.',
  },
  {
    ttile: 'haveno-ui',
    href: 'https://github.com/haveno-dex/haveno-ui',
    description: 'Haveno user interface',
  },
  {
    ttile: 'wp-gulp-starter',
    href: 'https://github.com/Customattic/WP-Gulp-Starter',
    description: 'WP gulp starter',
  },
  {
    ttile: 'fahem',
    href: 'https://github.com/abouolia/Fahembot',
    description: 'Chatbot based on machine learning, conversational dialog'
  }
];

/**
 * Index page.
 * @returns {JSX.Element}
 */
export default function Index({ source }) {
  return (
    <div>
      <Head>
        <title>{config.siteTitle}</title>
      </Head>

      <HomepageRoot>
        <MDXContent {...source} />

        <h4 tw="font-bold mb-2 opacity-75">Active Repositories</h4>
        <div tw={'flex flex-col'}>
          {activeRepositories.map((repo, index) => (
            <div
              tw="py-3 border-b flex flex-col md:flex-row gap-1 border-b-[#d1d5db] dark:border-b-[#262626] md:items-center"
              key={index}
            >
              <div tw="relative left-[-4px] md:min-w-[30%] md:max-w-[30%]">
                <a
                  tw="inline-block leading-snug px-1 font-light transition-colors duration-75 ease-linear rounded-sm hover:bg-hovered dark:hover:bg-hovered-dark dark:hover:text-white"
                  href={repo.href}
                  target="_blank"
                >
                  /{repo.ttile}
                </a>
              </div>
              <div tw="text-sm opacity-80">{repo.description}</div>
            </div>
          ))}
        </div>
      </HomepageRoot>
    </div>
  );
}

export async function getStaticProps() {
  const post = getHomePage(['title', 'date', 'slug', 'content']);
  const source = await serialize(post.content || '');

  return {
    props: {
      source,
    },
  };
}

const HomepageRoot = tw(ArticleRoot)`
  w-full
  sm:max-w-[75ch]
  m-auto
  px-5
  py-16
  flex
  flex-col
`;
