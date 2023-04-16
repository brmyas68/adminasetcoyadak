import React, { FC } from 'react'
import { Form } from 'antd'
import InputUikit from 'components/uiKit/input'
import validator from 'validator'
import { fixNumbers } from 'helper/fixNumber'
import ButtonsLogin from 'modules/login/components/ButtonsLogin'
import { useLoginDataCtx } from 'modules/login/context'
import { IObject } from 'models'
import DescriptionLoginMobile from '../DescriptionLogin'

const MobileForm: FC = () => {
  const { states, requests } = useLoginDataCtx()
  const { enterNumber, loading } = states
  const { sendActiveCodeReq } = requests

  const onSendSms = (values: IObject) => sendActiveCodeReq(values.mobileNumber)

  return (
    <>
      <DescriptionLoginMobile
        title="به خانواده مهرامن بپیوندید"
        des="شما متخصصین محترم می توانید برای کسب درآمد بیشتر و افزایش مشتری به سامانه هوشمند مهرامن بپیوندید"
      />

      <Form dir="rtl" layout="vertical" onFinish={onSendSms} initialValues={{ mobileNumber: enterNumber }}>
        <Form.Item
          label="لطفا شماره همراه خود را وارد کنید"
          name="mobileNumber"
          rules={[
            { required: true, message: 'لطفا شماره موبایل را وارد نمایید', warningOnly: true },
            () => ({
              validator(_, value) {
                if (!value || validator.isMobilePhone(fixNumbers(value), 'fa-IR')) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('فرمت موبایل اشتباه است'))
              },
            }),
          ]}
          required={false}
        >
          <InputUikit
            placeholder="شماره همراه"
            icon={<span className="material-icons">smartphone</span>}
            maxLength={11}
            type="number"
            onWheel={e => {
              e.currentTarget.blur()
            }}
          />
        </Form.Item>

        <ButtonsLogin loading={loading} title="ورود / ثبت نام" icon={<span className="material-icons">arrow_right_alt</span>} />
      </Form>
    </>
  )
}

export default MobileForm
