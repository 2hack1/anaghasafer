import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AxiosService } from '../../../core/services/axios/axios.service';

import { Router } from '@angular/router';
import { UserServicesService } from '../../../core/services/userService/user-services.service';


@Component({
  selector: 'app-forgetpasspopup',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgetpasspopup.component.html',
  styleUrl: './forgetpasspopup.component.scss'
})
export class ForgetpasspopupComponent {
  email: string = ''; otp: string[] = ['', '', '', '', '', ''];
  // 6 digits
  newPassword: string = '';
  confirmPassword: string = '';
  currentSlide = 0;

  isLoading: boolean = false;
  isLoadingNext: boolean = false;
  isVerifying: boolean = false;

  // ****************  shwo blank and invalid  messege
  emailfill: boolean = false;
  invailidemail: boolean = false;
  invailidOtp: boolean = false;
  otpfill: boolean = false;

  matchpass: boolean = false;
  countpass: boolean = false;
  fillpass: boolean = false;
  errorOcure: boolean = false;
  success:boolean=false;
  // *****************
  constructor(private service: AxiosService, private router: Router,private userservice:UserServicesService) { }



  nextSlide() {
    this.emailfill = false;
    if (!this.otp) {
      this.emailfill = true;
    } else {
      this.isLoadingNext = true;
      const form = new FormData();

      form.append('email', this.email)
      this.service.forgotpassSendOtp(form).then((res: any) => {
        if (!res.data) {
          return;
        } else {
          setTimeout(() => {
            this.isLoadingNext = false;
          }, 2000);
          if (this.currentSlide < 2) {
            this.currentSlide++;
          }

        }

      }).catch((err: any) => {
        this.isLoadingNext = false;
        if (err.status === 404) {
          this.invailidemail = true;
        } else {
          this.invailidemail = false; // or handle other errors separately
        }
      })
    }
  }


  veryfing() {

    this.otpfill = false;
    if (!this.otp) {
      this.otpfill = true;
    } else {
      this.isVerifying = true;
      const form = new FormData();
      const finalotp = this.otp.join('');

      form.append('otp', finalotp)
      form.append('email', this.email)
      this.service.forgotpassSendOtp(form).then((res: any) => {
        if (!res.data) {
          return;
        } else {
          setTimeout(() => {
            this.isVerifying = false;
          }, 2000);
          if (this.currentSlide < 2) {
            this.currentSlide++;
          }

        }

      }).catch((err: any) => {
        this.isLoadingNext = false;
        if (err.status === 404) {
          this.invailidOtp = true;
        } else {
          this.invailidOtp = false; // or handle other errors separately
        }
      })
    }
  }


  makeActive(event: any) {
    event.target.classList.add('active');
  }
  ngOnInit(): void { }



  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
  getSliderTransform() {
    return `translateX(-${this.currentSlide * 33}%)`;
  }

  moveToNext(event: any, index: number) {
    let input = event.target;
    if (input.value.length === 1 && input.nextElementSibling) {
      input.nextElementSibling.focus();
    } if (event.key === "Backspace" && input.previousElementSibling) { input.previousElementSibling.focus(); }



  }
  submitResetPassword() {
    this.isLoading = true;


    if (!this.newPassword || !this.confirmPassword) {
      // If either field is empty
      this.matchpass = true;   // Show "Password is required"
      this.fillpass = false;
      this.countpass = false;
      this.isLoading = false;
    }
    else if (this.newPassword.length < 6) {
      // If password is too short
      this.countpass = true;   // Show "Password must be at least 6 characters"
      this.matchpass = false;
      this.fillpass = false;
      this.isLoading = false;
    }
    else if (this.newPassword !== this.confirmPassword) {
      // If passwords don't match
      this.fillpass = true;    // Show "Passwords do not match"
      this.matchpass = false;
      this.countpass = false;
      this.isLoading = false;
    }
    else {
      // ✅ All validations passed → call API
      this.isLoading = true;
      this.matchpass = false;
      this.fillpass = false;
      this.countpass = false;
      let form = new FormData();
      form.append('email', this.email)
      form.append('new_password', this.newPassword);
      form.append('new_password_confirmation', this.confirmPassword);
      this.service.forgotUpdatePassword(form).then((res: any) => {

        if (!res.data) {
          this.errorOcure = true;
          this.matchpass = false;
          this.fillpass = false;
          this.countpass = false;
          this.isLoading = false;
        } else {
          this.isLoading = false;
           
           setTimeout(() => {
            this.success=true
          }, 4000);
           this.router.navigateByUrl('/home');
         
        }

      }).catch((err: any) => {
        this.isLoading = false;
        this.errorOcure = true;
      })
    }

    const enteredOtp = this.otp.join('');
    // console.log('Email:', this.email);
    // console.log('OTP:', enteredOtp);
    // console.log('New Password:', this.newPassword);
    // console.log('Confirm Password:', this.confirmPassword);
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match!"); return;
    }
  }


  showNewPassword = false;
  showConfirmPassword = false;

  onClickCallProfile() {
    this.userservice.callProfileFunction();
    // this.check=!this.check;
    console.log("onClickCallProfile  on  forget_passwordcomponent");
   window.location.reload();

  }
}
