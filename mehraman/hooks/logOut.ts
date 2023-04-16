import { CLS_USER_INFO, CLS_USER_STATUS } from 'constants/localItem'
import { Routes } from 'models/enums/Routes'
import { useRouter } from 'next/router'
import { CEnvironmentHost, ICEnvironmentHost, Authentication } from 'package-mehraman-core'

export const useLogOut = () => {
  const router = useRouter()
  const logOut = () => {
    const token = localStorage.getItem(CLS_USER_INFO)
    if (token) {
      const _ICEnvironmentHost: ICEnvironmentHost = {
        API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
        API_UC: process.env.NEXT_PUBLIC_API_UC!,
        FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
      }
      new CEnvironmentHost(_ICEnvironmentHost)
      const service = new Authentication(token)
      service.LogOut().finally(() => {
        localStorage.removeItem(CLS_USER_INFO)
        localStorage.removeItem(CLS_USER_STATUS)
        router.push(Routes.Login)
      })
    }
  }
  return { logOut }
}

export const useUnauthorizedLogOut = () => {
  const router = useRouter()
  const unauthorizedLogOut = (redirectTo: string) => {
    const token = localStorage.getItem(CLS_USER_INFO)
    if (token) {
      const _ICEnvironmentHost: ICEnvironmentHost = {
        API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
        API_UC: process.env.NEXT_PUBLIC_API_UC!,
        FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
      }
      new CEnvironmentHost(_ICEnvironmentHost)
      const service = new Authentication(token)
      service.LogOut().finally(() => {
        localStorage.removeItem(CLS_USER_INFO)
        router.push(redirectTo)
      })
    }
  }
  return { unauthorizedLogOut }
}
