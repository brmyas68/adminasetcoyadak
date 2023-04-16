import React, { FC } from 'react'
import { IInputUiKitProps } from './interfaces'
import { InputUiKitStyles } from './style'

const InputUikit: FC<IInputUiKitProps> = (props, { placeholder, maxLength, value, onChange, onKeyPress }) => {
  return (
    <InputUiKitStyles
      placeholder={placeholder}
      prefix={props.icon}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      {...props}
    />
  )
}

export default InputUikit
