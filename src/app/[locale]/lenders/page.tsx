import { getTranslations } from 'next-intl/server'

import type { PageMetadata, PropsWithLocaleParam } from '@/entities/common'
import { LenderListView } from '@/views/lender'
import {XPageHeader} from "@/components/data-display";

export async function generateMetadata(
  props: PropsWithLocaleParam
): Promise<PageMetadata> {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'LenderIndex',
  })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default function IndexPage() {
  return (
    <div>
      <XPageHeader>Lender Clients</XPageHeader>
      <LenderListView />
    </div>
  )
}
