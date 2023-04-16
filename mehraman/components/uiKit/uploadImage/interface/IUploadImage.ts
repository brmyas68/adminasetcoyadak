import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface'
import { RcFile } from 'antd/lib/upload'

declare type BeforeUploadValueType = void | boolean | string | Blob | File
export interface IUploadImage {
  action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>)
  fileList: UploadFile<any>[]
  // setFileList:React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  file?: UploadFile<any>
  onChange: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined
  count: number
  aspect?: number
  disabled?: boolean
}
