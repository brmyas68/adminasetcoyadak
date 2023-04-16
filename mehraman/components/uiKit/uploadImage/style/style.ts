import { Upload } from 'antd'
import styled from 'styled-components'

export const UploadImageStyle = styled(Upload)`
  .ant-upload-list {
    float: right;
    display: flex;
    flex-direction: row-reverse;
    right: 0;
  }
  .textOfUploadImage {
    display: flex;
    flex-direction: column;
    span {
      color: #9e9e9e;
    }
    .plus {
      font-size: 16px;
    }
    .text {
      font-weight: 400;
      font-size: 10px;
      line-height: 17px;
    }
  }
`
