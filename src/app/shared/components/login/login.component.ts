import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() isLogin: boolean = false
  @Output() isLoginChange = new EventEmitter<Boolean>()

  isSignup = false

  closeLogin() {
    this.isLoginChange.emit(false)
  }
}
