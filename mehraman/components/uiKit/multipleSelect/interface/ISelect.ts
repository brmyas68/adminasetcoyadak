import { SelectProps } from 'antd'
export interface IOption {
  value: number | string
  label: string
}

export interface ISelectMultiple extends SelectProps {
  showSearch?: boolean
  placeholder?: string
  optionItem: IOption[]
  className?: string
  allowClear?: boolean
  value?: string
  dir?: 'rtl' | 'ltr'
  disabled?: boolean
  loading?: boolean
  selectClassName?: string
  optionClassName?: string
  Id: string[] | undefined
  checkSelected: boolean
}
