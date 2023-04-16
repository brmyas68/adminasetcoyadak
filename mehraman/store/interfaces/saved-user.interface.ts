import { UserStates } from 'modules/login/models/enums'
import { ICUser } from 'package-mehraman-core'

export interface SavedUser {
  accessToken: string
  userInfo?: ICUser
  userStatus: string
  desc?: string
}
