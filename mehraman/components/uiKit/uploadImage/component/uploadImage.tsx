import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import React, { FC, useEffect, useState } from 'react'
import { IUploadImage } from '../interface/IUploadImage'
import { UploadImageStyle } from '../style/style'
import { UploadRequestOption } from 'rc-upload/lib/interface'

const UploadImage: FC<IUploadImage> = ({ action, fileList, onChange, count, aspect = 0.8, disabled = false }) => {
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const dummyRequest: (options: UploadRequestOption) => void = ({ file, onSuccess }) => {
    setTimeout(() => {
      if (onSuccess) {
        onSuccess('done')
        return file
      }
    }, 0)
  }

  return (
    <ImgCrop rotate modalTitle="ویرایش عکس" aspect={aspect} modalOk="تایید" modalCancel="لغو">
      <UploadImageStyle
        customRequest={dummyRequest}
        action={action}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept="image/png, image/jpeg, image/jpg"
        disabled={disabled}
      >
        {fileList.length < count && (
          <div className="textOfUploadImage">
            <span className="plus">+</span> <span className="text">بارگذاری عکس</span>
          </div>
        )}
      </UploadImageStyle>
    </ImgCrop>
  )
}

export default UploadImage
