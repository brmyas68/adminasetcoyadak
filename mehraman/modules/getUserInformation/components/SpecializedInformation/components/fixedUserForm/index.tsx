import dynamic from 'next/dynamic'
import { FormInstance } from 'rc-field-form'
import FormItemLabel from '../FormItemLabel'
import UploadFormItem from '../UploadFormItem'
import InputUikit from 'components/uiKit/input'
import SelectUiKit from 'components/uiKit/select'
import { RoleTagName } from '../../constants/roleType'
import React, { FC, useEffect, useState } from 'react'
import { Col, Form, Row, UploadFile, UploadProps } from 'antd'
import { UploadImageTypeError } from 'modules/getUserInformation/models/types'
import { useSpecializedInformationCtx } from 'modules/getUserInformation/context'
import { useGetUserInformationDataCtx } from 'modules/getUserInformation/context'
import { useGetUserInformationServicesCtx } from 'pages/get-user-information/context'
import { useUserInfo } from 'hooks/userInfo'
import { ICBrandCar } from 'package-mehraman-core'
import { ImagePath } from 'helper/imagePath'

interface IFixedUserFormProps {
  useForm: FormInstance
}

const FixedUserForm: FC<IFixedUserFormProps> = ({ useForm }) => {
  const MapPlacePurchase = dynamic(() => import('../MapPlacePurchase'), { ssr: false })
  const { user } = useUserInfo()

  const {
    states: { userRoleTag },
  } = useGetUserInformationDataCtx()
  const { requests, states, handlers } = useSpecializedInformationCtx()
  const services = useGetUserInformationServicesCtx()

  const { setDisableHandler } = handlers
  const { selectsDisable, selectsLoading, storeInfo } = states
  const { getSkillsReq, getBrandCarReq, getFilesLicenseReq } = requests

  const [licenseImage, setLicenseImage] = useState<UploadFile[]>([])
  const [imageErrorLicense, setImageErrorLicense] = useState<UploadImageTypeError>('success')
  const [specializedBrands, setSpecializedBrands] = useState<ICBrandCar[]>()
  const isUserSeller = RoleTagName.user_Seller == userRoleTag

  useEffect(() => {
    if (!services) return

    getSkillsReq(1).then(() => setDisableHandler('subSkills', false))
    getBrandCarReq(-1).then(brand => setSpecializedBrands(brand))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services])

  //GET files
  useEffect(() => {
    if (!user) return

    getFilesLicenseReq(user.userInfo?.usr_ID as number).then(files => {
      if (!files) return

      const newFiles: UploadFile[] = files?.map(file => ({
        uid: file.annex_Id?.toString()!,
        name: file.pathFile!,
        status: 'done',
        url: ImagePath(file.pathFile),
      }))

      newFiles && setLicenseImage(newFiles)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (storeInfo) {
      useForm.setFieldsValue({
        CommercialTitle: storeInfo?.store?.stor_Name,
        address: storeInfo?.store?.stor_Adres,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeInfo])

  const onChangeLicenseUpload: UploadProps['onChange'] = info => {
    let { fileList: newFileList } = info

    setImageErrorLicense('success')
    newFileList.forEach(file => {
      if (file.size && file.size > 2000000) {
        setImageErrorLicense('sizeError')
        file.status = 'error'
        return
      } else if (file.type && !(file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))) {
        setImageErrorLicense('typeError')
        file.status = 'error'
        return
      }
    })

    if (localStorage.getItem('refID')) localStorage.removeItem('refID')
    setLicenseImage(newFileList)
  }

  const onChangeMainSkills = () => {
    setDisableHandler('subSkills', false)
    useForm.setFieldValue('subSkills', undefined)
  }

  const subSkillFilter = states?.skills
    ?.filter(skill => skill.ablit_ID !== useForm.getFieldValue('mainSkills'))
    .map(skill => ({ label: skill.ablit_TransTag, value: skill.ablit_ID }))

  return (
    <>
      <Form.Item
        name="license_Uploads"
        rules={[
          () => ({
            validator() {
              if (!(licenseImage.length > 0)) {
                return Promise.reject(new Error('بارگزاری تصویر  مجوز ها الزامی است'))
              } else {
                switch (imageErrorLicense) {
                  case 'sizeError':
                    return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                  case 'typeError':
                    return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                  case 'success':
                    return Promise.resolve()
                  default:
                    return Promise.resolve()
                }
              }
            },
          }),
        ]}
      >
        <UploadFormItem fileList={licenseImage} title={'بارگذاری تصویر مجوزهای فعالیت'} onChange={onChangeLicenseUpload} />
      </Form.Item>

      <Row gutter={[24, 12]} className="row-form">
        <Col span={24} lg={12}>
          <Form.Item
            name="CommercialTitle"
            required={false}
            rules={[{ required: true, message: 'لطفا عنوان تجاری را وارد کنید' }]}
            label={<FormItemLabel subTitle="(متن تابلو محل کسب)" title="عنوان تجاری" />}
          >
            <InputUikit placeholder="مثلا مکانیکی علوی " />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item
            name="specializedCar"
            required={false}
            rules={[{ required: true, message: 'لطفا برند وسیله نقلیه را انتخاب کنید' }]}
            label={<FormItemLabel subTitle="(تخصص شما برای خودروهای چه برندی ست؟)" title=" برند وسیله نقلیه " />}
          >
            <SelectUiKit
              mode="multiple"
              allowClear={false}
              loading={selectsLoading.brands}
              showSearch
              options={specializedBrands?.map(brand => ({ label: brand.brdCar_Name, value: brand.brdCar_ID })) || []}
              placeholder="انتخاب کنید"
              disabled={!specializedBrands?.length}
            />
          </Form.Item>
        </Col>

        {isUserSeller || (
          <>
            <Col span={24} lg={12}>
              <Form.Item name="mainSkills" rules={[{ required: true, message: 'لطفا  مهارت  اصلی خود را وارد کنید' }]} label="مهارت اصلی">
                <SelectUiKit
                  onChange={onChangeMainSkills}
                  loading={selectsLoading.skills}
                  options={states?.skills?.map(skill => ({ label: skill.ablit_TransTag, value: skill.ablit_ID })) || []}
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>

            <Col span={24} lg={12}>
              <Form.Item
                extra={'درصورت انتخاب تصویر مجوز فعالیت مهارت انتخابی را بارگذاری کنید'}
                name="subSkills"
                required={false}
                rules={[{ required: false, message: 'لطفا  مهارت فرعی خود را وارد کنید' }]}
                label={'مهارت فرعی'}
              >
                <SelectUiKit
                  mode="multiple"
                  maxTagCount="responsive"
                  disabled={selectsDisable.subSkills || !useForm.getFieldValue('mainSkills')}
                  options={subSkillFilter}
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Col span={24} lg={12}>
          <Form.Item
            name="yearActivity"
            rules={[{ required: true, message: 'لطفا   سابقه خود را وارد کنید' }]}
            label="مدت سابقه فعالیت (مدت سال)"
          >
            <InputUikit placeholder="مثلا 5" />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item name="address" label="ادرس محل کسب" rules={[{ required: true, message: 'لطفا  ادرس  خود  را انتخاب کنید' }]}>
            <InputUikit placeholder="مثلا ..." />
          </Form.Item>
        </Col>

        <Col span={24}>
          <MapPlacePurchase />
        </Col>
      </Row>
    </>
  )
}

export default FixedUserForm
