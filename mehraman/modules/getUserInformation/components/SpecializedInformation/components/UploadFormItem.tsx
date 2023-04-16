import { Typography, UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import UploadImages from 'components/uiKit/uploadImage'
import { useSpecializedInformationCtx } from 'modules/getUserInformation/context'
import React, { FC } from 'react'
import { UploadFormItemContainer } from '../style'

interface IProps {
  title: string
  fileList: UploadFile[]
  aspect?: number
  onChange: (info: UploadChangeParam<UploadFile<any>>) => void
}

const UploadFormItem: FC<IProps> = ({ title, fileList, aspect = 1.8, onChange }) => {
  const { states } = useSpecializedInformationCtx()

  return (
    <UploadFormItemContainer>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Text>فرمت فایل های ارسالی میبایست jpeg، jpg یا png بوده و حجم آن کمتر از 1 مگابایت باشد</Typography.Text>
      <UploadImages count={4} fileList={fileList} onChange={onChange} aspect={aspect} disabled={states.forEdit} />
    </UploadFormItemContainer>
  )
}

export default UploadFormItem
