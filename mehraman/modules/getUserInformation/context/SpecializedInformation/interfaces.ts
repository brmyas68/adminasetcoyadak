import { UploadFile } from 'antd'
import { Marker } from 'leaflet'
import { IObject } from 'models'
import { ICBodyInfoSpecialty, ICBrandCar, ICBrandModelCar, ICFiles, ICInfoSpecialty, ICResultGetStore } from 'package-mehraman-core'
import { IAbility } from 'package-mehraman-core/Core/CLS/IModel/InterfaceModels/IAbility'
import { MutableRefObject, Ref } from 'react'

export interface ILoadingProps {
  skills: boolean
  brands: boolean
  brandModels: boolean
  finaleInsert: boolean
  models: boolean
  getInfo: boolean
}

export interface IDisableProps {
  subSkills: boolean
  model: boolean
}

export interface IImgUploaded {
  license: ICFiles[]
  vehicle: ICFiles[]
}

interface IContextValueState {
  selectsLoading: ILoadingProps
  skills?: IAbility[]
  selectsDisable: IDisableProps
  mapRef: MutableRefObject<Marker<any> | undefined>
  infoSpecialty?: ICInfoSpecialty
  forEdit: boolean
  storeInfo?: ICResultGetStore
}

interface IContextValueHandler {
  setSelectsLoadingHandler: (name: LoadingKeys, loading: boolean) => void
  setDisableHandler: (name: DisableKeys, loading: boolean) => void
  onRegister: (value: IObject) => void
  setStoreInfoHandler: (store: ICResultGetStore) => void
}
interface IContextValueRequests {
  getSkillsReq: (Parent_ID: number) => Promise<void>
  getBrandCarReq: (Brand_Type: number) => Promise<ICBrandCar[] | undefined>
  insertInfoSpecialtyReq: (bodyData: ICBodyInfoSpecialty) => Promise<number | undefined>
  uploadImagesReq: (refId: number, licenseImages?: UploadFile[], UploadImages?: UploadFile[]) => Promise<void>
  getInfoSpecialtyReq: (user_ID: number) => Promise<void>
  getFilesVehicleReq: (user_ID: number) => Promise<ICFiles[] | undefined>
  getFilesLicenseReq: (user_ID: number) => Promise<ICFiles[] | undefined>
  getStoreReq: (user_ID: number) => Promise<ICResultGetStore | undefined>
  getBrandModelNames: (user_ID: number) => Promise<ICBrandModelCar[] | undefined>
}

export interface IContextValue {
  states: IContextValueState
  handlers: IContextValueHandler
  requests: IContextValueRequests
}

export type LoadingKeys = keyof ILoadingProps
export type DisableKeys = keyof IDisableProps
export type IImgUploadedKey = keyof IImgUploaded
