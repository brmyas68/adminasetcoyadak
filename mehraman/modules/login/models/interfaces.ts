import { ReactNode } from 'react'

export interface ITimerResendProps {
  initialMinute: number
  initialSeconds: number
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  className: string
}

export interface ILoginBtnProps {
  loading?: boolean
  title: string
  disabled?: boolean
  icon?: ReactNode
}
