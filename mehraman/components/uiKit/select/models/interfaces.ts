import { SelectProps } from 'antd'
import { CSSProperties } from 'react'

export interface IOption {
  value: number | string
  label: string
}

export interface ISelectUiKit extends SelectProps {
  showSearch?: boolean
  placeholder?: string
  style?: CSSProperties
  className?: string
  allowClear?: boolean
  value?: string
  dir?: 'rtl' | 'ltr'
  disabled?: boolean
  loading?: boolean
}
