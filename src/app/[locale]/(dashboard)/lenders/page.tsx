import { getTranslations } from 'next-intl/server'

import { IconHomeOutline } from '@/components/icons'
import type { BreadcrumbItem } from '@/components/layout/page-header/Breadcrumb'
import PageHeader from '@/components/layout/page-header/PageHeader'
import type { PageMetadata, PropsWithLocaleParam } from '@/entities/common'
import { LenderListView } from '@/views/lender'

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
  const breadcrumb: BreadcrumbItem[] = [
    {
      label: 'Lender',
      icon: <IconHomeOutline className="mr-2" size={16} />,
    },
  ]
  return (
    <div>
      <PageHeader
        breadcrumb={breadcrumb}
        rightHeader={<a href="/lenders/create">Create New Lender</a>}
      >
        Lender Clients
      </PageHeader>

      <LenderListView />
    </div>
  )
}
