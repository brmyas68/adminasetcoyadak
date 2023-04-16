import { FC } from 'react'
import { Col, Form, Row } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { InputCode } from 'components/uiKit/codeInput'
import { IObject } from 'models'
import { useLoginDataCtx } from 'modules/login/context'
import Timer from 'modules/login/helper/ResendTimer'
import { LoginSteps, UserStates } from 'modules/login/models/enums'
import React, { useState } from 'react'
import ButtonsLogin from '../../../../components/ButtonsLogin'
import { ActiveCodeFormStyle } from './style'
import MehramanLogo from '../mehramanLogo'
import TermsAndRules from 'components/custom/TermsAndRulesText'
import DescriptionLoginMobile from '../DescriptionLogin'
import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'

const ActiveCodeForm: FC = () => {
  const [active, setActive] = useState<boolean>(false)
  const [clearCode, setClearCode] = useState<boolean>(false)
  const { states, handlers, requests } = useLoginDataCtx()
  const [validInput, setValidNumber] = useState<boolean>(false)
  const { enterNumber, loading } = states
  const { setEnterNumberHandler } = handlers
  const { isValidCodeReq, sendActiveCodeReq } = requests
  const user = useSelector(usersSelector)

  const [activeCodeForm] = Form.useForm()

  const onLogin = (values: IObject) => {
    enterNumber && isValidCodeReq(enterNumber, values.validateCode)
  }

  const resendCode = () => {
    enterNumber &&
      sendActiveCodeReq(enterNumber).then(() => {
        setActive(false)
        setClearCode(true)
      })
  }

  return (
    <ActiveCodeFormStyle>
      <Row justify="center" align="middle" className="row">
        <Col sm={18} md={14} lg={10} xl={8} className="formContainer">
          <MehramanLogo />
          <DescriptionLoginMobile
            title="کد تایید را وارد کنید"
            des="کد تایید 5 رقمی از سامانه مهرامن به شماره همراه شما ارسال شده است، لطفا کد را در کادر مشخص شده وارد کنید"
          />

          <Form dir="rtl" layout="vertical" form={activeCodeForm} onFinish={onLogin}>
            <Form.Item
              label={`کد تایید برای شماره ${enterNumber} ارسال شد`}
              name="validateCode"
              rules={[
                { required: true, message: 'لطفا  کد تایید را وارد نمایید' },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      setValidNumber(true)
                      return Promise.resolve()
                    } else if (value && value.length === 5) {
                      setValidNumber(false)
                      return Promise.resolve()
                    }
                    setValidNumber(true)
                    return Promise.reject(new Error('کد تایید 5 رقمی است'))
                  },
                }),
              ]}
              required={false}
            >
              <InputCode clear={clearCode} fields={5} setClear={setClearCode} disabled={active} />
            </Form.Item>

            <section className="timer">
              <ButtonUiKit type="text" className="available" onClick={() => setEnterNumberHandler(LoginSteps.mobile)}>
                اصلاح شماره همراه
              </ButtonUiKit>
              {active ? (
                <ButtonUiKit type="text" className="resend" onClick={resendCode}>
                  ارسال مجدد کد
                </ButtonUiKit>
              ) : (
                <Timer className="timer_text" initialMinute={1} initialSeconds={0} active={active} setActive={setActive} />
              )}
            </section>
            <ButtonsLogin loading={loading} title={user.userStatus === UserStates.New ? 'ثبت نام' : 'ورود'} disabled={validInput} />
          </Form>
          <TermsAndRules className="mt-4" />
        </Col>
      </Row>
    </ActiveCodeFormStyle>
  )
}

export default ActiveCodeForm
