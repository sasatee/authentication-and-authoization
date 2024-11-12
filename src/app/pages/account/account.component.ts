import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf,AsyncPipe,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {


  private authService = inject(AuthService);
  public accountDetail$ = this.authService.getDetail();
  
}
