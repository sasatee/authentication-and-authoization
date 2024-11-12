import {  RoleRequest } from "./role-request";

export interface RoleReponse {
     isSuccess: boolean;
     message: string;
     data:  RoleRequest[];
}
