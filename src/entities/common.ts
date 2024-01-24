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

export type UserProfile = {
  email?: string
  name?: string
  email_verified_at?: string
  created_at?: string
  updated_at?: string
  roles?: string[]
  scopes?: string[]
}

export type UserCredentials = {
  username?: string
  password?: string
  scope?: string
}

export type AuthToken = {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}
