import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          {`© ${new Date().getFullYear()} • Built with Next.js, Tailwind, and Ghost CMS`}
        </div>
      </div>
    </footer>
  )
}

