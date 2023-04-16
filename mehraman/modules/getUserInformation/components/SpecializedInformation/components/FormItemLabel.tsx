import React, { FC } from 'react'
import { FormItemLabelContainer } from '../style'

const FormItemLabel: FC<{ title: string; subTitle: string; required?: boolean }> = ({ title, subTitle, required = true }) => {
  return (
    <FormItemLabelContainer>
      {title} {required && <span className="titleLabel"> * </span>}
      {'   '}
      <span className="subtitleLabel">{subTitle}</span>
    </FormItemLabelContainer>
  )
}

export default FormItemLabel
