import { inject, Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { LoginRequest } from '../interfaces/login-request'
import { map, Observable } from 'rxjs'
import { LoginResponse } from '../interfaces/login-response'
import { HttpClient } from '@angular/common/http'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { RegisterRequest } from '../interfaces/register-request'
import { RegisterReponse } from '../interfaces/register-reponse'
import { UserDetailReponse } from '../interfaces/user-detail'

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   apiURL: string = environment.apiURL
   private httpClient = inject(HttpClient)
   private tokenKey = 'token'

   login (data: LoginRequest): Observable<LoginResponse> {
      return this.httpClient
         .post<LoginResponse>(`${this.apiURL}/account/login`, data)
         .pipe(
            map(response => {
               if (response.isSuccess) {
                  localStorage.setItem(this.tokenKey, response.token)
               }
               return response
            })
         )
   }

   register (data: RegisterRequest): Observable<RegisterReponse> {
      return this.httpClient.post<RegisterReponse>(
         `${this.apiURL}/account/register`,
         data
      )
   }

   getDetail = (): Observable<UserDetailReponse> =>
      this.httpClient.get<UserDetailReponse>(`${this.apiURL}/account/detail`)

   public isLoggedIn = (): boolean => {
      const token = this.getToken()
      if (!token) return false

      return !this.isTokenExpired()
   }

   private isTokenExpired () {
      const token = this.getToken()
      if (!token) return true
      const decodedToken = jwtDecode(token)

      // Check if 'exp' exists in the decoded token
      //if (!decodedToken['exp']) return true // If 'exp' is undefined, consider the token expired

      const isTokenExpired =
         decodedToken['exp'] !== undefined &&
         Date.now() >= decodedToken['exp'] * 1000
      if (isTokenExpired) {
         this.logout()
      }
      return isTokenExpired
   }

   getUserDetails () {
      const token = this.getToken()
      if (!token) return null
      const decodeToken: any = jwtDecode(token)
      const userDetails = {
         id: decodeToken.nameid,
         fullName: decodeToken.name,
         email: decodeToken.email,
         roles: decodeToken.role || []
      }
      // console.log(userDetails)
      return userDetails
   }

    getToken = (): string | null =>
      localStorage.getItem(this.tokenKey) || ''

   logout = (): void => {
      localStorage.removeItem(this.tokenKey)
   }
}
