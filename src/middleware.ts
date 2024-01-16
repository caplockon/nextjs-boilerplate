import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { AppConfig } from '@/config'

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
})

export default function middleware(req: NextRequest) {
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
