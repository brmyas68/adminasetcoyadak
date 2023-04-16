import { CLS_USER_INFO } from 'constants/localItem'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'

export const useUserInfo = () => {
  const [userIsLogin, setUserIsLogin] = useState<boolean | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const user = useSelector(usersSelector)
  useEffect(() => {
    const userToken = localStorage.getItem(CLS_USER_INFO)
    if (userToken) {
      setToken(userToken)
      setUserIsLogin(true)
    } else {
      setUserIsLogin(false)
    }
  }, [router])

  return {
    userIsLogin,
    token,
    user,
  }
}
