import { FC, useEffect } from 'react'
import { Col, Form, Radio, Row, Space } from 'antd'
import { IObject } from 'models'
import { useGetUserInformationDataCtx, useUserExpertiseData } from 'modules/getUserInformation/context'
import FormTitle from '../formTitle'
import GetUserInformationButtons from '../getUserInformationButtons'
import { RegistrationUserExpertiseContainer } from './style'
import { PageLoading } from 'components/uiKit/pageLoading'

const RegistrationUserExpertise: FC = () => {
  const { handlers, states } = useGetUserInformationDataCtx()

  const [userExpertiseForm] = Form.useForm()

  const { userExpertiseRequests, userExpertiseStates } = useUserExpertiseData()
  const { loading } = states

  const onSelectExpertise = (values: IObject) => {
    if (userExpertiseStates.userRole === 0) userExpertiseRequests.addRoleRequest(values.roleId)
    else handlers.stepHandler(3)
  }
  const backButtonHandler = () => {
    handlers.stepHandler(1)
  }
  useEffect(() => {
    if (userExpertiseStates) userExpertiseForm.setFieldsValue({ roleId: userExpertiseStates.userRole })
  }, [userExpertiseForm, userExpertiseStates])

  return (
    <>
      <RegistrationUserExpertiseContainer>
        <Row justify="center" align="middle" className="row">
          {userExpertiseStates.hasRole !== 'loading' ? (
            <Col xs={23} sm={20} md={18} lg={12} xl={10} className="formContainer">
              <FormTitle title={'ثبت تخصص  شما'} des={'لطفا نوع ارائه خدمات خود را انتخاب و در نهایت بر روی دکمه “مرحله بعدی” بزنید.'} />
              <Form dir="rtl" form={userExpertiseForm} layout="vertical" onFinish={onSelectExpertise}>
                <Form.Item label="" name="roleId" rules={[{ required: true, message: 'لطفا تخصص خود را انتخاب کنید' }]}>
                  <Radio.Group disabled={userExpertiseStates.hasRole === 'noRole' ? false : true} className="form-item">
                    <Space direction="vertical">
                      {userExpertiseStates.allRoles?.map(role => (
                        <Radio value={role.rol_ID} key={role.rol_ID}>
                          {role.transTagText}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <GetUserInformationButtons
                  submitTitle="مرحله بعد"
                  submitIcon={<span className="material-icons">arrow_back</span>}
                  loading={loading}
                  hasBack
                  onClickBack={backButtonHandler}
                />
              </Form>
            </Col>
          ) : (
            <PageLoading />
          )}
        </Row>
      </RegistrationUserExpertiseContainer>
    </>
  )
}

export default RegistrationUserExpertise
