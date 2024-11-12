export interface UserDetailReponse {
   id: string
   fullName: string
   email: string
   roles: string[]
   phoneNumber: string
   twoFactorEnabled: boolean
   phoneNumberConfirmed: boolean
   accessFailedCount: number
}
