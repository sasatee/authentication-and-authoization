export interface LoginResponse {
  token: string
  isSuccess: boolean
  message: string
  roles: string[]
}
