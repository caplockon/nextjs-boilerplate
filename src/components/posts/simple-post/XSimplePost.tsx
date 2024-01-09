'use client'

import { useTranslations } from 'next-intl'

type XSimplePostProps = {
  name: string
}

export default function XSimplePost(props: XSimplePostProps) {
  const t = useTranslations('IndexPage')
  return (
    <div>
      {t('name', {
        name: props.name,
      })}
    </div>
  )
}
