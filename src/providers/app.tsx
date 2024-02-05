'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import type { PropsWithChildren } from 'react'

import { LoadingStateProvider } from '@/components/general'
import type { PropsWithLocaleParam } from '@/entities/common'
import AdminAuthProvider from '@/providers/auth/AdminAuthProvider'
import { ModalProvider } from '@/providers/modal'
import { NotificationProvider } from '@/providers/notification'
import { queryClient } from '@/providers/react-query'
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
            <QueryClientProvider client={queryClient}>
              <NotificationProvider>
                <ModalProvider>{children}</ModalProvider>
              </NotificationProvider>
            </QueryClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </AdminAuthProvider>

      <LoadingStateProvider />
    </>
  )
}
