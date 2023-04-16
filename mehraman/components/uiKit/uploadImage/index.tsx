import { FC } from 'react'
import UploadImage from './component/uploadImage'
import { IUploadImage } from './interface/IUploadImage'

const UploadImages: FC<IUploadImage> = ({ action, fileList, onChange, count, aspect, disabled }) => {
  return <UploadImage action={action} fileList={fileList} onChange={onChange} count={count} aspect={aspect} disabled={disabled} />
}

export default UploadImages
