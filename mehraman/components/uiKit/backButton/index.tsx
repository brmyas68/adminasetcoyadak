// import { activeBackButton } from 'common/store/selectors'
import { FC } from 'react'
import { ButtonContainer } from './styles'

interface IBackButtonProps {
  onClick: () => void
}
export const BackButton: FC<IBackButtonProps> = ({ onClick }) => {
  return (
    <ButtonContainer
      onClick={onClick}
      type="text"
      icon={<span className="material-icons icon">arrow_back</span>}
      className="backButton"
    ></ButtonContainer>
  )
}
