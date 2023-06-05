export class UserLogin{
  email!: string
  password!: string
}

export interface ReturnResponse {
  statusCode: number
  isSuccess: boolean
  response: AuthenticationResponse
  message: string
}
  
export interface AuthenticationResponse {
  personName: string
  email: string
  userType: string
  token: string
  expiration: string
  refreshToken: string
  refreshTokenExpirationDateTime: string
}

export interface AddUser {
  personName: string
  gender: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  userType: number
}

export interface DialogData{
  userRole: number
}