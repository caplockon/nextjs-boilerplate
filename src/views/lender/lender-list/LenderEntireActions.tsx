import type { XMenuProps } from '@/components/navigation/dropdown/XDropdown'
import { XDropdown } from '@/components/navigation/dropdown/XDropdown'

export default function LenderEntireActions() {
  const items: XMenuProps['items'] = [
    {
      key: '1',
      label: <a href="http://localhost:8080">Delete</a>,
    },
  ]
  return (
    <XDropdown menu={{ items }}>
      <button type="button">:</button>
    </XDropdown>
  )
}
