import type { ImgHTMLAttributes } from 'react'

export type XAvatarProps = ImgHTMLAttributes<HTMLImageElement> & {}

export const XAvatar = (props: XAvatarProps) => {
  const { src, alt } = props
  return src ? (
    <img className="h-10 w-10 rounded-full" src={src} alt={alt} />
  ) : (
    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
      <svg
        className="absolute -left-1 h-12 w-12 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
