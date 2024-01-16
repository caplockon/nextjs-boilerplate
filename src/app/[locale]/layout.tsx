import '@/styles/globals.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { useMessages } from 'next-intl'

import AppProviders from '@/providers/app'
import { AppConfig } from '@/config'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS - Boilerplate',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(locale)) notFound()

  // Using internationalization in Client Components
  const i18nMessages = useMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"
          async
        />
      </head>
      <body className={inter.className} id="app">
        <AppProviders params={{ locale, i18nMessages }}>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
