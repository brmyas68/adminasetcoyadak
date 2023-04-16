import { RoleTagName } from '../constants/roleType'

export const roleToTypeInfo = (roleTag: string) => {
  switch (roleTag) {
    case RoleTagName.fixedMechanics:
      return 0
    case RoleTagName.itinerantMechanics:
      return 1
    case RoleTagName.JackDriver:
      return 2
    case RoleTagName.user_Seller:
      return 3
    default:
      return 0
  }
}
