import { AsyncPipe, NgIf } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, RouterLink } from '@angular/router'
import { Observable } from 'rxjs'
import { RoleRequest } from '../../interfaces/role-request'
import { ValidationError } from '../../interfaces/validation-error'
import { AuthService } from '../../services/auth.service'
import { RoleService } from '../../services/role.service'

@Component({
   selector: 'app-register',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatIconModule,
      MatSelectModule,
      RouterLink,
      ReactiveFormsModule,
      AsyncPipe,
      NgIf
   ],
   templateUrl: './register.component.html',
   styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
   fb = inject(FormBuilder)
   private roleService = inject(RoleService)
   private registerService = inject(AuthService)
   private matSnackBar = inject(MatSnackBar)
   roles$!: Observable<RoleRequest[]>
   registerForm!: FormGroup
   router = inject(Router)
   confirmPasswordHide = true
   passwordHide = true
   errors:ValidationError[] | undefined

   ngOnInit () {
      this.registerForm = this.fb.group(
         {
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            fullName: ['', Validators.required],
            roles: [''],
            confirmPassword: ['', Validators.required]
         },
         {
            validator: this.passwordMatchValidator
         }
      )

      this.roles$ = this.roleService.getRoles()
   }

   register () {
      this.registerService.register(this.registerForm.value).subscribe({
         next: response => {
            console.log(response)
            this.matSnackBar.open(response.message, 'Close', {
               duration: 5000,
               horizontalPosition: 'center'
            })
            this.router.navigate(['/login'])
         },
         error: (err: HttpErrorResponse) => {
            console.log(err)
            if (err.status === 400) {
              this.errors = err!.error
               this.matSnackBar.open('Validation Error', 'Close', {
                  duration: 5000,
                  horizontalPosition: 'center'
               })
            }
         },
         complete:()=>{console.log('Register success')}
      })
   }

   private passwordMatchValidator (
      control: AbstractControl
   ): { [key: string]: boolean } | null {
      const password = control.get('password')?.value
      const confirmPassword = control.get('confirmPassword')?.value
      if (password !== confirmPassword) {
         return { passwordMismatch: true }
      }
      return null
   }
}
