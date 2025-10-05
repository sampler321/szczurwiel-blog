'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Image from '@/components/Image'

const Header = () => {
  const pathname = usePathname()
  let headerClass = 'flex items-center w-full bg-gray-900 justify-between py-10 md:mx-auto md:max-w-4xl'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          {pathname !== '/about' && (
            <Image src="/media/avatar.png" alt="Avatar" width={48} height={48} className="rounded-full" priority />
          )}
          {pathname !== '/about' && (
            <span className="font-bold text-xl ml-4">Szczurwiel</span>
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar flex flex-wrap items-center gap-x-2 overflow-x-auto pr-4 sm:pr-6 md:max-w-96 w-full justify-center">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-sm text-gray-900 dark:text-gray-100 md:text-base"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
