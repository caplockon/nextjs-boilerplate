'use client'

import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import type { PropsWithChildren } from 'react'

import { LoadingStateProvider } from '@/components/general'
import type { PropsWithLocaleParam } from '@/entities/common'
import AdminAuthProvider from '@/providers/auth/AdminAuthProvider'
import { ThemeProvider } from '@/providers/theme'

export default function AppProviders({
  children,
  params: { locale, i18nMessages },
}: PropsWithChildren &
  PropsWithLocaleParam & { params: { i18nMessages: AbstractIntlMessages } }) {
  return (
    <>
      <AdminAuthProvider>
        <ThemeProvider>
          <NextIntlClientProvider
            timeZone="UTC"
            locale={locale}
            messages={i18nMessages}
          >
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </AdminAuthProvider>
      <LoadingStateProvider />
    </>
  )
}
