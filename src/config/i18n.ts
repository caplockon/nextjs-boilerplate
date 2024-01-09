import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../public/locales/${locale}.json`)).default,

  // The time zone can either be statically defined, read from the
  // user profile if you store such a setting, or based on dynamic
  // request information like the locale or headers.
  timeZone: 'UTC',
}))
