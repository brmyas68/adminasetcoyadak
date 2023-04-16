import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { IMeta } from './Imeta'

const Meta: FC<IMeta> = ({ keywords, description, ogTitle, ogType, ogUrl, ogImage, title, noindex }) => {
  return (
    <NextSeo
      noindex={noindex}
      additionalMetaTags={[
        {
          property: 'viewport',
          content: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover',
        },
        {
          property: 'keywords',
          content: keywords || '',
        },
      ]}
      openGraph={{
        site_name: 'مهرامن ',
        type: ogType,
        url: ogUrl,
        title: ogTitle,
        description: description,
        locale: 'fa_IR',
        images: [
          {
            url: ogImage || '',
            width: 1003,
            height: 627,
            alt: 'preview site',
          },
        ],
      }}
      title={title}
      description={description}
      canonical={ogUrl}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/assets/svg/common/metaIcon.svg',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icon.png',
          sizes: '192x192',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
    />
  )
}
Meta.defaultProps = {
  title: '  مهرامن',
  description: '',
  keywords: '',
  ogImage: 'assets/png/home-page.jpg',
  ogUrl: 'https://www..com',
  ogTitle: ' مهرامن',
  ogType: 'company',
  noindex: false,
}

export default Meta
