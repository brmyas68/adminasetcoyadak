import { useLoading } from 'hooks/useLoading'
import { FC } from 'react'
import { PreLoadingImageContainer } from '../styles'

export const PreLoadingImage: FC = () => {
  const { loading, loadingTitle } = useLoading()
  return (
    <PreLoadingImageContainer loading={loading ? 'true' : 'false'}>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={'/assets/gif/loading.gif'} alt="loading..." className="loadingImage" />
      }
      <h3 dir="rtl">{loadingTitle}</h3>
    </PreLoadingImageContainer>
  )
}
