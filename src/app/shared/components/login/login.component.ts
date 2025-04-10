import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() isLogin: boolean = false
  @Output() isLoginChange = new EventEmitter<Boolean>()

  closeLogin() {
    this.isLoginChange.emit(false)
  }
}
