// @ts-ignore
import type { LocalePrefix } from 'next-intl/dist/types/src/shared/types'

const localePrefix: LocalePrefix = 'never'

export const AppConfig = {
  name: 'NextJS - Boilerplate',
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix,
}
