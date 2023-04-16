import React, { FC } from 'react'
import { AboutBannerContainer } from './styles'
const bannerImage = '/assets/images/aboutUs/banner.svg'

const AboutBanner: FC = () => {
  return <AboutBannerContainer src={bannerImage} alt="banner"></AboutBannerContainer>
}

export default AboutBanner
