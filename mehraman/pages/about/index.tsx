import React from 'react'
import { NextPage } from 'next'
import { AboutUsDesktop, AboutUsMobile } from 'modules/aboutUs'
import UseCheckScreen from 'components/custom/useCheckScreen'

const AboutUsPage: NextPage = () => <UseCheckScreen DesktopComp={<AboutUsDesktop />} MobileComp={<AboutUsMobile />} />

export default AboutUsPage
