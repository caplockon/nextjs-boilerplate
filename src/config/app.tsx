// @ts-ignore
import type { LocalePrefix } from 'next-intl/dist/types/src/shared/types'

import type { PropsWithReactNode } from '@/entities/common'

const localePrefix: LocalePrefix = 'never'

export const AppConfig = {
  name: 'NextJS - Boilerplate',
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix,
}

export const ThemeRegistry = (props: PropsWithReactNode) => {
  return props.children
}
