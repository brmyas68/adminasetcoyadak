import { createContext, FC, useContext, useEffect, useState } from 'react'
import { Authentication, ICEnvironmentHost, CEnvironmentHost } from 'package-mehraman-core'

interface contextValue {
  authServices: Authentication
}

export const LoginServicesContext = createContext<contextValue | undefined>(undefined)

interface LoginServicesProps {
  children: React.ReactNode
}

const LoginServicesProvider: FC<LoginServicesProps> = ({ children }) => {
  const [services, setServices] = useState<contextValue | undefined>()

  useEffect(() => {
    const _ICEnvironmentHost: ICEnvironmentHost = {
      API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
      API_UC: process.env.NEXT_PUBLIC_API_UC!,
      FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
    }
    new CEnvironmentHost(_ICEnvironmentHost)
    setServices({
      authServices: new Authentication(''),
    })
  }, [])

  return <LoginServicesContext.Provider value={services}>{children}</LoginServicesContext.Provider>
}

export const useLoginServicesCtx = () => useContext(LoginServicesContext)!

export default LoginServicesProvider
