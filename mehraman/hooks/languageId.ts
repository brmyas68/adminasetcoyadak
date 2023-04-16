import { useSelector } from 'react-redux'
import { selectedLanguage } from 'store/selectors'

export const useLanguageId = () => {
  const languageId = useSelector(selectedLanguage)
  if (languageId) {
    return languageId
  } else return false
}
