import { Form } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { InputCode } from 'components/uiKit/codeInput'
import { IObject } from 'models'
import { useLoginDataCtx } from 'modules/login/context'
import Timer from 'modules/login/helper/ResendTimer'
import { LoginSteps, UserStates } from 'modules/login/models/enums'
import React, { FC, useState } from 'react'
import ButtonsLogin from 'modules/login/components/ButtonsLogin'
import DescriptionLoginMobile from '../DescriptionLogin'
import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'

const SendCodeForm: FC = () => {
  const [isActiveCode, setIsActiveCode] = useState<boolean>(false)
  const [clearCode, setClearCode] = useState<boolean>(false)
  const [validInput, setValidNumber] = useState<boolean>(true)

  const { states, handlers, requests } = useLoginDataCtx()
  const { enterNumber, loading } = states
  const { setEnterNumberHandler } = handlers
  const { isValidCodeReq, sendActiveCodeReq } = requests

  const user = useSelector(usersSelector)

  const onLogin = (values: IObject) => {
    enterNumber && isValidCodeReq(enterNumber, values.validateCode)
  }

  const resendCode = () => {
    enterNumber &&
      sendActiveCodeReq(enterNumber).then(() => {
        setIsActiveCode(false)
        setClearCode(true)
      })
  }

  return (
    <>
      <DescriptionLoginMobile
        title="کد تایید را وارد کنید"
        des="کد تایید 5 رقمی از سامانه مهرامن به شماره همراه شما ارسال شده است، لطفا کد را در کادر مشخص شده وارد کنید"
      />

      <Form dir="rtl" layout="vertical" onFinish={onLogin}>
        <Form.Item
          label={`کد تایید برای شماره ${enterNumber} ارسال شد`}
          name="validateCode"
          rules={[
            { required: true, message: 'لطفا  کد تایید را وارد نمایید', warningOnly: true },
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
          <InputCode clear={clearCode} fields={5} setClear={setClearCode} disabled={isActiveCode} />
        </Form.Item>

        <section className="timer">
          <ButtonUiKit type="text" className="available" onClick={() => setEnterNumberHandler(LoginSteps.mobile)}>
            اصلاح شماره همراه
          </ButtonUiKit>
          {isActiveCode ? (
            <ButtonUiKit type="text" className="available" onClick={resendCode}>
              ارسال مجدد کد
            </ButtonUiKit>
          ) : (
            <Timer className="timer_text" initialMinute={1} initialSeconds={0} active={isActiveCode} setActive={setIsActiveCode} />
          )}
        </section>

        <ButtonsLogin
          icon={<span className="material-icons">arrow_right_alt</span>}
          loading={loading}
          disabled={validInput || isActiveCode}
          title={user.userStatus === UserStates.New ? 'ثبت نام' : 'ورود'}
        />
      </Form>
    </>
  )
}

export default SendCodeForm
