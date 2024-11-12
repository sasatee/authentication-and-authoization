import { Component, inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { LoginResponse } from '../../interfaces/login-response'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide = true

  form!: FormGroup
  fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private matSnackBar = inject(MatSnackBar)
  private router = inject(Router)

  ngOnInit (): void {
    this.form = this.fb.group({
      email: ['sahil@gmail.com', [Validators.required, Validators.email]],
      password: ['Secretpassword@1', Validators.required]
    })
  }

  login () {
    if (this.form.invalid) {
      this.matSnackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 500,
        horizontalPosition: 'center'
      });
      return;
    }

    

    console.log(this.form.value)
    this.authService.login(this.form.value).subscribe({
      next: (response: LoginResponse) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 500,
          horizontalPosition: 'center'
        })
        this.router.navigate(['/'])
      },
      error: error => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 500,
          horizontalPosition: 'center'
        })
      }
    })
  }
}
