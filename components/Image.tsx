import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const isExternal = (src: string | import('next/dist/shared/lib/get-img-props').StaticImport) =>
  typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={isExternal(src) ? (src as string) : `${basePath || ''}${src}`} {...rest} />
)

export default Image
