import { Button } from 'antd'
import { CEnvironmentHost, Common, ICEnvironmentHost } from 'package-mehraman-core'
import { FC, useState } from 'react'

const Blog: FC = () => {
  const [file, setFile] = useState<FileList>()
  const upload = () => {
    if (file) {
      const _ICEnvironmentHost: ICEnvironmentHost = {
        API_CLS: process.env.NEXT_PUBLIC_API_CLS!,
        API_UC: process.env.NEXT_PUBLIC_API_UC!,
        FTP_CLS: process.env.NEXT_PUBLIC_FTP_CLS!,
      }
      new CEnvironmentHost(_ICEnvironmentHost)
      const service = new Common('')
      const formData = new FormData()
      formData.append('Files', file[0])
      service.UploadFile(formData).then(res => console.log(res))
    }
  }
  return (
    <div
      style={{
        width: '100vw',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input type={'file'} onChange={e => setFile(e.target.files!)} />
      <Button onClick={upload}>upload</Button>
    </div>
  )
}

export default Blog
