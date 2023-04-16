import { useLoading } from 'hooks/useLoading'
import { FC } from 'react'
import MobileLoading from './components/MobileLoading'
import { PreLoadingImageContainer, LoadingLogoImage } from './styles'

export const PerLoading: FC = () => {
  return (
    <>
      <PreLoadingImageContainer>
        <MobileLoading />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/assets/images/common/logo.svg'} alt="logo" className="perLoadingLogo" />
      </PreLoadingImageContainer>

      <LoadingLogoImage>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'/assets/images/common/logo.svg'} alt="logo" className="logoMobileImage" />
      </LoadingLogoImage>
    </>
  )
}
