import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { UserServicesService } from '../../../core/services/userService/user-services.service';
import { error } from 'jquery';


@Component({
  selector: 'app-particular-hotel-room-data',
  imports: [CommonModule, FormsModule],
  templateUrl: './particular-hotel-room-data.component.html',
  styleUrl: './particular-hotel-room-data.component.scss'
})
export class ParticularHotelRoomDataComponent implements OnInit {
  guest = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    password: '',
    confirmPassword: '',
    hasGST: false,
    fullName: ''   // 👈 added fullName
  };

  isLoading = false;
  isSuccess = false;
  chek = "dekhte hai";
  infodata: any;
  filter: any;
  checkin: any;
  checkout: any;

  checkInDay: string = '';
  checkInDateFormatted: string = '';
  checkInTimeFormatted: string = '';

  checkOutDay: string = '';
  checkOutDateFormatted: string = '';
  checkOutTimeFormatted: string = '';
  persion: any;
  checkCharges: any;
  errorMessage = '';
  isModalOpen = false;

  constructor(private route: ActivatedRoute, private service: AxiosService, private userservice: UserServicesService) {
    this.route.queryParams.subscribe(query => {

      this.filter = {
        check_in_date: query['check_in_date'],
        check_out_date: query['check_out_date'],
        roomType: query['roomType'],
        hotel_roomId: query['hotel_roomId'],
        hotel_vendor_id: query['hotel_vendor_id'],
        rooms_required: query['rooms'],
      };
    });

    if (this.filter) {
      this.service.getinfo(this.filter.hotel_vendor_id,
        this.filter.hotel_roomId).then((res: any) => {
          console.log(res.data.data);
          this.infodata = res.data.data;
          this.checkin = this.infodata.checkInTime;
          this.checkout = this.infodata.checkOutTime
          this.formatDates(this.checkin, this.checkout);
          const charges = parseFloat(this.infodata?.cancellation_charges || "0");

          if (charges === 0) {
            this.checkCharges = "Refundable when cancel in  24 hour ";
          } else {
            this.checkCharges = "Non-Refundable";
          }
        }).catch((err: any) => {
          console.error(err);
        })
    }
  }
  ngOnInit(): void {
    this.persion = Number(localStorage.getItem('adults'));
  }

  private isValidEmail(email: string): boolean {
    // Simple email regex check
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private isValidMobile(mobile: string): boolean {
    // Must be 10 digits only
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  }


  paymentMethods = [
    { name: 'PhonePe', logo: 'assets/phonepe-icon.png' },
    { name: 'Google Pay', logo: 'assets/gpay.png' },
    { name: 'Paytm', logo: 'assets/paytm-new.png' },

  ];


openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }



//   registerNow() {
//     this.isLoading = true;
//     this.isSuccess = false;
//     this.errorMessage = '';


//     // Simple validations
//     if (!this.guest.firstName || !this.guest.lastName || !this.guest.email || !this.guest.mobile) {
//       this.errorMessage = 'Please fill all required fields!';
//       this.updateFullName();
//       alert("fill all require details");
//       this.isLoading = false;
//       return;
//     }


//     if (!this.isValidEmail(this.guest.email)) {
//       this.errorMessage = 'Invalid email format!';
//       this.isLoading = false;
//       alert("please enter vailid email");
//       return;
//     }

//     if (!this.isValidMobile(this.guest.mobile)) {
//       this.errorMessage = 'Contact number must be 10 digits!';
//       alert(" mobile no.will be 10 digit");
//       this.isLoading = false;
//         return;
//       }
// // Password length check
      
//  if (this.guest.password  || this.guest.password.length <= 6) {
//        this.errorMessage = 'Password must be at least 6 characters!';
//          alert("Password must be at least 6 characters!");
//        this.isLoading = false;
//         return;
//        }
//     if (this.guest.password !== this.guest.confirmPassword) {
//       this.errorMessage = 'Passwords do not match!';
//       alert("password and  confirmPassword not match");
//       this.isLoading = false;
//       return;
//     }

//     const a = {
//       name: this.guest.fullName,
//       email: this.guest.email,
//       password: this.guest.password,
//       password_confirmation: this.guest.confirmPassword,
//       role: 'user',
//       mobile: this.guest.mobile  
//     };


//     this.userservice.userRegister(a).subscribe({
//       next: (res: any) => {
//         console.log('Register Success:', res);
//         this.isLoading = false;
//         this.isSuccess = true;
//         this.isModalOpen=true;
//         setTimeout(() => {
//           console.log('Guest Registered:', this.guest);
//           this.isLoading = false;
//           this.isSuccess = true;
//           this.isModalOpen=false;
//         }, 2000);


//       },
//       error: (err: any) => {
//         console.error('Register Error:', err);
//         this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
//         this.isLoading = false;
//       }
//     });


//   }

registerNow() {
  this.isLoading = true;
  this.isSuccess = false;
  this.errorMessage = '';

  this.updateFullName();

  // Validation checks
  if (!this.guest.firstName || !this.guest.lastName || !this.guest.email || !this.guest.mobile) {
    this.errorMessage = 'Please fill all required fields!';
    alert("Fill all required details");
    this.isLoading = false;
  } else if (!this.isValidEmail(this.guest.email)) {
    this.errorMessage = 'Invalid email format!';
    alert("Please enter a valid email");
    this.isLoading = false;
  } else if (!this.isValidMobile(this.guest.mobile)) {
    this.errorMessage = 'Contact number must be 10 digits!';
    alert("Mobile number must be 10 digits");
    this.isLoading = false;
  } else if (!this.guest.password || this.guest.password.length < 6) {
    this.errorMessage = 'Password must be at least 6 characters!';
    alert("Password must be at least 6 characters!");
    this.isLoading = false;
  } else if (this.guest.password !== this.guest.confirmPassword) {
    this.errorMessage = 'Passwords do not match!';
    alert("Password and Confirm Password do not match");
    this.isLoading = false;
  } else {
    // ✅ All validations passed
    const a = {
      name: this.guest.fullName,
      email: this.guest.email,
      password: this.guest.password,
      password_confirmation: this.guest.confirmPassword,
      role: 'user',
      mobile: this.guest.mobile  
    };

    this.userservice.userRegister(a).subscribe({
      next: (res: any) => {
        console.log('Register Success:', res);
        this.isLoading = false;
        this.isSuccess = true;
      
      
       sessionStorage.setItem('token', res.access_token);
       sessionStorage.setItem('name', res.user.name);
       sessionStorage.setItem('email', res.user.email);
       sessionStorage.setItem('role', res.user.role);

        setTimeout(() => {
          console.log('Guest Registered:', this.guest);
          // this.isModalOpen = false;
        }, 2000);
          this.isModalOpen = true;
      },
      error: (err: any) => {
        console.error('Register Error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        alert('Registration failed. Please try again.')
        this.isLoading = false;
      }
    });
  }
}

  private updateFullName() {
    this.guest.fullName = `${this.guest.title} ${this.guest.firstName} ${this.guest.lastName}`.trim();
  }

  paymentMethodss(){
    if(sessionStorage.getItem('name') && sessionStorage.getItem('token') && sessionStorage.getItem('email')){
       this.isModalOpen = true;
    }else{
     alert("Kindly complete your registration before proceeding.");

    }
  }

  formatDates(checkin: any, checkout: any) {

    // Detect format
    const ciParts = this.filter.check_in_date.split('-');
    const coParts = this.filter.check_out_date.split('-');

    let checkIn: Date, checkOut: Date;

    if (ciParts[0].length === 4) {
      // Backend gave YYYY-MM-DD
      const [ciYear, ciMonth, ciDay] = ciParts.map(Number);
      const [coYear, coMonth, coDay] = coParts.map(Number);
      checkIn = new Date(ciYear, ciMonth - 1, ciDay);
      checkOut = new Date(coYear, coMonth - 1, coDay);
    } else {
      // Backend gave DD-MM-YYYY
      const [ciDay, ciMonth, ciYear] = ciParts.map(Number);
      const [coDay, coMonth, coYear] = coParts.map(Number);
      checkIn = new Date(ciYear, ciMonth - 1, ciDay);
      checkOut = new Date(coYear, coMonth - 1, coDay);
    }

    this.checkInDay = checkIn.toLocaleDateString('en-US', { weekday: 'short' });
    this.checkOutDay = checkOut.toLocaleDateString('en-US', { weekday: 'short' });

    this.checkInDateFormatted = checkIn.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    this.checkOutDateFormatted = checkOut.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    this.checkInTimeFormatted = this.formatTime(checkin);
    this.checkOutTimeFormatted = this.formatTime(checkout);
  }

  formatTime(time: string): string {
    if (!time) return '';
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }



}
