import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextValue {
  states: {
    loading: boolean
    steps: number
    userRoleTag: string
    userRoleTitle: string
  }
  handlers: {
    toggleLoadingHandler: () => void
    stepHandler: (num: number) => void
    setUserRoleTag: Dispatch<SetStateAction<string>>
    setUserRoleTitle: Dispatch<SetStateAction<string>>
  }
  requests: {}
}

export const GetUserInformationDataCtx = createContext<IContextValue | undefined>(undefined)

export const GetUserInformationDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [steps, setSteps] = useState<number>(1)
  const [userRoleTag, setUserRoleTag] = useState<string>('')
  const [userRoleTitle, setUserRoleTitle] = useState<string>('')

  //map positing

  //HANDLER
  const toggleLoadingHandler = () => setLoading(prev => !prev)
  const stepHandler = (num: number) => setSteps(num)

  //REQUEST

  const ctxValue: IContextValue = {
    states: {
      loading,
      steps,
      userRoleTag,
      userRoleTitle,
    },
    handlers: {
      toggleLoadingHandler,
      stepHandler,
      setUserRoleTag,
      setUserRoleTitle,
    },
    requests: {},
  }

  return <GetUserInformationDataCtx.Provider value={ctxValue}>{children}</GetUserInformationDataCtx.Provider>
}

export const useGetUserInformationDataCtx = () => useContext(GetUserInformationDataCtx)!

export * from './userExpertiseContext'
export * from './userInfoContext'
export * from './SpecializedInformation'
