import { createContext, FC, useContext, useEffect, useState } from 'react'
import { Register, ICEnvironmentHost, CEnvironmentHost, Common, InfoSpecialty, Store } from 'package-mehraman-core'
import { useUserInfo } from 'hooks/userInfo'

interface contextValue {
  userServices: Register
  commonServices: Common
  infoSpecialtyServices: InfoSpecialty
  storeServices: Store
}

export const GetUserInformationServicesContext = createContext<contextValue | undefined>(undefined)

interface GetUserInformationServicesProps {
  children: React.ReactNode
}

const GetUserInformationServicesProvider: FC<GetUserInformationServicesProps> = ({ children }) => {
  const [services, setServices] = useState<contextValue | undefined>()
  const { token } = useUserInfo()

  useEffect(() => {
    const _ICEnvironmentHost: ICEnvironmentHost = {
      API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
      API_UC: process.env.NEXT_PUBLIC_API_UC!,
      FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
    }
    new CEnvironmentHost(_ICEnvironmentHost)
  }, [])

  useEffect(() => {
    if (token) {
      setServices({
        userServices: new Register(token),
        commonServices: new Common(token),
        infoSpecialtyServices: new InfoSpecialty(token),
        storeServices: new Store(token),
      })
    }
  }, [token])

  return <GetUserInformationServicesContext.Provider value={services}>{children}</GetUserInformationServicesContext.Provider>
}

export const useGetUserInformationServicesCtx = () => useContext(GetUserInformationServicesContext)!

export default GetUserInformationServicesProvider
