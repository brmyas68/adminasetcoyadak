import { RoleTagName } from '../constants/roleType'

export const conditionRole = (roleTag: string) => {
  if (roleTag === RoleTagName.user_Seller || roleTag === RoleTagName.fixedMechanics) {
    return 'fixedUser'
  } else {
    return 'itinerantUser'
  }
}
