import { Form } from 'antd'
import React, { FC } from 'react'
import InputUikit from 'components/uiKit/input'
import SelectUiKit from 'components/uiKit/select'
import { alphabetsPersian } from 'constants/alphabetsPersian'
import { FormatPlaqueCarContainer } from '../style'
import { IOption } from 'components/uiKit/select/models/interfaces'

const FormatPlaqueCar: FC = () => {
  const alphabetsPersianOption: IOption[] = alphabetsPersian.map(alphabet => ({ label: alphabet, value: alphabet }))

  return (
    <FormatPlaqueCarContainer>
      <Form.Item name={'PlaqueRegion'} required={false} rules={[{ required: true, len: 2, message: '' }]} className="margin-b-0">
        <InputUikit placeholder="62" className="inpTwoWord" maxLength={2} />
      </Form.Item>
      <span className="countryWord">ایران</span>
      <Form.Item name={'Plaque2'} required={false} rules={[{ required: true, len: 3, message: '' }]} className="margin-b-0">
        <InputUikit placeholder="951" className="inpThreeWord" maxLength={3} />
      </Form.Item>
      <Form.Item name={'PlaqueWord'} required={false} rules={[{ required: true, message: '' }]} className="margin-b-0">
        <SelectUiKit options={alphabetsPersianOption} placeholder={alphabetsPersian[0]} className="selectBoxWord" allowClear={false} />
      </Form.Item>
      <Form.Item name={'Plaque1'} required={false} rules={[{ required: true, len: 2, message: '' }]} className="margin-b-0">
        <InputUikit placeholder="15" className="inpTwoWord" maxLength={2} />
      </Form.Item>
    </FormatPlaqueCarContainer>
  )
}

export default FormatPlaqueCar
