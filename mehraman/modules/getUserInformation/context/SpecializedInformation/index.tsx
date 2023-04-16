import { message, UploadFile } from 'antd'
import { useLanguageId } from 'hooks/languageId'
import { createContext, FC, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import {
  ICBodyInfoSpecialty,
  ICBrandCar,
  ICBrandModelCar,
  ICFiles,
  ICInfoSpecialty,
  ICModelCar,
  ICResultGetStore,
} from 'package-mehraman-core'
import { useGetUserInformationServicesCtx } from 'pages/get-user-information/context'
import { IAbility } from 'package-mehraman-core/Core/CLS/IModel/InterfaceModels/IAbility'
import { DisableKeys, IContextValue, IDisableProps, IImgUploaded, IImgUploadedKey, ILoadingProps, LoadingKeys } from './interfaces'
import { RcFile } from 'antd/lib/upload'
import { Alert } from 'components/uiKit/Alert'
import { useLogOut } from 'hooks/logOut'
import { IObject } from 'models'
import { RoleTagName } from 'modules/getUserInformation/components/SpecializedInformation/constants/roleType'
import { TypeVehiclesIndex } from 'modules/getUserInformation/components/SpecializedInformation/constants/typeVehicle'
import { useGetUserInformationDataCtx } from '..'
import { Marker } from 'leaflet'
import { useUserInfo } from 'hooks/userInfo'

export const SpecializedInformationCtx = createContext<IContextValue | undefined>(undefined)
const keyLoading = 'updatable'

export const SpecializedInformationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const lang_ID = useLanguageId()
  const { logOut } = useLogOut()
  const { user } = useUserInfo()
  const services = useGetUserInformationServicesCtx()
  const { states } = useGetUserInformationDataCtx()
  const { userRoleTag } = states
  const mapRef = useRef<Marker<any>>()

  //data values states
  const [skills, setSkills] = useState<IAbility[]>()
  //for edit
  const [infoSpecialty, setInfoSpecialty] = useState<ICInfoSpecialty>()
  const [storeInfo, setStoreInfoEdit] = useState<ICResultGetStore>()

  //helper states
  const [selectsLoading, setSelectsLoading] = useState<ILoadingProps>({
    skills: false,
    brands: false,
    brandModels: false,
    models: false,
    finaleInsert: false,
    getInfo: false,
  })
  const [selectsDisable, setSelectsDisable] = useState<IDisableProps>({
    subSkills: true,
    model: true,
  })
  const [forEdit, setForEdit] = useState<boolean>(true)

  //HANDLER
  const setSelectsLoadingHandler = (name: LoadingKeys, loading: boolean) => setSelectsLoading(prev => ({ ...prev, [name]: loading }))
  const setDisableHandler = (name: DisableKeys, loading: boolean) => setSelectsDisable(prev => ({ ...prev, [name]: loading }))
  const setStoreInfoHandler = (store: ICResultGetStore) => setStoreInfoEdit(store)

  //REQUEST
  const getSkillsReq = async (Parent_ID: number) => {
    if (!services) return
    setSelectsLoadingHandler('skills', true)

    try {
      const { data, status } = await services.userServices.GetAllAbility({ Lang_ID: lang_ID || 1, Parent_ID })

      if (status === 200) setSkills(data?.abilities)
      else message.error('خطا در دریافت مهارت  ها')
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      setSelectsLoadingHandler('skills', false)
    }
  }

  const getBrandCarReq = async (Brand_Type: number) => {
    if (!services) return
    setSelectsLoadingHandler('brands', true)

    try {
      const { data, status } = await services.commonServices.GetAllBrand({ Brand_Type })

      if (status === 200) return data?.brands
      else message.error('خطا در دریافت برند ها')
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      setSelectsLoadingHandler('brands', false)
    }
  }

  const getBrandModelNames = async (Brand_Type: number) => {
    if (!services) return
    setSelectsLoadingHandler('models', true)

    try {
      const { data, status } = await services.commonServices.GetAllBrandModelName({ Brand_Type })

      if (status === 200) return data?.brandModels
      else message.error('خطا در دریافت مدل های خودرو ')
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      setSelectsLoadingHandler('models', false)
    }
  }

  const insertInfoSpecialtyReq = async (bodyData: ICBodyInfoSpecialty) => {
    message.loading({ content: 'درحال بارگذاری اطلاعات', key: keyLoading })

    setSelectsLoadingHandler('finaleInsert', true)

    try {
      const { data } = await services.userServices.InsertInfoSpecialty(bodyData)

      if (data) {
        localStorage.setItem('refID', JSON.stringify(data.refID))
        return data.refID
      }
      message.error({ content: 'خطا در ثبت اطلاعات تخصصی', key: keyLoading })
      setSelectsLoadingHandler('finaleInsert', false)
    } catch {
      message.error({ content: 'خطا در ثبت اطلاعات تخصصی', key: keyLoading })
      setSelectsLoadingHandler('finaleInsert', false)
    }
  }

  const updateInfoSpecialtyReq = async (bodyData: ICBodyInfoSpecialty) => {
    message.loading({ content: 'درحال بارگذاری اطلاعات', key: keyLoading })

    setSelectsLoadingHandler('finaleInsert', true)

    try {
      const { status } = await services.infoSpecialtyServices.UpdateInfoSpecialty(bodyData)

      if (status === 200) {
        message.success({ content: ' بارگذاری اطلاعات تخصصی با موفقیت انجام شد', key: keyLoading })
        return
      }
      message.error({ content: 'خطا در ثبت اطلاعات تخصصی', key: keyLoading })
    } catch {
      message.error({ content: 'خطا در ثبت اطلاعات تخصصی', key: keyLoading })
    } finally {
      setSelectsLoadingHandler('finaleInsert', false)
    }
  }

  const uploadImagesReq = async (refId: number, licenseImages?: UploadFile[], UploadImages?: UploadFile[]) => {
    if (!services) return
    const formData = new FormData()

    licenseImages?.forEach(img => {
      formData.append('LicenseFiles', img.originFileObj as RcFile)
    })

    UploadImages?.forEach(img => {
      formData.append('CarImageFiles', img.originFileObj as RcFile)
    })

    formData.append('RefId', refId.toString())

    try {
      const { status } = await services.userServices.UploadFile(formData)

      if (status === 200) {
        message.success({ content: ' بارگذاری اطلاعات تخصصی با موفقیت انجام شد', key: keyLoading })
        localStorage.removeItem('refID')
        Alert({
          message: 'اطلاعات شما در سامانه مهرامن ثبت شد، کارشناسان ما اطلاعات شما را بررسی و نتیجه را برایتان پیامک خواهیم کرد',
          type: 'default',
          onClick: () => logOut(),
        })
      } else {
        message.error({ content: 'خطا در بارگذاری تصاویر', key: keyLoading })
      }
    } catch {
      message.error({ content: 'خطا در بارگذاری تصاویر', key: keyLoading })
    } finally {
      setSelectsLoadingHandler('finaleInsert', false)
    }
  }

  //InfoSpecialty services
  const getInfoSpecialtyReq = async (user_ID: number) => {
    if (!services) return

    try {
      const { data, status } = await services.infoSpecialtyServices.GetInfoSpecialty({ User_ID: user_ID })

      if (status === 200) setInfoSpecialty(data?.infoSpecialty)
      else setForEdit(false)
    } catch {
      message.error('خطا در ارتباط با سرور')
    }
  }

  const getFilesVehicleReq = async (user_ID: number) => {
    if (!services) return

    try {
      const { data, status } = await services.infoSpecialtyServices.GetAllFilesVehicle({ User_ID: user_ID })

      if (status === 200) return data?.files
      else setForEdit(false)
    } catch {
      message.error('خطا در ارتباط با سرور')
    }
  }

  const getFilesLicenseReq = async (user_ID: number) => {
    if (!services) return

    try {
      const { data, status } = await services.infoSpecialtyServices.GetAllFilesLicense({ User_ID: user_ID })

      if (status === 200) return data?.files
      else setForEdit(false)
    } catch {
      message.error('خطا در ارتباط با سرور')
    }
  }

  //store services

  const getStoreReq = async (user_ID: number) => {
    if (!services) return

    setSelectsLoadingHandler('getInfo', true)
    setForEdit(true)

    try {
      const { data, status } = await services.storeServices.GetStore({ User_ID: user_ID })

      if (status === 200) return data
      else setForEdit(false)
    } catch {
      message.error('خطا در ارتباط با سرور')
    } finally {
      setSelectsLoadingHandler('getInfo', false)
    }
  }

  const onRegister = (value: IObject) => {
    let bodyData: ICBodyInfoSpecialty

    switch (userRoleTag) {
      case RoleTagName.itinerantMechanics:
        const latLangItinerantMechanics = mapRef.current?.getLatLng()
        if (!latLangItinerantMechanics) return message.error('لطفا محدوده و کار خود را در نقشه تعیین کنید ')
        bodyData = {
          Stor_Name: '',
          Infspc_UsrID: user.userInfo?.usr_ID,
          Infspc_VehclType: value?.typeVehicles,
          Car_Modl: value?.carModel,
          Car_Color: value?.carColor,
          Car_Pelak:
            value?.typeVehicles == TypeVehiclesIndex.Motorcycle
              ? [value?.PlaqueMotorcycle1, value?.PlaqueMotorcycle2].join('-')
              : [value?.Plaque1, value?.PlaqueWord, value?.Plaque2, value?.PlaqueRegion].join('-'),
          Infspc_WorkExper: +value?.yearActivity,
          Abilty_Major: value?.mainSkills,
          Abilty_Other: value?.subSkills?.join(',') || '',
          Abilty_BrandCar: value?.specializedCar.join(','),
          Stor_Lat: latLangItinerantMechanics.lat.toString(),
          Stor_Long: latLangItinerantMechanics.lng.toString(),
          IsStore: false,
        }
        break

      case RoleTagName.JackDriver:
        const latLangJackDriver = mapRef.current?.getLatLng()
        if (!latLangJackDriver) return message.error('لطفا محدوده و کار خود را در نقشه تعیین کنید ')
        bodyData = {
          Stor_Name: '',

          Infspc_UsrID: user.userInfo?.usr_ID,
          Infspc_VehclType: value?.typeVehicles,
          Car_Modl: value?.carModel,
          Car_Color: value?.carColor,
          Car_Pelak:
            value?.typeVehicles == TypeVehiclesIndex.Motorcycle
              ? [value?.PlaqueMotorcycle1, value?.PlaqueMotorcycle2].join('-')
              : [value?.Plaque1, value?.PlaqueWord, value?.Plaque2, value?.PlaqueRegion].join('-'),
          Infspc_WorkExper: +value?.yearActivity,
          Stor_Lat: latLangJackDriver.lat.toString(),
          Stor_Long: latLangJackDriver.lng.toString(),
          IsStore: false,
        }
        break

      case RoleTagName.user_Seller:
        const latLangUser_Seller = mapRef.current?.getLatLng()
        if (!latLangUser_Seller) return message.error('لطفا محل کسب و کار خود را در نقشه تعیین کنید ')
        bodyData = {
          Infspc_UsrID: user.userInfo?.usr_ID,
          Stor_Name: value.CommercialTitle,
          Stor_Addres: value.address,
          Stor_Lat: latLangUser_Seller.lat.toString(),
          Stor_Long: latLangUser_Seller.lng.toString(),
          Infspc_WorkExper: +value?.yearActivity,
          Abilty_BrandCar: value?.specializedCar.join(','),
          Infspc_VehclType: value?.typeVehicles,
          IsStore: true,
        }
        break

      case RoleTagName.fixedMechanics:
        const latLangFixedMechanics = mapRef.current?.getLatLng()
        if (!latLangFixedMechanics) return message.error('لطفا محل کسب و کار خود را در نقشه تعیین کنید ')
        bodyData = {
          Infspc_UsrID: user.userInfo?.usr_ID,
          Stor_Name: value.CommercialTitle,
          Stor_Addres: value.address,
          Stor_Lat: latLangFixedMechanics.lat.toString(),
          Stor_Long: latLangFixedMechanics.lng.toString(),
          Infspc_WorkExper: +value?.yearActivity,
          Abilty_BrandCar: value?.specializedCar.join(','),
          Abilty_Major: value?.mainSkills,
          Abilty_Other: value?.subSkills?.join(',') || '',
          IsStore: true,
        }
        break

      default:
        return null
    }

    if (!bodyData) return

    if (forEdit) {
      updateInfoSpecialtyReq(bodyData)
      return
    }

    const refId = localStorage.getItem('refID')
    if (refId) {
      uploadImagesReq(+refId, value?.license_Uploads?.fileList, value?.cars_Uploads?.fileList || [])
      return
    }

    insertInfoSpecialtyReq(bodyData).then(refId => {
      if (refId) uploadImagesReq(refId, value?.license_Uploads?.fileList, value?.cars_Uploads?.fileList || [])
    })
  }

  useEffect(() => {
    if (!user) return
    getInfoSpecialtyReq(user.userInfo?.usr_ID as number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const ctxValue: IContextValue = {
    states: {
      selectsLoading,
      skills,
      selectsDisable,
      mapRef,
      infoSpecialty,
      forEdit,
      storeInfo,
    },
    handlers: {
      setSelectsLoadingHandler,
      setDisableHandler,
      onRegister,
      setStoreInfoHandler,
    },
    requests: {
      getFilesVehicleReq,
      getFilesLicenseReq,
      getSkillsReq,
      getBrandCarReq,
      insertInfoSpecialtyReq,
      uploadImagesReq,
      getInfoSpecialtyReq,
      getStoreReq,
      getBrandModelNames,
    },
  }

  return <SpecializedInformationCtx.Provider value={ctxValue}>{children}</SpecializedInformationCtx.Provider>
}

export const useSpecializedInformationCtx = () => useContext(SpecializedInformationCtx)!
