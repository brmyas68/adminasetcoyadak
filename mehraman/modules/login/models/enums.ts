export enum LoginSteps {
  mobile = 0,
  sms = 1,
}

export enum LoginResultMessage {
  RequestFailt = 'RequestFailt',
  NotFoundActiveCode = 'NotFoundActiveCode',
  IsBlockUser = 'IsBlockUser',
  ErrorToken = 'ErrorToken',
}

export enum UserStates {
  Active = 'Active',
  Inactive = 'Inactive',
  Continue = 'Continue',
  Pending = 'Pending',
  PendingActive = 'PendingActive',
  New = 'New',
}
