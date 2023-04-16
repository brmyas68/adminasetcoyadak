import { FC } from 'react'
import { Col, Form, Row } from 'antd'
import validator from 'validator'
import InputUikit from 'components/uiKit/input'
import { Regex } from 'helper/regex'
import { fixNumbers } from 'helper/fixNumber'
import { useLoginDataCtx } from 'modules/login/context'
import { IObject } from 'models'
import { MobileNumberFormStyle } from './style'
import ButtonsLogin from '../../../../components/ButtonsLogin'
import DescriptionLoginMobile from '../DescriptionLogin'
import MehramanLogo from '../mehramanLogo'
import TermsAndRules from 'components/custom/TermsAndRulesText'

const MobileNumberForm: FC = () => {
  const { states, requests } = useLoginDataCtx()
  const { enterNumber, loading } = states
  const { sendActiveCodeReq } = requests

  const onSendSms = (values: IObject) => {
    if (values.mobileNumber) {
      sendActiveCodeReq(values.mobileNumber)
    }
  }
  return (
    <MobileNumberFormStyle>
      <Row justify="center" align="middle" className="row">
        <Col sm={18} md={14} lg={10} xl={8} className="formContainer">
          <MehramanLogo />
          <DescriptionLoginMobile
            title={
              <p>
                .به خانواده <span className="mehraman-word">مهرامن</span> بپیوندید
              </p>
            }
            des=".شما متخصصین محترم می توانید برای کسب درآمد بیشتر و افزایش مشتری به سامانه هوشمند مهرامن بپیوندید"
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
                icon={<span className="material-icons ">smartphone</span>}
                maxLength={11}
                onKeyPress={event => {
                  if (!Regex.number.test(event.key)) {
                    event.preventDefault()
                  }
                }}
              />
            </Form.Item>

            <ButtonsLogin loading={loading} title="ورود / ثبت نام" />
          </Form>
          <TermsAndRules className="mt-4" />
        </Col>
      </Row>
    </MobileNumberFormStyle>
  )
}

export default MobileNumberForm
