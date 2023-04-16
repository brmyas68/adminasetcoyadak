import Image from 'next/image'
import { FC } from 'react'
import { FormLogoStyle } from '../styles'

const MehramanLogo: FC = () => {
  return (
    <FormLogoStyle>
      <Image src={'/assets/images/common/mehraman-logo-type.png'} width={200} height={32} alt="مهرامن" />
    </FormLogoStyle>
  )
}

export default MehramanLogo
