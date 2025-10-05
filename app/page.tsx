// app/page.tsx
import Link from '@/components/Link'
import Card from '@/components/Card'
import siteMetadata from '@/data/siteMetadata'
import { getAllPostsForHome } from '../lib/ghost'

export const metadata = {
  title: 'Home',
  description: siteMetadata.description,
}

export default async function Page() {
  const posts = await getAllPostsForHome()
  const recentPosts = posts.slice(0, 2)

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Welcome to my blog.
        </p>
      </div>
      <div className="container py-12">
        <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 mb-8">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!recentPosts.length && 'No posts found.'}
          {recentPosts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              description={post.summary}
              imgSrc={undefined}
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
