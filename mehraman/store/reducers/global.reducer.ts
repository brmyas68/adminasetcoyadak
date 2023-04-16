import { ReducerType } from '../interfaces/reducer-payload.type'
import { SavedUser } from '../interfaces/saved-user.interface'
import * as types from '../interfaces/action-types'

export interface ILoadingStore {
  perLoading: boolean
  preLoadingTitle: string
}
export interface initialStateType {
  user: SavedUser
  carImagePosition: number
  backButton: boolean
  loading: ILoadingStore
  selectedLanguage: string | number | null
}

const initialState: initialStateType = {
  user: { accessToken: '', userInfo: undefined, userStatus: '' },
  carImagePosition: 0,
  backButton: false,
  loading: { perLoading: true, preLoadingTitle: '' },
  selectedLanguage: 0,
}

export const globals = (state = initialState, { type, payload }: ReducerType) => {
  switch (type) {
    case types.SAVE_USER:
      return {
        ...state,
        user: payload,
      }
    case types.CARE_IMAGE_POSITION:
      return {
        ...state,
        carImagePosition: payload,
      }
    case types.ACTIVE_BACK_BUTTON:
      return {
        ...state,
        backButton: payload,
      }
    case types.PER_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          perLoading: payload,
        },
      }
    case types.PER_LOADING_TITLE:
      return {
        ...state,
        loading: {
          ...state.loading,
          preLoadingTitle: payload,
        },
      }
    case types.SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: payload,
      }

    default:
      return state
  }
}
