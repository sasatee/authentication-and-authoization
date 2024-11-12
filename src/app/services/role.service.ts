import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {  RoleRequest } from '../interfaces/role-request';
import { RoleReponse } from '../interfaces/role-reponse';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiURL = environment.apiURL

  private httpClient = inject(HttpClient)

  getRoles = ():Observable<RoleRequest[]>=>
    this.httpClient.get<RoleReponse>(`${this.apiURL}/roles`).pipe(
      map((response) => {
       
        return response.data
      })
    )

}
