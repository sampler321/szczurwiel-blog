// app/blog/[...slug]/page.tsx
import 'css/prism.css'
import 'katex/dist/katex.min.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { getPostAndMorePosts, getAllPostsWithSlug } from '../../../lib/ghost' // USE RELATIVE PATH
import PostLayout from '@/layouts/PostLayout'

// This function tells Next.js which blog post slugs exist
export async function generateStaticParams() {
  const posts = await getAllPostsWithSlug()
  return posts.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Blog({ params }: { params: { slug: Array<string> } }) {
  const slug = params.slug.join('/')
  const { post } = await getPostAndMorePosts(slug)

  // The template expects author details in a specific format
  const authorDetails = post.author ? [{
    name: post.author.name,
    avatar: post.author.profile_image,
    occupation: 'Author', // You can add more details from Ghost if you want
    company: 'My Blog',
    email: 'mailto:your-email@example.com',
    twitter: post.author.twitter ? `https://twitter.com/${post.author.twitter}` : '',
    linkedin: '',
    github: '',
  }] : []

  return (
    <PostLayout
      content={post}
      authorDetails={authorDetails}
      next={null}
      prev={null}
    >
      <div className="prose max-w-none dark:prose-dark pb-8 pt-10">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </PostLayout>
  )
}
