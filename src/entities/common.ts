import React from 'react';

export type PropsWithLocaleParam = {
  params: {
    locale: string
  }
}

export type PropsWithReactNode = {
  children: React.ReactNode
}

export type PageMetadata = {
  title?: string
  description?: string
}

export type Address = {
  country?: string
  street1?: string
  street2?: string
  street3?: string
  city?: string
  state?: string
  zipcode?: string
  county?: string
}
