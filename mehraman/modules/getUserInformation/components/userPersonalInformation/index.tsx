import { FC, useCallback, useEffect } from 'react'
import { Col, Form, Row } from 'antd'
import FormTitle from '../formTitle'
import InputUikit from 'components/uiKit/input'
import SelectUiKit from 'components/uiKit/select'
import { PageLoading } from 'components/uiKit/pageLoading'
import { useGetUserInformationDataCtx, useUserInformationData } from 'modules/getUserInformation/context'
import { Regex } from 'helper/regex'
import GetUserInformationButtons from '../getUserInformationButtons'
import { UserPersonalInformationFormContainer } from './styles'
import { genderOptions } from 'modules/getUserInformation/constant/gender'
import { IUserInfo } from 'modules/getUserInformation/models'
import _ from 'lodash'

const UserPersonalInformationForm: FC = () => {
  const [userInfoForm] = Form.useForm()
  const { userInfoRequests, userInfoStates, userInfoHandlers } = useUserInformationData()

  const { handlers } = useGetUserInformationDataCtx()

  const handleUserInfo = (values: IUserInfo) => {
    values.usr_Mobile = userInfoStates.userInfo?.usr_Mobile || ''
    if (_.isEqual(values, userInfoStates.userInfo)) {
      delete values['usr_Mobile']
      handlers.stepHandler(2)
    } else {
      delete values['usr_Mobile']
      userInfoRequests.updateUserRequest(values)
    }
  }

  const handleFormInit = useCallback(() => {
    if (userInfoStates.userInfo && userInfoStates.userInfo.usr_Prov_ID > 0) userInfoHandlers.setSelectCityDisable(false)
    userInfoForm.setFieldsValue({
      usr_Cty_ID: userInfoStates.userInfo?.usr_Cty_ID! > 0 ? userInfoStates.userInfo?.usr_Cty_ID : null,
      usr_FName: userInfoStates.userInfo?.usr_FName,
      usr_IdentNum: userInfoStates.userInfo?.usr_IdentNum,
      usr_LName: userInfoStates.userInfo?.usr_LName,
      usr_PostCode: userInfoStates.userInfo?.usr_PostCode || '',
      usr_Prov_ID: userInfoStates.userInfo?.usr_Prov_ID! > 0 ? userInfoStates.userInfo?.usr_Prov_ID : null,
      usr_ShabaNum: userInfoStates.userInfo?.usr_ShabaNum,
      usr_Tell: userInfoStates.userInfo?.usr_Tell || '',
      usr_Mail: userInfoStates.userInfo?.usr_Mail || '',
      usr_Gender: userInfoStates.userInfo?.usr_Gender,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoStates.userInfo])

  const handleChangeProvince = (id: number) => {
    userInfoForm.setFieldsValue({ usr_Cty_ID: undefined })
    userInfoRequests.getCityByProvinceId(id)
  }

  useEffect(() => {
    if (userInfoStates.userInfo) handleFormInit()
  }, [handleFormInit, userInfoStates.userInfo])

  return (
    <UserPersonalInformationFormContainer requiredDir="ltr">
      <Row justify="center" align="middle" className="row">
        {!userInfoStates.fetchDataLoading ? (
          <Col xs={23} sm={20} md={18} lg={14} xl={12} className="formContainer">
            <FormTitle
              title={'ثبت اطلاعات شخصی'}
              des={
                <p>
                  لطفا اطلاعات خواسته شده را تکمیل و در نهایت بر روی دکمه <strong>“مرحله بعد”</strong> بزنید.
                </p>
              }
            />

            <Form name="userInfo" form={userInfoForm} autoComplete="off" onFinish={handleUserInfo} className="form" dir="rtl">
              <Row gutter={24} className="userInfoFormRow">
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="نام"
                    name="usr_FName"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا  نام را وارد نمایید' }]}
                  >
                    <InputUikit type="text" size="large" placeholder="مثلا علی" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="نام خانوادگی"
                    name="usr_LName"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا نام خانوادگی را وارد نمایید' }]}
                  >
                    <InputUikit type="text" size="large" placeholder="مثلا علوی" />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="کدملی"
                    name="usr_IdentNum"
                    labelCol={{ span: 24 }}
                    rules={[
                      { required: true, message: 'لطفا  کد ملی را وارد نمایید' },
                      { min: 10, message: 'کد ملی نباید کمتر از 10 رقم باشد' },
                      { max: 10, message: 'کد ملی نباید بیشتر از 10 رقم باشد' },
                    ]}
                  >
                    <InputUikit
                      type="text"
                      size="large"
                      maxLength={10}
                      minLength={10}
                      placeholder="مثلا 2093067451"
                      onKeyPress={event => {
                        if (!Regex.number.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="جنسیت"
                    name="usr_Gender"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا جنسیت را انتخاب کنید.' }]}
                  >
                    <SelectUiKit placeholder="جنسیت" options={genderOptions} className="user-info-gender-select" />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="تلفن ثابت"
                    name="usr_Tell"
                    labelCol={{ span: 24 }}
                    rules={[
                      { min: 11, message: ' تلفن ثابت نباید کمتر از 11 رقم باشد' },
                      { max: 11, message: ' تلفن ثابت نباید بیشتر از 11 رقم باشد' },
                    ]}
                  >
                    <InputUikit
                      type="text"
                      size="large"
                      maxLength={11}
                      minLength={11}
                      placeholder="مثلا 01133344567"
                      onKeyPress={event => {
                        if (!Regex.number.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item label="تلفن همراه" labelCol={{ span: 24 }} className="user-info-mobile-item">
                    <InputUikit
                      type="text"
                      size="large"
                      readOnly
                      disabled
                      className="user-info-mobile-input"
                      defaultValue={userInfoStates.userInfo?.usr_Mobile}
                    />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="استان"
                    name="usr_Prov_ID"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا استان  را انتخاب کنید' }]}
                  >
                    <SelectUiKit
                      showSearch
                      className="usr_Prov_ID"
                      placeholder="استان"
                      options={userInfoStates.provinces}
                      onChange={handleChangeProvince}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="شهر"
                    name="usr_Cty_ID"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا شهر را انتخاب کنید' }]}
                  >
                    <SelectUiKit
                      showSearch
                      disabled={userInfoStates.selectCityDisable}
                      //loading={loading.city}
                      placeholder="شهر"
                      options={userInfoStates.cities}
                    />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="کدپستی"
                    name="usr_PostCode"
                    labelCol={{ span: 24 }}
                    rules={[
                      { min: 10, message: 'کد ملی نباید کمتر از 10 رقم باشد' },
                      { max: 10, message: 'کد ملی نباید بیشتر از 10 رقم باشد' },
                    ]}
                  >
                    <InputUikit type="text" size="large" maxLength={10} minLength={10} placeholder="مثلا 48114758746" />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="شماره شبا"
                    name="usr_ShabaNum"
                    labelCol={{ span: 24 }}
                    rules={[
                      { required: true, message: 'لطفا شماره شبا را وارد نمایید' },
                      { min: 26, message: 'شماره شبا نباید کمتر از 26 کاراکتر باشد' },
                      { max: 26, message: 'شماره شبا نباید بیشتر از 26 کاراکتر باشد' },
                      () => ({
                        validator(_, value) {
                          if (!value || Regex.sheba.test(value)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('فرمت شماره شبا اشتباه است'))
                        },
                      }),
                    ]}
                  >
                    <InputUikit type="text" size="large" minLength={26} maxLength={26} placeholder="IR040120000000005098100222" />
                  </Form.Item>
                </Col>
              </Row>
              <GetUserInformationButtons
                hasBack={false}
                submitTitle="مرحله بعد"
                submitIcon={<span className="material-icons">arrow_back</span>}
              />
            </Form>
          </Col>
        ) : (
          <PageLoading />
        )}
      </Row>
    </UserPersonalInformationFormContainer>
  )
}

export default UserPersonalInformationForm
