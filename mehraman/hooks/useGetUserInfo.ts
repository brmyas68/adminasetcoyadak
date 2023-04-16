import { CLS_USER_INFO, CLS_USER_STATUS } from 'constants/localItem'
import { CEnvironmentHost, ICEnvironmentHost, Register, User } from 'package-mehraman-core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import store from 'store'
import { saveUser } from 'store/actions/global.action'
import { Routes } from 'models/enums'
import { RequestMessages } from 'modules/getUserInformation/models/enum'
import { useLogOut } from './logOut'
import { SavedUser } from 'store/interfaces/saved-user.interface'
import { publicRoutes } from 'routes'
export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<SavedUser | undefined>(store.getState().globals.user)
  const router = useRouter()
  const { logOut } = useLogOut()
  const _subscribe = store.subscribe(() => {
    const user: SavedUser = store.getState().globals.user
    setUserInfo(user)
  })
  useEffect(() => {
    const userInfoInLocal = localStorage.getItem(CLS_USER_INFO)
    if (userInfoInLocal && !userInfo?.userInfo) {
      const userStatus = localStorage.getItem(CLS_USER_STATUS)!

      const _ICEnvironmentHost: ICEnvironmentHost = {
        API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
        API_UC: process.env.NEXT_PUBLIC_API_UC!,
        FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
      }
      new CEnvironmentHost(_ICEnvironmentHost)

      const service = new User(userInfoInLocal)
      const register = new Register(userInfoInLocal)

      if (userStatus === 'Continue') {
        register.GetUserByToken().then(res => {
          if (res.message === RequestMessages.Unauthorized) {
            logOut()
            return
          }
          if (res.data) {
            store.dispatch(saveUser({ accessToken: userInfoInLocal, userInfo: res.data.user, userStatus: userStatus }))
          }
        })
      } else {
        service.GetByUserProfile().then(res => {
          if (res.message === RequestMessages.Unauthorized) {
            logOut()
            return
          }
          if (res.data) {
            store.dispatch(saveUser({ accessToken: userInfoInLocal, userInfo: res.data.user, userStatus: userStatus }))
          }
        })
      }
    }
    if (!userInfoInLocal && !publicRoutes.find(route => route === router.pathname)) {
      router.push(Routes.Login)
    }
    return () => {
      _subscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, router])
}
