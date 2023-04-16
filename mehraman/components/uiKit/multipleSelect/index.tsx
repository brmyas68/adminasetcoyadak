import { FC } from 'react'
import { Checkbox, Select } from 'antd'
import { ISelectMultiple } from './interface/ISelect'
import { SelectStyle } from './style/select'
const { Option } = Select

export const MultipleSelectUiKit: FC<ISelectMultiple> = ({
  Id,
  optionItem,
  placeholder,
  selectClassName,
  optionClassName,
  onChange,
  size,
  checkSelected,
  disabled,
}) => {
  return (
    <SelectStyle dir="rtl">
      <Select mode="multiple" placeholder={placeholder} onChange={onChange} className={selectClassName} size={size} disabled={disabled}>
        {optionItem.map((item, index) => (
          <Option value={item.value.toString()} key={index} className={optionClassName}>
            <Checkbox checked={!checkSelected ? !!Id?.find(id => id === item.value.toString()) : undefined}>{item.label}</Checkbox>
          </Option>
        ))}
      </Select>
    </SelectStyle>
  )
}
