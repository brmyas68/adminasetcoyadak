import 'react-confirm-alert/src/react-confirm-alert.css'
import '../styles/globals.style.css'
import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global.style'

import Meta from '../components/custom/meta/meta'
import { Provider } from 'react-redux'
import store from '../store'
import { useEffect } from 'react'

import { ICEnvironmentHost, CEnvironmentHost } from 'package-mehraman-core'
import { DesktopMainLayout } from 'modules/layout/Desktop'
import { MobileMainLayout } from 'modules/layout/mobile'
import UseCheckScreen from 'components/custom/useCheckScreen'
import { PerLoading } from 'components/custom/pageLoading'
import { useGetUserInfo } from 'hooks/useGetUserInfo'
import { ThemeProvider } from 'styled-components'
import globalTheme from 'styles/globalThem'

function MehramanApp({ Component, pageProps }: AppProps) {
  useGetUserInfo()
  const desktopLayout = (
    <DesktopMainLayout>
      <Component {...pageProps} />
    </DesktopMainLayout>
  )

  const mobileLayout = (
    <MobileMainLayout>
      <Component {...pageProps} />
    </MobileMainLayout>
  )

  useEffect(() => {
    const _ICEnvironmentHost: ICEnvironmentHost = {
      API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
      API_UC: process.env.NEXT_PUBLIC_API_UC!,
      FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
    }
    new CEnvironmentHost(_ICEnvironmentHost)
  }, [])
  return (
    <Provider store={store}>
      <ThemeProvider theme={globalTheme}>
        <PerLoading />
        <Meta />
        <GlobalStyle />
        <UseCheckScreen DesktopComp={desktopLayout} MobileComp={mobileLayout} />
      </ThemeProvider>
    </Provider>
  )
}

export default MehramanApp
