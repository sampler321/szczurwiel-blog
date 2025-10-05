import Image from '@/components/Image'
import Link from '@/components/Link'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
// Ghost avatar not used on About per request

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Link href="/">
          <Image src="/media/avatar.png" alt={author.name} width={160} height={160} className="rounded-full" priority />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">{author.name}</h1>
          {author.occupation && (
            <p className="mt-2 text-gray-400">{author.occupation}</p>
          )}
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <MDXLayoutRenderer code={author.body.code} />
      </div>
    </section>
  )
}
