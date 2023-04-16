import * as types from '../interfaces/action-types'
import { SavedUser } from '../interfaces/saved-user.interface'

export const saveUser = (payload: SavedUser | null) => {
  return {
    type: types.SAVE_USER,
    payload,
  }
}
export const carImagePositionAction = (payload: number) => {
  return {
    type: types.CARE_IMAGE_POSITION,
    payload,
  }
}
export const activeBackButton = (payload: boolean) => {
  return {
    type: types.ACTIVE_BACK_BUTTON,
    payload,
  }
}
export const preLoadingAction = (payload: boolean) => {
  return {
    type: types.PER_LOADING,
    payload,
  }
}
export const preLoadingTitleAction = (payload: string) => {
  return {
    type: types.PER_LOADING_TITLE,
    payload,
  }
}

export const selectedLanguage = (payload: number) => {
  return {
    type: types.SELECTED_LANGUAGE,
    payload,
  }
}
