import type { Address } from '@/entities/common'

export type Lender = {
  uid?: string
  name?: string
  logo?: string
  is_active?: boolean
  address?: Address
  created_at?: string
  updated_at?: string
}
