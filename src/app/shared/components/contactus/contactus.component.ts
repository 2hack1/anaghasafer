import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-contactus',
  imports: [ FormsModule ,],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  captchaChecked = false;

  toggleCaptcha() {
    this.captchaChecked = !this.captchaChecked;
  }




  contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      // console.log('Form Data:', this.contact);
      alert('Thank you for contacting us, ' + this.contact.name + '! We will get back to you shortly.');
      this.contact = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
      // 👉 Here you can send `this.contact` to your backend API
    } else {
      // console.log('Form is invalid');
    }
  }
}
