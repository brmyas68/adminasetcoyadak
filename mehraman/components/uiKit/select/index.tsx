import { Select } from 'antd'
import React, { FC } from 'react'
import { ISelectUiKit } from './models/interfaces'
import { SelectUiKitContainer } from './styles'

const Option = Select.Option

const SelectUiKit: FC<ISelectUiKit> = (
  {
    showSearch = false,
    style,
    placeholder = '',
    options,
    className,
    allowClear = true,
    onChange,
    dir = 'rtl',
    disabled = false,
    loading = false,
    value,
    mode,
    id,
  },
  props,
) => {
  return (
    <SelectUiKitContainer dir={dir} id={id}>
      <Select
        allowClear={allowClear}
        mode={mode}
        loading={loading}
        value={value}
        showSearch={showSearch}
        style={style}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        optionFilterProp="children"
        filterOption={(input, option) => option!.children!.toString().includes(input)}
        filterSort={(optionA, optionB) =>
          optionA!.children!.toString().toLowerCase().localeCompare(optionB!.children!.toString().toLowerCase())
        }
        {...props}
        maxTagCount="responsive"
      >
        {options?.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </SelectUiKitContainer>
  )
}

export default SelectUiKit
