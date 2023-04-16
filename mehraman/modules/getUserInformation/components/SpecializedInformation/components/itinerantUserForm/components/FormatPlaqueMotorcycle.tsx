import { Form } from 'antd'
import InputUikit from 'components/uiKit/input'
import React from 'react'
import { FormatPlaqueMotorcycleBox } from '../style'

const FormatPlaqueMotorcycle = () => {
  return (
    <FormatPlaqueMotorcycleBox>
      <Form.Item
        name={'PlaqueMotorcycle2'}
        required={false}
        rules={[{ required: true, len: 5, message: '' }]}
        className="inpFiveWord  margin-b-0"
      >
        <InputUikit placeholder="15234" maxLength={5} />
      </Form.Item>
      <Form.Item
        name={'PlaqueMotorcycle1'}
        required={false}
        rules={[{ required: true, len: 3, message: '' }]}
        className="inpThreeWord  margin-b-0"
      >
        <InputUikit placeholder="622" maxLength={3} />
      </Form.Item>
    </FormatPlaqueMotorcycleBox>
  )
}

export default FormatPlaqueMotorcycle
