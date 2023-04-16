import { FC } from 'react'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { ILoginBtnProps } from '../models/interfaces'

const ButtonsLogin: FC<ILoginBtnProps> = props => {
  return (
    <ButtonUiKit className="submitDesktop submitMobile" htmlType="submit" {...props}>
      {props.title}
    </ButtonUiKit>
  )
}

export default ButtonsLogin
