import type React from 'react'

export type PropsWithLocaleParam = {
  params: {
    locale: string
  }
}

export type PageMetadata = {
  title?: string
  description?: string
}

export type Address = {
  country?: string
  street_1?: string
  street_2?: string
  street_3?: string
  city?: string
  state?: string
  zipcode?: string
  county?: string
  is_validated?: string
}

export type UploadedSingleFileResponse = {
  success?: boolean
  path?: string
}

export type KeysOf<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? KeysOf<Values[K][number]>[] | any | any[]
      : any | any[]
    : Values[K] extends object
      ? KeysOf<Values[K]>
      : any
}
