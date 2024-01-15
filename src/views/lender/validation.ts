import type { Lender } from '@/entities/lender'
import { defineSchema } from '@/utils/misc'

/**
 * Define validation rules for lender form
 */
export const lenderSchema = defineSchema<Lender>((rule) => ({
  name: rule.string().required('Lender name is required').min(5),
  is_active: rule.boolean().required(),
  logo: rule.string().nullable(),
  address: rule
    .object()
    .required()
    .shape({
      city: rule.string().required('City is required field'),
      street_1: rule.string().required('Address Street is required field'),
      state: rule.string().required('State is required field'),
      zipcode: rule.string().required('Zipcode is required field'),
    }),
}))
