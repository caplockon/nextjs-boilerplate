'use client'

import { useTranslations } from 'next-intl'

import { useAuthContext } from '@/providers/auth'

/**
 * Component to show form to edit a lender
 * @constructor
 */
export default function XWelcome() {
  // Initialize translation messages for welcome page
  const t = useTranslations('Welcome')
  const { user } = useAuthContext()

  return (
    <main className="p-6">
      {t('message')} {user?.name}
    </main>
  )
}
