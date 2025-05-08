import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  captchaChecked = false;

  toggleCaptcha() {
    this.captchaChecked = !this.captchaChecked;
  }

}
