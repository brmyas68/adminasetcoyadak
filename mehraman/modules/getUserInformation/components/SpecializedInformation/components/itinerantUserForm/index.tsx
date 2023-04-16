import { Col, Form, FormInstance, Row, UploadFile, UploadProps } from 'antd'
import InputUikit from 'components/uiKit/input'
import SelectUiKit from 'components/uiKit/select'
import { useGetUserInformationDataCtx } from 'modules/getUserInformation/context'
import { UploadImageTypeError } from 'modules/getUserInformation/models/types'
import { useGetUserInformationServicesCtx } from 'pages/get-user-information/context'
import React, { FC, useEffect, useState } from 'react'
import { RoleTagName } from '../../constants/roleType'
import { typeVehicles, TypeVehiclesIndex } from '../../constants/typeVehicle'
import { useSpecializedInformationCtx } from 'modules/getUserInformation/context'
import FormatPlaqueCar from './components/FormatPlaqueCar'
import FormatPlaqueMotorcycle from './components/FormatPlaqueMotorcycle'
import FormItemLabel from '../FormItemLabel'
import UploadFormItem from '../UploadFormItem'
import { ICBrandCar, ICBrandModelCar } from 'package-mehraman-core'
import dynamic from 'next/dynamic'
import { useUserInfo } from 'hooks/userInfo'
import { ImagePath } from 'helper/imagePath'

const ItinerantUserForm: FC<{ useForm: FormInstance }> = ({ useForm }) => {
  const { user } = useUserInfo()

  const services = useGetUserInformationServicesCtx()
  const {
    states: { userRoleTag },
  } = useGetUserInformationDataCtx()
  const { states, requests, handlers } = useSpecializedInformationCtx()
  const MapPlacePurchase = dynamic(() => import('../MapPlacePurchase'), { ssr: false })

  const { setDisableHandler } = handlers
  const { selectsDisable, selectsLoading, infoSpecialty } = states
  const { getSkillsReq, getBrandCarReq, getBrandModelNames, getFilesLicenseReq, getFilesVehicleReq } = requests

  const [licenseImage, setLicenseImage] = useState<UploadFile[]>([])
  const [carsImages, setCarsImages] = useState<UploadFile[]>([])
  const [imageErrorLicense, setImageErrorLicense] = useState<UploadImageTypeError>('success')
  const [imageErrorCars, setImageErrorCars] = useState<UploadImageTypeError>('success')
  const [isPlaqueCar, setIsPlaqueCar] = useState<boolean>(true)
  const [userCarBrand, setUserCarBrand] = useState<ICBrandModelCar[]>()
  const [abilityCarBrand, setAbilityCarBrand] = useState<ICBrandCar[]>()

  const isJavDriver = RoleTagName.JackDriver == userRoleTag

  useEffect(() => {
    if (!services) return
    const vehclType = infoSpecialty?.infSpec_VehclTyp !== undefined ? infoSpecialty?.infSpec_VehclTyp : TypeVehiclesIndex.Sedan

    setDisableHandler('model', false)

    getBrandModelNames(vehclType).then(brandsCarUser => setUserCarBrand(brandsCarUser))
    getBrandCarReq(-1).then(abilityBrand => setAbilityCarBrand(abilityBrand))

    useForm.setFieldValue('typeVehicles', vehclType)
    useForm.setFieldValue('PlaqueWord', 'الف')
    isJavDriver || getSkillsReq(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, infoSpecialty?.infSpec_VehclTyp])

  //set plake
  useEffect(() => {
    if (!infoSpecialty?.infSpec_PelakCar) return
    const splitPlak = infoSpecialty?.infSpec_PelakCar?.split('-')

    if (infoSpecialty?.infSpec_VehclTyp === TypeVehiclesIndex.Motorcycle) {
      useForm.setFieldsValue({
        inpThreeWord: splitPlak[0],
        inpFiveWord: splitPlak[1],
      })
    } else {
      useForm.setFieldsValue({
        Plaque1: splitPlak[0],
        PlaqueWord: splitPlak[1],
        Plaque2: splitPlak[2],
        PlaqueRegion: splitPlak[3],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSpecialty])

  //GET IMAGES REQ
  useEffect(() => {
    if (!services || !user) return

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

    getFilesVehicleReq(user.userInfo?.usr_ID as number).then(files => {
      if (!files) return

      const newFiles: UploadFile[] = files?.map(file => ({
        uid: file.annex_Id?.toString()!,
        name: file.pathFile!,
        status: 'done',
        url: ImagePath(file.pathFile),
      }))

      newFiles && setCarsImages(newFiles)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, services])

  //ON CHANGES HANDLER
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

  const onChangeCarsUpload: UploadProps['onChange'] = info => {
    let { fileList: newFileList } = info

    setImageErrorCars('success')
    newFileList.forEach(file => {
      if (file.size && file.size > 2000000) {
        setImageErrorCars('sizeError')
        file.status = 'error'
        return
      } else if (file.type && !(file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))) {
        setImageErrorCars('typeError')
        file.status = 'error'
        return
      }
    })
    if (localStorage.getItem('refID')) localStorage.removeItem('refID')

    setCarsImages(newFileList)
  }

  const onChangeMainSkills = () => {
    setDisableHandler('subSkills', false)
    useForm.setFieldValue('subSkills', undefined)
  }

  const onChangeTypeVehicles = async (value: number) => {
    useForm.setFieldValue('carModel', undefined)
    setUserCarBrand([])
    setDisableHandler('model', true)
    setIsPlaqueCar(value !== TypeVehiclesIndex.Motorcycle)

    const brandsCar = await getBrandModelNames(value)
    if (brandsCar) {
      setUserCarBrand(brandsCar)
      setDisableHandler('model', false)
    }
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

      <Form.Item
        name="cars_Uploads"
        rules={[
          () => ({
            validator() {
              if (!(carsImages.length > 0)) {
                return Promise.reject(new Error('بارگذاری تصویر وسیله نقلیه الزامی است '))
              } else {
                switch (imageErrorCars) {
                  case 'sizeError':
                    return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد'))
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
        <UploadFormItem fileList={carsImages} title={'بارگذاری تصویر وسیله نقلیه'} onChange={onChangeCarsUpload} />
      </Form.Item>

      <Row gutter={[24, 12]} className="row-form">
        <Col span={24} lg={12}>
          <Form.Item
            name="typeVehicles"
            rules={[{ required: true, message: 'لطفا نوع وسیله نقلیه را انتخاب  کنید' }]}
            label="نوع وسیله نقلیه"
          >
            <SelectUiKit id={'typeVehicles'} onChange={onChangeTypeVehicles} options={typeVehicles} placeholder="انتخاب کنید" />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item name="carModel" rules={[{ required: true, message: 'لطفا نام وسیله نقلیه را وارد کنید' }]} label="مدل وسیله نقلیه">
            <SelectUiKit
              loading={selectsLoading.brands}
              showSearch
              options={userCarBrand?.map(brand => ({ label: brand.brdModCar_Name, value: brand.modCar_ID })) || []}
              placeholder="انتخاب کنید"
              disabled={selectsDisable.model}
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item name="carColor" rules={[{ required: true, message: 'لطفا رنگ وسیله نقلیه را وارد کنید' }]} label="رنگ وسیله نقلیه">
            <InputUikit placeholder="مثلا آبی" />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item required={true} label="پلاک وسیله نقیله">
            {isPlaqueCar ? <FormatPlaqueCar /> : <FormatPlaqueMotorcycle />}
          </Form.Item>
        </Col>

        {isJavDriver || (
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

            <Col span={24} lg={12}>
              <Form.Item
                name="specializedCar"
                required={false}
                rules={[{ required: true, message: 'لطفا برند وسیله نقلیه را وارد کنید' }]}
                label={<FormItemLabel title="برندهای خودرو " subTitle="(تخصص شما برای خودروهای چه برندی ست؟)" />}
              >
                <SelectUiKit
                  mode="multiple"
                  allowClear={false}
                  loading={selectsLoading.brands}
                  showSearch
                  options={abilityCarBrand?.map(brand => ({ label: brand.brdCar_Name, value: brand.brdCar_ID })) || []}
                  placeholder="انتخاب کنید"
                />
              </Form.Item>
            </Col>
          </>
        )}

        <Col span={24} lg={12}>
          <Form.Item
            name="yearActivity"
            rules={[{ required: true, message: 'لطفا سابقه خود را وارد کنید' }]}
            label=" سابقه فعالیت (مدت سال)"
          >
            <InputUikit placeholder="مثلا 5" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <MapPlacePurchase title="محدوده فعالیت" />
        </Col>
      </Row>
    </>
  )
}

export default ItinerantUserForm
