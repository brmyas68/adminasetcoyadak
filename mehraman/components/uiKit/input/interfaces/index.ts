import { InputProps } from 'antd'
import { KeyboardEventHandler, ReactNode } from 'react'

export interface IInputUiKitProps extends InputProps {
  placeholder?: string
  icon?: ReactNode
  maxLength?: number
  value?: string
  onChange?: () => void
  onKeyPress?: KeyboardEventHandler | undefined
}
