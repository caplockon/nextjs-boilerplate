import { getTranslations } from 'next-intl/server'

import XWelcome from '@/components/home/welcome/XWelcome'
import type { PropsWithLocaleParam } from '@/entities/common'

export async function generateMetadata(props: PropsWithLocaleParam) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'IndexPage',
  })
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default function IndexPage() {
  return <XWelcome />
}
