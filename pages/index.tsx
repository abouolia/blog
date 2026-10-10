import { serialize } from 'next-mdx-remote/serialize';
import { config } from '../config';
import { getHomePage } from '../utils/posts';
import { personJsonLd } from '../utils/seo';
import { MDXContent, SEO } from '../components';

const activeRepositories = [
  {
    title: 'bigcapital',
    href: 'https://github.com/bigcapitalhq/bigcapital',
    description:
      'Bigcapital is financial accounting with intelligent reporting for faster decision-making, an open-source alternative to Quickbooks, Xero, etc.',
  },
  {
    title: 'noya-media-editor',
    href: 'https://media-editor.netlify.app',
    description: 'Noya (YC 23) collaborative video editor',
  },
  {
    title: 'sticky-sidebar',
    href: 'https://github.com/abouolia/sticky-sidebar',
    description:
      'Pure JavaScript tool for making smart and high performance sticky sidebar.',
  },
  {
    title: 'blueprintjs-formik',
    href: 'https://github.com/bigcapitalhq/blueprintjs-formik',
    description:
      'Binds Blueprint.js components with Formik for easy development.',
  },
  {
    title: 'use-next-context',
    href: 'https://github.com/abouolia/use-next-context',
    description: 'Performance optimized React Context API.',
  },
  {
    title: 'time-progress-bar-extension',
    href: 'https://github.com/abouolia/time-progress-bar-extension',
    description: 'Time progress bar by day, month and year.',
  },
  {
    title: 'haveno-ui',
    href: 'https://github.com/haveno-dex/haveno-ui',
    description: 'Haveno user interface',
  },
  {
    title: 'wp-gulp-starter',
    href: 'https://github.com/Customattic/WP-Gulp-Starter',
    description: 'WP gulp starter',
  },
  {
    title: 'fahem',
    href: 'https://github.com/abouolia/Fahembot',
    description: 'Chatbot based on machine learning, conversational dialog',
  },
];

/**
 * Index page.
 * @returns {JSX.Element}
 */
export default function Index({ source }) {
  return (
    <div>
      <SEO
        description={config.siteDescription}
        canonicalPath="/"
        jsonLd={personJsonLd()}
      />

      <article className="w-full sm:max-w-[75ch] m-auto px-5 py-16 flex flex-col">
        <h1 className="sr-only">{config.siteTitle}</h1>

        <MDXContent {...source} />

        <h4 className="font-bold mb-2 opacity-75">Active Repositories</h4>
        <div className="flex flex-col">
          {activeRepositories.map((repo, index) => (
            <div
              className="py-3 border-b flex flex-col md:flex-row gap-1 border-b-[#d1d5db] dark:border-b-[#262626] md:items-center"
              key={index}
            >
              <div className="relative left-[-4px] md:min-w-[30%] md:max-w-[30%]">
                <a
                  className="inline-block leading-snug px-1 font-light transition-colors duration-75 ease-linear rounded-sm hover:bg-hovered dark:hover:bg-hovered-dark dark:hover:text-white"
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /{repo.title}
                </a>
              </div>
              <div className="text-sm opacity-80">{repo.description}</div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

export async function getStaticProps() {
  const post = getHomePage(['title', 'date', 'slug', 'content']);
  const source = await serialize(post.content || '', { blockJS: false });

  return {
    props: {
      source,
    },
  };
}
