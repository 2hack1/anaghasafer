import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { UserServicesService } from '../../../core/services/userService/user-services.service';
import { error } from 'jquery';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-particular-hotel-room-data',
  imports: [CommonModule, FormsModule],
  templateUrl: './particular-hotel-room-data.component.html',
  styleUrl: './particular-hotel-room-data.component.scss'
  //  styleUrls: ['./particular-hotel-room-data.component.scss'] 
})
export class ParticularHotelRoomDataComponent implements OnInit {
  guest = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile1: '',
    mobile2: '',
    password: '',
    confirmPassword: '',
    hasGST: false,
    fullName: ''   // 👈 added fullName
  };
  env = environment
  userid: any;
  avrooms: any;
  isLoading: boolean = false;

  isSuccess: boolean = false;
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
  // **********************************

  // *************************************
  errorMessage = '';
  isModalOpen = false;
  transaction_id: string = '';
  constructor(private route: ActivatedRoute, private service: AxiosService,
    private userservice: UserServicesService, private router: Router) {
    this.route.queryParams.subscribe(query => {
      this.persion = query['adutls'];
      this.avrooms = query['avrooms'];
      this.filter = {
        check_in_date: query['check_in_date'],
        check_out_date: query['check_out_date'],
        roomType: query['roomType'],
        hotel_roomId: query['hotel_roomId'],
        hotel_vendor_id: query['hotel_vendor_id'],
        rooms_required: query['rooms'],
        children: query['children'],
      };
    });


    if (this.filter) {
      this.service.getinfo(this.filter.hotel_vendor_id,
        this.filter.hotel_roomId).then((res: any) => {
          console.log("infodata", res.data.data);
          this.infodata = res.data.data;
          this.amountcalc();
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

  basePrice: any;
  total_discount: any;
  price_after_discount: any;

  total_paid_amount: any;
  topPageShow = true;
  requireroom:any;
  amountcalc() {

    const stored = sessionStorage.getItem('roomtype');
let decodedValue: any = null;

if (stored) {
  try {
    decodedValue = JSON.parse(
      decodeURIComponent(escape(atob(stored)))
    );
    this.requireroom = decodedValue;
    console.log('✅ Decoded roomtype:', this.requireroom);
    this.topPageShow = true;  // value is valid
  } catch (err) {
    console.error('❌ Invalid or tampered value:', err);
    this.topPageShow = false;   // user changed or corrupted the data
  }
} else {
  this.topPageShow = false;    // nothing stored
}


    // if(sessionStorage.getItem('type') && sessionStorage.getItem('roomtype')){
    if (
      (sessionStorage.getItem('type') === 'combo' ||
        sessionStorage.getItem('type') === 'exact') &&
      this.requireroom
    ) {
      if (sessionStorage.getItem('type') === 'combo') {
   
        this.basePrice = this.infodata.basePrice * Number(this.requireroom)
        this.total_discount = (this.infodata.basePrice) / (this.infodata.discount) * Number(this.requireroom)
        this.price_after_discount = this.basePrice - this.total_discount;
        this.total_paid_amount = this.basePrice - this.total_discount;
        console.log("this.basePrice", this.basePrice)
        console.log("total_discount", this.total_discount)
        console.log("price_after_discount", this.price_after_discount)
        console.log("total_paid_amount", this.total_paid_amount)

      } else {
        this.basePrice = this.infodata.basePrice 
        // this.basePrice = this.infodata.basePrice;
        this.total_discount =  (this.basePrice * (this.infodata.discount / 100));
        this.price_after_discount = this.basePrice - this.total_discount;
        this.total_paid_amount = this.basePrice - this.total_discount;
        console.log("this.basePrice", this.basePrice)
        console.log("total_discount", this.total_discount)
        console.log("price_after_discount", this.price_after_discount)
        console.log("total_paid_amount", this.total_paid_amount)

      }


    } else {
      console.log("lskhfdklshlfsds sdfjslkdj")
      this.topPageShow = false;
    }
  }

  ngOnInit(): void {
    // this.persion = Number(localStorage.getItem('adults'));
    // console.log('avrooms:', this.avrooms)

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

  registerNow() {
    this.isLoading = true;
    this.isSuccess = false;
    this.errorMessage = '';

    this.updateFullName();

    // Validation checks
    if (!this.guest.firstName || !this.guest.lastName || !this.guest.email || !this.guest.mobile1 || !this.guest.mobile2) {

      // console.log("sjfdojsdof",this.guest)
      this.errorMessage = 'Please fill all required fields!';
      alert("Fill all required details");
      this.isLoading = false;
    } else if (!this.isValidEmail(this.guest.email)) {
      this.errorMessage = 'Invalid email format!';
      alert("Please enter a valid email");
      this.isLoading = false;
    } else if (!this.isValidMobile(this.guest.mobile1)) {
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
        mob1: this.guest.mobile1,
        mob2: this.guest.mobile2,

      };

      this.userservice.userRegister(a).subscribe({
        next: (res: any) => {
          // console.log('Register Success:', res);
          this.isLoading = false;
          this.isSuccess = true;
          this.userid = res.user.id;
          sessionStorage.setItem('i', res.user.id)
          sessionStorage.setItem('token', res.access_token);
          sessionStorage.setItem('name', res.user.name);
          sessionStorage.setItem('email', res.user.email);
          sessionStorage.setItem('role', res.user.role);

          setTimeout(() => {
            // console.log('Guest Registered:', this.guest);
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

  paymentMethodss() {
    if (sessionStorage.getItem('name') && sessionStorage.getItem('token') && sessionStorage.getItem('email')) {
      this.isModalOpen = true;
    } else {
      alert("Kindly complete your REGISTRATION or LOGIN before proceeding.");
      // return
    }
  }

  showInclusions = false;
  toggleInclusions() {
    this.showInclusions = !this.showInclusions;
  }

  showMore = false;

  toggleMore() {
    this.showMore = !this.showMore;
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

  selectedMethod: any = null;

  selectMethod(method: any) {
    this.selectedMethod = method;
    // console.log("selected method", method);
    // console.log("transition id", this.transaction_id);

  }
  // *************************************************************************************************

  submitPayment( ) {





    const booking = {
      user_id: sessionStorage.getItem('i'),
      hotel_vendor_id: this.infodata.hotel_vendor_id,
      hotel_roomId: this.infodata.hotel_roomId,
      check_in_date: this.filter.check_in_date,
      check_out_date: this.filter.check_out_date,
      adults: this.persion,
      children: this.filter.children,
      rooms_booked: this.filter.rooms_required,
      roomType: this.infodata.roomType,
      // payment_status:"pending",
      
      payment_method: this.selectedMethod,
      transaction_id: this.transaction_id,
      // status:"",
      // special_requests:"",
      price_per_night: this.infodata.finalPrice,   //per night price
      total_amount: (this.infodata.finalPrice * this.filter.rooms_required), //total amount
      rooms_available: this.avrooms,

      room_no: this.filter.rooms_required && this.filter.rooms_required.length > 0
        ? this.filter.rooms_required
        : []   // ✅ safe default
    }


    //  console.log('lsdhfshdfsd',booking)

    const data = new FormData();
    Object.entries(booking).forEach(([key, value]) => {
      data.append(key, value as any);
    });
    // console.log('FormData entries:');

    const txnId = booking.transaction_id?.trim();

    // Regex for Razorpay, Paytm, UPI/Bank (UTR), PhonePe/Google Pay
    const txnRegex = /^(pay_[a-zA-Z0-9]{8,20}|order_[a-zA-Z0-9]{8,20}|txn_[a-zA-Z0-9]{8,20}|[0-9A-Z]{10,20})$/;


    // console.log("booking:",booking);
    if (txnId && txnRegex.test(txnId)) {
      // if (booking.transaction_id) {

      this.service.booking(data).then((res: any) => {

        // console.log("bookingg",this.userid);
        this.router.navigate(['/profile', this.userid]);
        // this.router.navigate(['/profile', 1]);

        //         const encryptedId = btoa(this.userid.toString()); // convert to Base64
        // this.router.navigate(['/profile', encryptedId]);
        // sessionStorage.clear();
      }).catch((err: any) => {
        console.error(err);
      })
    } else {
      this.errorMessage = 'Please enter the transaction ID to proceed with the payment.';
      alert('Please enter the  valid transaction ID ');
    }
  }
}
