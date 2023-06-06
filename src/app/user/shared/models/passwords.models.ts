export interface ChangePassword {
  email: string,
  currentPassword: string,
  newPassword: string,
}

export interface ForgotPassword {
  email: string
}

export interface ResetPassword {
  email: string
  otp: string
  newPassword: string
}

export interface OtpReturnResponse {
  statusCode: number
  isSuccess: boolean
  response: string
  message: string
}