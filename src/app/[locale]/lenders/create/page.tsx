import { IconHomeOutline } from '@/components/icons'
import type { BreadcrumbItem } from '@/components/partials/page-header/Breadcrumb'
import PageHeader from '@/components/partials/page-header/PageHeader'
import LenderCreateView from '@/views/lender/lender-create/LenderCreateView'

export default function LenderCreatePage() {
  const breadcrumb: BreadcrumbItem[] = [
    {
      label: 'Lender',
      icon: <IconHomeOutline className="mr-2" size={16} />,
      link: '/lenders',
    },
    {
      label: 'Create Lender',
    },
  ]
  return (
    <>
      <PageHeader breadcrumb={breadcrumb}>Create New Lender</PageHeader>

      <div className="max-w-lg">
        <LenderCreateView />
      </div>
    </>
  )
}
