import { Routes } from 'models/enums/Routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserInfo } from './userInfo'

export const useAccessLoadPage = () => {
  const { userIsLogin } = useUserInfo()
  const [accessLoad, setAccessLoad] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (userIsLogin === null) {
      setAccessLoad(false)
      return
    } else if (userIsLogin === false) {
      setAccessLoad(false)
      router.push(Routes.Login)
    } else {
      setAccessLoad(true)
    }
  }, [router, userIsLogin])
  return { accessLoad }
}
