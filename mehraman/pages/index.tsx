import type { NextPage } from 'next'
import { HomePage } from 'modules/home/Desktop'
import UseCheckScreen from 'components/custom/useCheckScreen'
import { useUserInfo } from 'hooks/userInfo'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Routes } from 'models/enums'
import { HomePageMobile } from 'modules/home/mobile'

const Home: NextPage = () => {
  const { userIsLogin, user } = useUserInfo()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    if (user.userInfo?.usr_IsA) {
      router.push(Routes.map)
      return
    } else {
      if (user.accessToken) {
        router.push(Routes.getUserInformation)
        return
      }
      setLoading(false)
    }
  }, [router, user.accessToken, user.userInfo, user.userInfo?.usr_IsA, userIsLogin])

  if (loading || !user.accessToken) return <></>

  return <UseCheckScreen DesktopComp={<HomePage />} MobileComp={<HomePageMobile />} />
}

export default Home
