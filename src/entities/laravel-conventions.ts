// Laravel Pagination Resource
export type PaginatorLinks = {
  first?: string
  last?: string
  next?: string
  prev?: string
}

export type PaginatorMeta = {
  current_page?: number
  from?: number
  last_page?: number
  per_page?: number
  to?: number
  total?: number
}

export type PaginatorResponse<T> = {
  data: T[]
  links: PaginatorLinks
  meta: PaginatorMeta
}

export type ResourceResponse<T> = {
  data: T
}

export type ListRequestCriteria = {
  page?: number
  per_page?: number
}
