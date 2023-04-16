import { FC } from 'react'
import { useRouter } from 'next/router'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { Routes } from 'models/enums'
import { GetUserInfoButtonsContainer } from '../styles/formButtons'
interface IGetUserInfoButtons {
  loading?: boolean
  submitTitle: string
  disabled?: boolean
  submitIcon: React.ReactNode
  hasBack: boolean
  onClickBack?: () => void
}

const GetUserInformationButtons: FC<IGetUserInfoButtons> = ({ loading, submitTitle, submitIcon, disabled, hasBack, onClickBack }) => {
  const router = useRouter()

  const handleCancel = () => {
    router.push(Routes.Home)
  }
  return (
    <GetUserInfoButtonsContainer>
      {hasBack && (
        <ButtonUiKit type="text" className="back" icon={<span className="material-icons">arrow_forward</span>} onClick={onClickBack}>
          مرحله قبل
        </ButtonUiKit>
      )}
      <ButtonUiKit
        type="text"
        className="cancel btn-margin-right"
        icon={<span className="material-icons">close</span>}
        onClick={handleCancel}
      >
        انصراف
      </ButtonUiKit>
      <ButtonUiKit
        type="primary"
        className="submit btn-margin-right"
        htmlType="submit"
        loading={loading}
        disabled={disabled}
        icon={submitIcon}
      >
        {submitTitle}
      </ButtonUiKit>
    </GetUserInfoButtonsContainer>
  )
}

export default GetUserInformationButtons
