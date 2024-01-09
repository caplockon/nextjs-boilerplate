'use client'

import { useTranslations } from 'next-intl'

/**
 * Component to show form to edit a lender
 * @constructor
 */
export default function XWelcome() {
  // Initialize translation messages for welcome page
  const t = useTranslations('Welcome')

  return <main className="p-6">{t('message')}</main>
}
