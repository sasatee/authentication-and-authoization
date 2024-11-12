import { Component, inject } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { MatMenuModule } from '@angular/material/menu'
import { CommonModule } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [
      MatToolbar,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      RouterLink,
      CommonModule
   ],
   templateUrl: './navbar.component.html',
   styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   authService = inject(AuthService)
   matSnackbar = inject(MatSnackBar)

   router = inject(Router)

   isLoggedIn () {
      return this.authService.isLoggedIn()
   }

   logout = () => {
      this.authService.logout()
      this.matSnackbar.open('log out sucess.', 'Close', {
         duration: 1000,
         horizontalPosition: 'right'
      })
      this.router.navigate(['/login'])
   }
}
