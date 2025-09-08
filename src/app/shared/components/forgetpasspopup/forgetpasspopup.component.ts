import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpasspopup',
  imports: [ CommonModule,FormsModule],
  templateUrl: './forgetpasspopup.component.html',
  styleUrl: './forgetpasspopup.component.scss'
})
export class ForgetpasspopupComponent {
 step = 0; // 0=email, 1=otp, 2=reset
  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';

  sendOtp() {
    if (this.email) {
      console.log('Sending OTP to:', this.email);
      this.step = 1;
    }
  }

  verifyOtp() {
    if (this.otp === '1234') { // demo only
      console.log('OTP verified');
      this.step = 2;
    } else {
      alert('Invalid OTP');
    }
  }

  updatePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Password updated:', this.newPassword);
      alert('Password successfully updated!');
      this.step = 0;
    } else {
      alert('Passwords do not match');
    }
  }
}
