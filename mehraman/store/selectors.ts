import { SavedUser } from './interfaces/saved-user.interface'
import { ILoadingStore } from './reducers/global.reducer'
import { RootState } from './root-reducer'

export const usersSelector = (state: RootState): SavedUser => state.globals.user
export const carImagePosition = (state: RootState): number => state.globals.carImagePosition
export const activeBackButton = (state: RootState): boolean => state.globals.backButton

export const loadingSelector = (state: RootState): ILoadingStore => state.globals.loading

export const selectedLanguage = (state: RootState): number => state.globals.selectedLanguage
