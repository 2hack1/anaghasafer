import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { trigger, animate, style, state, transition } from "@angular/animations"
import { RouterLink } from '@angular/router';
import { UserServicesService } from '../../../core/services/userService/user-services.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LoginComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',    
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
   a:any;     // no used
  constructor(private us_: UserServicesService) { }
  isLogin = false

  isHidden = false;
  lastScrollTop = 0;

  // login =false;
  // logout=true;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      // 👇 Scroll down
      this.isHidden = true;
    } else {
      // 👆 Scroll up
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  isLoggedIn: boolean = false;


  ngOnInit(): void {
    // const token = localStorage.getItem('token');
    // this.isLoggedIn = !!token; 

    this.us_.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }



  logout() {
    this.us_.logout();
  }

  openLoginModal() {
    this.isLogin = true;
  }
}

// <div class="booking-container">
//   <div class="left-content">
//     <div class="booking-card">
//       <div class="header">
//         <div>
//           <h2 class="hotel-name">Ivy Retreat Apartments Baga</h2>
//           <div class="tags">
//             <span class="tag blue">Apartment</span>
//             <span class="tag grey">Couple Friendly</span>
//           </div>
//           <p class="hotel-address">Khopra Vaddo, Calangute - 403516, Goa, India</p>
//         </div>
//         <img
//           src="https://r1imghtlak.mmtcdn.com/db7ac6ac61c111eeaa070a58a9feac02.jpg?&output-quality=75&crop=520:350;0,19&output-format=jpg&downsize=540:*"
//           alt="Hotel" class="hotel-img">
//       </div>

//       <div class="stay-info">
//         <div class="checkin">
//           <span class="label">CHECK IN</span>
//           <span class="date">Tue <b>12 Aug 2025</b></span>
//           <span class="time">2 PM</span>
//         </div>
//         <div class="night-count">
//           <span class="nights">1 NIGHT</span>
//         </div>
//         <div class="checkout">
//           <span class="label">CHECK OUT</span>
//           <span class="date">Wed <b>13 Aug 2025</b></span>
//           <span class="time">11 AM</span>
//         </div>
//         <div class="stay-summary">
//           1 Night | 3 Adults | Entire Apartment (550 sq.ft)
//         </div>
//       </div>

//       <div class="room-details">
//         <div>
//           <h2>Studio</h2>
//           <p lass="hotel-address">3 Adults</p>
//           <ul style="margin-top: 20px;">
//             <li>Stay Only</li>
//             <li style="margin-top: 10px;">No meals included</li>
//           </ul>
//           <h3 style="font-size: 18px;">Non-Refundable</h3>
//           <p class="policy">Refund is not applicable for this booking</p>
//           <a href="#" class="policy-link">Cancellation policy details</a>
//         </div>
//         <a href="#" class="see-inclusions">See Inclusions</a>
//       </div>
//     </div>

//     <div class="info-card">
//       <h2>Important information</h2>
//       <ul style="margin-top: 10px;">
//         <li style="margin-left: 20px;">Primary Guest should be atleast 18 years of age.</li>
//         <li style="margin-left: 20px;">Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)</li>
//         <li style="margin-left: 20px;">Unmarried couples allowed</li>
//         <li style="margin-left: 20px;">Unmarried couples are not allowed in hourly stay rooms</li>
//       </ul>
//       <a href="#" class="link" style="margin-top: 10px;">View More</a>
//     </div>



//     <div class="guest-form">
//   <h3>Guest Details</h3>
//   <form>
//     <!-- Title -->
//     <div class="form-group">
//       <label for="title">Title</label>
//       <select id="title" [(ngModel)]="guest.title" name="title">
//         <option value="Mr">Mr</option>
//         <option value="Mrs">Mrs</option>
//         <option value="Ms">Ms</option>
//         <option value="Dr">Dr</option>
//       </select>
//     </div>

//     <!-- Full Name -->
//     <div class="form-row">
//       <div class="form-group">
//         <label for="firstName">First Name</label>
//         <input id="firstName" type="text" [(ngModel)]="guest.firstName" name="firstName" />
//       </div>
//       <div class="form-group">
//         <label for="lastName">Last Name</label>
//         <input id="lastName" type="text" [(ngModel)]="guest.lastName" name="lastName" />
//       </div>
//     </div>

//     <!-- Email -->
//     <div class="form-group">
//       <label for="email">Email Address <small>(Booking voucher will be sent to this email ID)</small></label>
//       <input id="email" type="email" [(ngModel)]="guest.email" name="email" />
//     </div>

//     <!-- Mobile Number -->
//     <div class="form-row">
//       <div class="form-group country-code">
//         <label for="countryCode">Code</label>
//         <select id="countryCode" [(ngModel)]="guest.countryCode" name="countryCode">
//           <option value="+91">+91</option>
//           <option value="+1">+1</option>
//           <option value="+44">+44</option>
//         </select>
//       </div>
//       <div class="form-group">
//         <label for="mobile">Contact Number</label>
//         <input id="mobile" type="tel" [(ngModel)]="guest.mobile" name="mobile" />
//       </div>
//         <div class="form-group">
//         <label for="password">Password</label>
//         <input id="password" type="text" [(ngModel)]="guest.mobile" name="password" />
//       </div>
//       <!-- <div class="form-group">
//         <label for="password">Confirm Password</label>
//         <input id="password" type="text" [(ngModel)]="guest.mobile" name="password" />
//       </div> -->
//     </div>

//     <!-- GST -->
//     <div class="form-group checkbox">
//       <input id="gst" type="checkbox" [(ngModel)]="guest.hasGST" name="hasGST" />
//       <label for="gst" style="margin-left: 8px;">Enter GST Details (Optional)</label>
//     </div>

//     <!-- Add Guest -->
//     <a href="#" class="add-guest">+ Add Guest</a>

//     <!-- Login -->
//     <div class="login-section"  style="margin-top: 10px;">
//       <p>Login to prefill traveller details and get access to secret deals</p>
//       <button type="button" class="login-btn">LOGIN</button>
//     </div>
//   </form>
// </div>

//   </div>

//   <!-- RIGHT SECTION -->
//   <div class="right-sidebar">
//     <div class="price-card">
//       <h4>Price Breakup</h4>
//       <div class="row" style="border-bottom: 1px solid #d8d8d8; margin-bottom: 20px;">
//         <span style="color: #000000; font-size: 16px;"><b>Entire Apartment (550 sq.ft) × ₹ 19,00<br>1 Night </b></span>
//         <!-- <span>₹ 1,900</span> -->
//       </div>

//       <div class="row total-discount" style="border-bottom: 1px solid #d8d8d8; margin-bottom: 20px;">
//         <span style="font-size: 16px;">Total Discount <i class="info-icon"></i></span>
//         <span>- ₹ 558</span>
//       </div>
//       <div class="row" style="border-bottom: 1px solid #d8d8d8; margin-bottom: 20px;">
//         <span style="font-size: 16px;">Price after Discount</span>
//         <span>₹ 1,342</span>
//       </div>
//       <div class="row" style="border-bottom: 1px solid #d8d8d8; margin-bottom: 20px;">
//         <span style="font-size: 16px;">Taxes & Service Fees</span>
//         <span>₹ 282</span>
//       </div>
//       <div class="row total">
//         <span style="font-size: 16px;">Total Amount to be paid</span>
//         <span>₹ 1,624</span>
//       </div>
//     </div>

//     <div class="coupon-card">
//       <h4>Coupon Codes</h4>
//       <div class="coupon active">
//         <input type="radio" checked>
//         <label>MMTHOMESTAYS... <span class="discount">₹ 368</span></label>
//         <p class="desc">Congratulations! Discount of INR 368 Applied</p>
//       </div>
//       <div class="coupon">
//         <input type="radio">
//         <label style="margin-left: 0rem;">HOMESTAY <span class="discount">₹ 357</span></label>
//         <p class="desc">Congratulations! Discount of INR 357 has been applied for your Booking!</p>
//       </div>
//       <div class="coupon">
//         <input type="radio">
//         <label>HOMESTAY <span class="discount">₹ 357</span></label>
//         <p class="desc">Congratulations! Discount of INR 357 has been applied for your Booking!</p>
//       </div>

//       <div class="gift-note">MMT Gift Cards can be applied at payment step</div>
//       <div class="coupon-input">
//         <input type="text" placeholder="Have a Coupon Code">
//         <button>→</button>
//       </div>
//     </div>
//   </div>
// </div>
  




// csss
// body {
//   font-family: Arial, sans-serif;
//   background: #fff;
//   margin: 0;
//   color: #333;
// }

// .booking-container {
//   display: flex;
//   gap: 20px;
//   max-width: 1200px;
//   margin: 20px auto;
// }

// .left-content {
//   flex: 2;
// }

// .right-sidebar {
//   flex: 1;
// }

// .hotel-card,
// .info-card {
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   padding: 16px;
//   background: #fff;
//   margin-bottom: 16px;
// }

// .hotel-title {
//   margin: 0;
//   font-size: 2px;
//   font-weight: bold;
// }

// .tags {
//   margin: 6px 0;
// }

// .tag {
//   display: inline-block;
//   padding: 2px 6px;
//   font-size: 12px;
//   border-radius: 4px;
//   margin-right: 4px;
// }

// .tag.blue {
//   background: #e5f3ff;
//   color: #fff;
// }

// .tag.grey {
//   background: #eee;
//   color: #333;
// }

// .hotel-address {
//   font-size: 14px;
//   color: #555;
// }

// .checkin-out {
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   margin: 16px 0;
// }

// .check-block {
//   display: flex;
//   flex-direction: column;
//   font-size: 13px;
// }

// .night-count {
//   background: #f2f2f2;
//   padding: 4px 8px;
//   border-radius: 12px;
//   font-size: 12px;
// }

// .stay-summary {
//   font-size: 12px;
//   color: #555;
// }

// .room-info ul {
//   padding-left: 20px;
//   margin: 4px 0;
// }

// .room-info p,
// .room-info ul {
//   font-size: 13px;
// }

// .link {
//   color: #0071c2;
//   font-size: 13px;
//   text-decoration: none;
// }

// .link:hover {
//   text-decoration: underline;
// }

// /* Right Sidebar */
// .price-card,
// .coupon-card {
//   margin-top: 20px;
//   width: 20rem;
//   height: 24rem;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   background: #fff;
//   padding: 16px;
//   margin-bottom: 16px;
// }

// .price-card h4,
// .coupon-card h4 {
//   margin: 0 0 12px 0;
//   font-size: 16px;
// }

// .price-card .row {
//   display: flex;
//   justify-content: space-between;
//   font-size: 14px;
//   padding: 6px 0;
// }

// .total-discount {
//   color: green;
// }

// .total {
//   font-weight: bold;
// }

// .coupon {
//   margin-top: 20px;
//   // border: 1px solid #ddd;
//   border: dotted #0071c2;
//   border-radius: 4px;
//   padding: 8px;
//   margin-bottom: 8px;
// }

// .coupon.active {
//   border-color: #0071c2;
//   background: #f0f8ff;
// }

// .coupon label {
//   font-weight: bold;
// }

// .coupon .discount {
//   color: #0071c2;
//   margin-left: 6px;
// }

// .coupon .desc {
//   font-size: 12px;
//   color: #555;
//   margin: 4px 0 0;
// }

// .gift-note {
//   font-size: 12px;
//   background: #f5f2eb;
//   padding: 6px;
//   border-radius: 4px;
//   color: #7a5a2e;
//   margin-bottom: 8px;
// }

// .coupon-input {
//   display: flex;
// }

// .coupon-input input {
//   flex: 1;
//   padding: 6px;
//   font-size: 14px;
//   border: 1px solid #ddd;
//   border-radius: 4px 0 0 4px;
// }

// .coupon-input button {
//   background: #0071c2;
//   color: white;
//   border: none;
//   padding: 0 12px;
//   border-radius: 0 4px 4px 0;
//   cursor: pointer;
// }

// //
// .booking-card {
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   padding: 16px;
//   max-width: 850px;
//   margin: 20px auto;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
// }

// /* Header Section */
// .header {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
// }

// .hotel-name {
//   font-weight: bold;
//   font-size: 20px;
//   margin: 0;
// }

// .tags {
//   margin: 6px 0;
// }

// .tag {
//   display: inline-block;
//   padding: 2px 6px;
//   font-size: 12px;
//   border-radius: 4px;
//   margin-right: 4px;
// }

// .tag.blue {
//   background: #0071c2;
//   color: #fff;
// }

// .tag.grey {
//   background: #eee;
//   color: #333;
// }

// .hotel-address {
//   font-size: 14px;
//   color: #555;
// }

// .hotel-img {
//   width: 100px;
//   height: 70px;
//   object-fit: cover;
//   border-radius: 4px;
// }

// /* Stay Info */
// .stay-info {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-top: 1px solid #eee;
//   border-bottom: 1px solid #eee;
//   padding: 12px 0;
//   margin: 12px 0;
//   font-size: 13px;
// }

// .checkin,
// .checkout {
//   margin-left: 15px;
//   font-size: 18px;
//   display: flex;
//   flex-direction: column;
// }

// .label {
//   font-size: 10px;
//   color: #555;
//   font-weight: bold;
// }

// .night-count {
//   background: #f2f2f2;
//   padding: 4px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   margin-left: 36px;
// }

// .stay-summary {
//   flex: 1;
//   text-align: right;
//   font-weight: bold;
// }

// /* Room Details */
// .room-details {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   font-size: 13px;
// }

// .room-details ul {
//   margin: 4px 0;
//   padding-left: 18px;
// }

// .policy {
//   margin: 4px 0;
//   font-size: 15px;
// }

// .policy-link {
//   color: #0071c2;
//   text-decoration: none;
// }

// .policy-link:hover {
//   text-decoration: underline;
// }

// .see-inclusions {
//   color: #0071c2;
//   font-weight: bold;
//   font-size: 16px;
//   text-decoration: none;
// }



// /* ===========================
//    Responsive Styles
//    =========================== */

// /* Tablet and below */
// @media (max-width: 1024px) {
//   .booking-container {
//     flex-direction: column;
//     gap: 16px;
//     padding: 0 10px;
//   }

//   .left-content,
//   .right-sidebar {
//     flex: 1 1 100%;
//     max-width: 100%;
//   }

//   .price-card,
//   .coupon-card {
//     width: 100%;
//     height: auto;
//   }

//   .stay-info {
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .stay-summary {
//     text-align: left;
//     flex-basis: 100%;
//     margin-top: 8px;
//   }
// }

// /* Mobile and below */
// @media (max-width: 768px) {
//   .header {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//   }

//   .hotel-img {
//     width: 100%;
//     height: auto;
//   }

//   .stay-info {
//     flex-direction: column;
//     align-items: flex-start;
//   }

//   .checkin,
//   .checkout {
//     margin-left: 0;
//     font-size: 16px;
//   }

//   .night-count {
//     margin-left: 0;
//   }

//   .room-details {
//     flex-direction: column;
//     gap: 12px;
//   }

//   .see-inclusions {
//     align-self: flex-start;
//   }
// }

// /* Extra small screens */
// @media (max-width: 480px) {
//   body {
//     font-size: 14px;
//   }

//   .hotel-name {
//     font-size: 18px;
//   }

//   .price-card h4,
//   .coupon-card h4 {
//     font-size: 14px;
//   }

//   .policy {
//     font-size: 13px;
//   }

//   .coupon-input input {
//     font-size: 12px;
//   }

//   .coupon-input button {
//     padding: 0 8px;
//   }
// }

// // form section
// .guest-form {
//   max-width: 781px;
//   margin: auto;
//   padding: 1rem;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0,0,0,0.1);
// }

// h3 {
//   margin-bottom: 1rem;
// }

// .form-group {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1rem;
// }

// .form-row {
//   display: flex;
//   gap: 1rem;
// }

// .form-row .form-group {
//   flex: 1;
// }

// input, select {
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// }

// .checkbox {
//   flex-direction: row;
//   align-items: center;
// }


// .login-section {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #f0f7ff;
//   padding: 0.5rem;
//   border-radius: 4px;
// }

// .login-btn {
//   background: #007bff;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
// }

// .login-btn:hover {
//   background: #0056b3;
// }

// /* Responsive */
// @media (max-width: 600px) {
//   .form-row {
//     flex-direction: column;
//   }
// }
// // 
// .trip-secure-container {
//   font-family: Arial, sans-serif;
//   max-width: 600px;
//   background: white;
//   border-radius: 6px;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.1);
//   padding: 16px;
// }

// .header-banner {
//   background: #e6f8f3;
//   padding: 10px;
//   border-radius: 6px;
//   margin-bottom: 16px;
//   color: #007b66;
//   font-weight: bold;
// }

// .trip-secure-box {
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   padding: 16px;
// }

// .title-section {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .title-section h3 {
//   margin: 0;
// }

// .subtitle {
//   color: #0071c2;
//   margin-top: 4px;
// }

// .logo {
//   width: 90px;
// }

// .benefits-list {
//   margin: 16px 0;
// }

// .benefit {
//   display: flex;
//   justify-content: space-between;
//   padding: 4px 0;
// }

// .more-benefits {
//   color: #0071c2;
//   font-size: 14px;
//   cursor: pointer;
// }

// .price-section {
//   font-size: 16px;
//   margin: 12px 0;
// }

// .price {
//   font-size: 24px;
//   font-weight: bold;
// }

// .small {
//   font-size: 14px;
//   color: #555;
// }

// .gst {
//   font-size: 12px;
//   color: #888;
// }

// .options {
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   margin: 12px 0;
// }

// .success-message {
//   background: #e6f8e6;
//   padding: 8px;
//   border-radius: 6px;
//   color: #007b33;
//   font-weight: bold;
// }

// .agreement {
//   margin: 16px 0;
//   font-size: 14px;
// }

// .agreement a {
//   color: #0071c2;
//   text-decoration: none;
// }

// .pay-now {
//   background: linear-gradient(to right, #0071c2, #005ea1);
//   color: white;
//   border: none;
//   padding: 12px 20px;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   width: 100%;
// }

// .pay-now:hover {
//   background: linear-gradient(to right, #005ea1, #003f73);
// }

// export class CalculatedamountComponent {

//     guest = {
//     title: 'Mr',
//     firstName: '',
//     lastName: '',
//     email: '',
//     countryCode: '+91',
//     mobile: '',
//     hasGST: false
//   };
// }

// *************************************
// hotelsidebar

// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-hotel',
//   templateUrl: './hotel-side.component.html',
//   styleUrls: ['./hotel-side.component.scss'],
//   imports: [CommonModule]
// })
// export class HotelSideComponent {
//   showFilters = false;

//   mainImage = 'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*';
//   images = [
//     'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',
//     'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
//   ];

//   toggleFilters() {
//     this.showFilters = !this.showFilters;
//   }

//   onThumbnailHover(img: string) {
//     this.mainImage = img;
//   }






// }

// //////
// <div class="container">
//   <!-- Sidebar -->
//   <div class="sidebar-wrapper">
//     <div class="sidebar">
//       <!-- <div class="search-box">
//         <input type="text" placeholder="Search for hotel" style="height: 6vh; width: 16vw;">
//       </div> -->

//       <!-- Header + Toggle -->
//       <div class="sidebar-header">
//         <h3>Suggested For You</h3>
//         <button class="toggle-btn" (click)="toggleFilters()">☰</button>
//       </div>

//       <!-- Filters -->
//       <ul class="filter-list" [class.show]="showFilters">
//         <li><label><input type="checkbox"> Last Min Deals</label></li>
//         <li><label><input type="checkbox"> Deals</label></li>
//         <li><label><input type="checkbox"> 5 Star</label></li>
//         <li><label><input type="checkbox"> North Goa</label></li>
//         <li><label><input type="checkbox"> Resorts</label></li>
//         <li><label><input type="checkbox"> Beachfront Properties</label></li>
//         <li><label><input type="checkbox"> Free Cancellation</label></li>
//         <li><label><input type="checkbox"> Villas</label></li>
//         <li><label><input type="checkbox"> Calangute</label></li>
//         <li><label><input type="checkbox"> Coimbatore</label></li>
//         <li><label><input type="checkbox"> Baga</label></li>
//         <li><label><input type="checkbox"> Anjuna</label></li>
//         <li><label><input type="checkbox"> Panjim</label></li>
//         <li><label><input type="checkbox"> South Goa</label></li>
//       </ul>
//     </div>
//   </div>

//   <!-- Cards Section -->
//   <div class="cards-container">
//     <div class="hotel-card" *ngFor="let card of [1]">
//       <div class="left">
//         <img [src]="mainImage" class="main-image" alt="Main Hotel Image" />
//         <div class="thumbnails">
//           <img *ngFor="let img of images" [src]="img" class="thumbnail" (mouseenter)="onThumbnailHover(img)" />
//         </div>
//       </div>
//       <div class="right">
//         <img src="https://promos.makemytrip.com/Hotels_product/Value_Stays/v2/logo/ValueStays-3.png" alt=""
//           style="width: 15%;">
//         <h2>Hotel Radisson Blu</h2>
//         <p><a href="#">Paris</a> | 820 m drive to Calangute B
//         <p><b>Entire Serviced Apartment</b> | 1 Bedroom | Sleeps 4 Guests
//         <p>📍 Located near Baga and Calangute beaches, clean swimming pool, spacious apartments with kitchen facilities
//         </p>
//         <br>
//         <a class="login-link" href="#">Login to Book Now & Pay Later!
// //////
// // .container {
// //   display: flex;
// //   flex-wrap: wrap;
// // }

// // /* Sidebar */
// .sidebar-wrapper {
//   flex: 0 0 250px;
// }

// .sidebar {
//   // width: 20vw;
//   // height: 20px;
//   background-color: #fff;
//   border-right: 1px solid #ddd;
//   padding: 20px;
//   box-sizing: border-box;
//   position: sticky;
//   top: 0;
// }

// .sidebar-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   // margin-top: 20px;
// }

// .toggle-btn {
//   background-color: white;
//   color: black;
//   padding: 6px 12px;
//   font-size: 30px;
//   border: none;
//   border-radius: 20px;
//   cursor: pointer;
//   display: none; /* Shown only on small screen */
// }

// .filter-list {
//   list-style: none;
//   margin-top: 20px;
//   padding-left: 0;
// }

// .filter-list li {
//   margin-bottom: 12px;
//   font-size: 15px;
// }

// .filter-list input {
//   margin-right: 8px;
// }

// /* Cards Container */
// .cards-container {
//   flex: 1;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// }

// /* Hotel Card */
// .hotel-card {
//   display: flex;
//   flex-direction: row;
//   background: #fff;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 16px;
//   gap: 20px;
//   flex-wrap: wrap;
// }

// .left {
//   flex: 1;
// }

// .main-image {
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 8px;
//   margin-bottom: 10px;
// }

// .thumbnails {
//   display: flex;
//   gap: 8px;
//   flex-wrap: wrap;
// }

// .thumbnail {
//   width: 60px;
//   height: 50px;
//   object-fit: cover;
//   border-radius: 4px;
//   cursor: pointer;
// }

// .right {
//   flex: 2;
// }

// .badge {
//   background: #f44336;
//   color: #fff;
//   padding: 3px 8px;
//   font-size: 12px;
//   border-radius: 4px;
// }

// .location {
//   color: #666;
//   font-size: 13px;
// }

// .login-link {
//   // margin-top: 10px;
//   display: block;
//   color: #007bff;
//   font-size: 13px;
// }

// /* ✅ Responsive Styling */
// @media (max-width: 1024px) {
//   .container {
//     flex-direction: column;
//   }

//   .sidebar-wrapper {
//     width: 100%;
//   }

//   .sidebar {
//     height: auto;
//     border-right: none;
//     border-bottom: 1px solid #ddd;
//   }

//   .toggle-btn {
//     display: inline-block;
//   }

//   .filter-list {
//     display: none;
//     flex-direction: column;
//   }

//   .filter-list.show {
//     display: flex;
//   }

//   .cards-container {
//     padding: 10px;
//   }

//   .hotel-card {
//     flex-direction: column;
//   }

//   .left,
//   .right {
//     width: 100%;
//   }
// }

// @media (max-width: 480px) {
//   .main-image {
//     height: 150px;
//   }

//   .thumbnail {
//     width: 50px;
//     height: 40px;
//   }
// }
// *******************************************

// <div class="apartment-container">
//   <!-- Header -->
//   <div class="header-section">
//     <h2 style="margin-left: 10px;"><i class="fa fa-check-circle"></i> Ivy Retreat Apartments Baga</h2>
//     <p style="margin-left: 10px; ">Entire 1 or 2 BHK apartment units featuring a pool, kitchen & Wi-Fi</p>
//   </div>

//   <div class="content-grid">
//     <div class="cards-container">
//       <div *ngFor="let card of [1]" class="card">
//         <div class="right">
//           <img [src]="mainImage" class="main-image" alt="Main Hotel Image" />
//           <div class="thumbnails">
//             <img *ngFor="let img of images" [src]="img" class="thumbnail" (mouseenter)="onThumbnailHover(img)" />
//           </div>
//         </div>

//         <div class="travel-card">
//           <div class="card-image">
//             <img
//               src="https://r1imghtlak.mmtcdn.com/0f00d12b-9701-420b-b944-7cf35bc4d064.jpg?&output-quality=75&crop=520:350;2,0&output-format=jpg&downsize=540:*"
//               alt="Eiffel Tower" />
//           </div>
//           <div class="card-content">
//             <h3>2 Rooms Combo with Free Cancellation</h3>
//             <h6 class="location">Fits 3 Adults</h6>
//             <p class="location">Per night for 2 Rooms:</p>

//             <div style="display: flex;">
//               <h2>₹ 6,598</h2>
//               <sup>+792</sup>
//             </div>


//             <div class="tabs">
//               <button [class.active]="activeTab === 'description'"
//                 (click)="activeTab = 'description'">Description</button>
//               <button [class.active]="activeTab === 'reviews'" (click)="activeTab = 'reviews'">Reviews</button>
//             </div>

//             <div class="tab-content" *ngIf="activeTab === 'description'">
//               <p>
//                 way from the pristine Candolim Beach. The hotel offers well-appointed rooms, contemporary amenities, and
//                 a warm, welcoming ambiance, making it ideal for both leisure and business travelers. Guests can enjoy
//                 delicious dining options.<b style="color: #0D6EFD">...More</b>
//               </p>
//             </div>
//             <div class="tab-content" *ngIf="activeTab === 'reviews'">
//               <div class="rating">
//                 <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
//                 <span class="score">(5.0)</span>
//               </div>
//               <div class="rating">
//                 <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
//                 <span class="score">(4.0)</span>
//               </div>
//               <div class="rating">
//                 <span>⭐</span><span>⭐</span><span>⭐</span>
//                 <span class="score">(3.0)</span>
//               </div>
//             </div>

//             <div class="card-actions">
//               <button class="train">Train Ticket</button>
//               <button class="flight">Flight Ticket</button>
//             </div>
//           </div>
//         </div>


//       </div>
//     </div>


//     <!-- Apartment Info -->
//     <div class="apartment-info">
//       <h4>Entire Serviced Apartment</h4>
//       <div class="info-icons">
//         <span><i class="fa-solid fa-door-open" style="font-size: 25px;"></i><br>1 Bedroom</span>
//         <span style="margin-left: 9rem;"><i class="fa-solid fa-people-group" style="font-size: 25px; "></i> <br>Sleeps 4
//           guests</span>
//       </div>
//       <div class="info-box">
//         <img src="https://promos.makemytrip.com/AltAcco/Education_Icons/Entire.png" alt="Icon">
//         <div class="info-text">
//           <strong>What is an Entire Serviced Apartment?</strong>
//           <p>Get complete access to all bedrooms, living room, kitchen and more, with hotel-like amenities such as
//             Housekeeping, Toiletries, WiFi etc.</p>
//         </div>
//       </div>
//       <p class="description">
//         Experience the best of Goa at this gated property featuring apartments with kitchens, a shared pool & a lush
//         lawn.<b style="color: #008cff;">More</b>
//       </p>
//       <div class="property-section">

//         <!-- Tabs -->
//         <div class="tabs">
//           <div class="tab active">
//             <img src="https://img.icons8.com/ios-filled/50/4a90e2/building.png" class="tab-icon" />
//             <span>Property Highlights</span>
//           </div>
//           <div class="tab">
//             <img src="https://img.icons8.com/ios-filled/50/4a90e2/around-the-globe.png" class="tab-icon" />
//             <span>Activities & Nearby Attractions</span>
//           </div>
//         </div>

//         <!-- Amenities -->
//         <div class="amenities">
//           <h3 class="amenities-title">Amenities</h3>
//           <p class="amenities-subtitle"><img src="https://promos.makemytrip.com/altaccoimages/ugc/ugc_amenities2.webp"
//               alt="" style="width: 20px;">
//             Amenities rated <span class="highlight">3.8</span> by guests
//           </p>

//           <div class="amenities-list">
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/swimming-pool.png" />
//               <span>Swimming Pool</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://promos.makemytrip.com/images/highlighted/caretaker.png" />
//               <span>Caretaker</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/broom.png" />
//               <span>Housekeeping</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/wifi.png" />
//               <span>Free Wi-Fi</span>
//             </div>
//             <div class="amenity-item">
//               <span class="checkmark">✔</span>
//               <span>Elevator/Lift</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/washing-machine.png" />
//               <span>Washing Machine</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/kitchen-room.png" />
//               <span>Kitchenette</span>
//             </div>
//             <div class="amenity-item">
//               <img src="https://img.icons8.com/ios-filled/50/999999/sofa.png" />
//               <span>Living Room</span>
//             </div>
//             <div class="amenity-item">
//               <span class="checkmark">✔</span>
//               <span>Dining Area</span>
//             </div>
//             <div class="amenity-item">
//               <span class="checkmark">✔</span>
//               <span>Paid Public Parking</span>
//             </div>
//           </div>

//           <a href="#" class="more-link">+ More Amenities</a>
//         </div>

//         <!-- Login Box -->
//         <div class="login-box">
//           <h4>Login to unlock deals & manage your bookings!</h4>
//           <div class="login-form">
//             <label>Mobile Number</label>
//             <div class="input-row">
//               <span class="country-code">+91</span>
//               <input type="text" placeholder="Enter mobile number" />
//               <button style="margin-left: 10px; width: 9rem; height: 2rem;">Login now</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div> 



// .apartment-container {
//   margin-top: 30rem;
//   font-family: Arial, sans-serif;
//   background: #fff;
//   padding: 20px;
//   border-radius: 12px;
//   max-width: 1200px;
//   margin: auto;
//   box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
// }

// .header-section h2 {
//   margin: 0;
//   font-size: 22px;
// }

// .header-section p {
//   color: #555;
//   margin: 5px 0 20px;
// }

// /* Grid Layout */
// .content-grid {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
// }

// /* Left Panel */
// .left-panel {
//   flex: 2;
//   min-width: 60%;
// }

// .photo-grid {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// }

// .photo-card {
//   position: relative;
//   flex: 1;
// }

// .photo-card img {
//   width: 100%;
//   height: 140px;
//   object-fit: cover;
//   border-radius: 10px;
// }

// .photo-label {
//   position: absolute;
//   bottom: 6px;
//   left: 6px;
//   background: rgba(0, 0, 0, 0.6);
//   color: #fff;
//   font-size: 13px;
//   padding: 4px 8px;
//   border-radius: 6px;
// }

// .apartment-info {
//   border-top: 1px solid #ddd;
//   width: 99%;
//   margin-top: 20px;
// }

// .apartment-info h4 {
//   margin-top: 10px;
//   font-size: 18px;
//   margin-bottom: 10px;
// }

// .info-icons {
//   display: flex;
//   gap: 20px;
//   margin-bottom: 15px;
//   font-size: 14px;
//   color: #333;
// }

// .info-box {
//   display: flex;
//   align-items: flex-start;
//   background: #f0f6ff;
//   border-radius: 8px;
//   padding: 12px;
//   gap: 12px;
// }

// .info-box img {
//   width: 35px;
//   height: 35px;
//   flex-shrink: 0;
// }

// .info-text strong {
//   color: #4a4a4a;
//   font-size: 14px;
//   font-weight: 700;
//   display: block;
//   margin-bottom: 6px;
// }

// .info-text p {
//   color: #4a4a4a;
//   font-size: 15px;
//   margin: 0;
// }

// .description {
//   margin-top: 10px;
//   font-size: 14px;
//   color: #444;
//   margin-bottom: 15px;
// }

// .highlight-buttons {
//   cursor: pointer;
//   display: flex;
//   gap: 10px;
// }

// .highlight-btn {
//   background: rgb(237, 246, 255);
//   border: none;
//   color: #007bff;
//   padding: 6px 12px;
//   border-radius: 4px;
//   font-size: 14px;
//   cursor: pointer;
// }

// /* Right Panel */
// .right-panel {
//   flex: 1;
//   min-width: 320px;
//   background: #fff;
//   padding: 15px;
//   border-radius: 10px;
//   border: 1px solid #ddd;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// }

// .room-info-card {
//   border: 1px solid gray;
//   background: linear-gradient(135deg, #fdfbfb, #ebedee);
//   border-radius: 12px;
//   padding: 20px;
//   box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
//   font-family: Arial, sans-serif;
//   max-width: 450px;
//   height: 320px;
// }

// .room-info-card h2 {
//   font-size: 20px;
//   font-weight: 700;
//   color: #2c3e50;
//   margin-bottom: 8px;
// }

// .room-info-card .fits {
//   font-size: 14px;
//   color: #555;
//   margin-bottom: 14px;
// }

// .room-info-card .room-features {
//   list-style: none;
//   padding: 0;
//   margin-bottom: 16px;
// }

// .room-info-card .room-features li {
//   position: relative;
//   padding-left: 20px;
//   font-size: 14px;
//   color: #444;
//   margin-bottom: 6px;
// }

// .room-info-card .room-features li::before {
//   // content: "X";
//   position: absolute;
//   left: 0;
//   // color: red;
//   font-size: 13px;
// }

// .price-section {
//   margin-bottom: 14px;
// }

// .price-old {
//   text-decoration: line-through;
//   color: #888;
//   font-size: 14px;
// }

// .price-new {
//   font-size: 20px;
//   font-weight: bold;
//   color: black;
// }

// .price-new .tax-info {
//   font-size: 13px;
//   color: #666;
// }

// .button-63 {
//   background: linear-gradient(90deg, #ff7e5f, #feb47b);
//   border: none;
//   color: white;
//   padding: 10px 18px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: bold;
//   transition: 0.3s;
// }

// .button-63:hover {
//   background: linear-gradient(90deg, #ff6a4d, #fea45a);
// }

// // .more-options {
// //   display: flex;
// //   margin-right: rem;
// //   font-size: 13px;
// //   color: #0071c2;
// //   text-decoration: none;
// // }

// .more-options:hover {
//   text-decoration: underline;
// }

// /* Card Container */
// .cards-container {
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// }

// .card {
//   width: 70rem;
//   display: flex;
//   align-items: flex-start;
//   gap: 20px;
//   // border: 1px solid #ddd;
//   // border-radius: 6px;
//   background: #fff;
//   padding: 16px;
// }

// /* IMAGE SECTION */
// .right {
//   flex: 1;
// }

// .main-image {
//   margin-left: -25px;
//   // margin-right: 0rem;
//   width: 55%;
//   height: 220%;
//   object-fit: cover;
//   border-radius: 10px;
// }

// .thumbnails {
//   // margin-right: 33px;
//   display: flex;
//   gap: 8px;
//   margin-top: 8px;
// }

// .thumbnail {
//   // gap: 20px;
//   // margin-left: -24px;
//   width: 8rem;
//   height: 6rem;
//   object-fit: cover;
//   border-radius: 4px;
//   cursor: pointer;
//   border: 1px solid #ccc;
// }

// .thumbnail:hover {
//   border-color: #0071c2;
// }

// /* ROOM INFO SECTION */
// .left {
//   width: 20rem;
//   flex: 1;
//   padding: 20px;
//   height: 18rem;
//   border: 1px solid lightgray;
//   border-radius: 14px;
// }

// .fits {
//   font-size: 13px;
//   color: #555;
// }

// // button

// .button-63 {
//   align-items: center;
//   background-image: linear-gradient(92deg, #53b2fe, #0652f3);
//   border: 0;
//   border-radius: 8px;
//   box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
//   box-sizing: border-box;
//   color: #ffffff;
//   display: flex;
//   font-family: Phantomsans, sans-serif;
//   font-size: 20px;
//   justify-content: center;
//   line-height: 1em;
//   max-width: 100%;
//   min-width: 140px;
//   padding: 10px 18px;
//   text-decoration: none;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
//   white-space: nowrap;
//   cursor: pointer;
// }

// .button-63:active,
// .button-63:hover {
//   outline: 0;
// }

// @media (min-width: 768px) {
//   .button-63 {
//     margin-left: 8rem;
//     font-size: 16px;
//     min-width: 170px;
//   }
// }

// .rating-location-box {
//   margin-left: -15px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 12px;
//   margin-top: 5rem;
//   background: linear-gradient(135deg, #fdfbfb, #ebedee);

//   width: 35rem;
// }

// .rating-section {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

// .rating-score {
//   background: #1e4d92;
//   color: #fff;
//   font-size: 18px;
//   font-weight: bold;
//   padding: 10px 10px;
//   border-radius: 6px;
// }

// .rating-text {
//   flex: 1;
//   margin-left: 10px;
// }

// .rating-label {
//   font-weight: bold;
//   color: #1e4d92;
//   font-size: 15px;
// }

// .rating-count {
//   font-size: 13px;
//   color: #666;
//   margin-left: 4px;
// }

// .rating-link {
//   font-size: 13px;
//   color: #0071c2;
//   text-decoration: none;
// }

// .rating-link:hover {
//   text-decoration: underline;
// }

// .location-section {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 10px;
// }

// .location-icon {
//   width: 30px;
//   height: 30px;
// }

// .location-text {
//   flex: 1;
//   margin-left: 10px;
// }

// .location-title {
//   font-weight: bold;
//   display: block;
// }

// .location-desc {
//   font-size: 13px;
//   color: #666;
// }

// .location-link {
//   font-size: 13px;
//   color: #0071c2;
//   text-decoration: none;
// }

// .location-link:hover {
//   text-decoration: underline;
// }

// // ameneties
// .property-section {
//   font-family: Arial, sans-serif;
// }

// /* Tabs */
// .tabs {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 16px;
// }

// .tab {
//   display: flex;
//   align-items: center;
//   border: 1px solid #cce4ff;
//   background: #f0f8ff;
//   border-radius: 6px;
//   padding: 6px 12px;
//   cursor: pointer;
// }

// .tab.active {
//   background: #e6f2ff;
// }

// .tab-icon {
//   width: 18px;
//   height: 18px;
//   margin-right: 6px;
// }

// /* Amenities */
// .amenities-title {
//   font-size: 18px;
//   margin-bottom: 4px;
// }

// .amenities-subtitle {
//   font-size: 14px;
//   color: #666;
//   margin-bottom: 10px;
// }

// .highlight {
//   color: #0071c2;
//   font-weight: bold;
// }

// .amenities-list {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 14px 28px;
//   margin-bottom: 10px;
// }

// .amenity-item {
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   color: #333;
// }

// .amenity-item img {
//   width: 20px;
//   height: 20px;
//   margin-right: 6px;
// }

// .checkmark {
//   color: green;
//   font-weight: bold;
//   margin-right: 6px;
// }

// .more-link {
//   color: #0071c2;
//   text-decoration: none;
//   font-size: 14px;
// }

// /* Login Box */
// .login-box {
//   border: 1px solid #cce4ff;
//   background: #f0f8ff;
//   border-radius: 6px;
//   padding: 14px;
//   margin-top: 18px;
// }

// .login-box h4 {
//   font-size: 15px;
//   margin-bottom: 10px;
// }

// .login-form label {
//   font-size: 14px;
//   display: block;
//   margin-bottom: 4px;
// }

// .input-row {
//   // height: 20rem;
//   width: 100%;
//   display: flex;
//   align-items: center;
// }

// .country-code {
//   padding: 8px;
//   background: white;
//   border: 1px solid #ccc;
//   border-radius: 4px 0 0 4px;
// }

// .input-row input {
//   flex: 1;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-left: none;
// }

// .input-row button {
//   background: #0071c2;
//   color: white;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 0 4px 4px 0;
//   cursor: pointer;
// }

// .input-row button:hover {
//   background: #005fa3;
// }
// // sidebar
// .travel-card {
//   height: 100%;
//   width: 350px;
//   background: white;
//   border-radius: 15px;
//   overflow: hidden;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   font-family: Arial, sans-serif;
// }

// .card-image img {
//   width: 100%;
//   height: 200%;
//   object-fit: cover;
// }

// .card-content {
//   padding: 15px;
// }

// .location {
//   color: gray;
//   font-size: 14px;
//   margin: 2px 0;
// }

// .rating {
//   margin: 5px 0;
//   color: gold;
// }

// .rating .score {
//   color: #555;
//   margin-left: 5px;
// }

// .tabs {
//   display: flex;
//   margin-top: 10px;
//   border-bottom: 1px solid #eee;
// }

// .tabs button {
//   flex: 1;
//   padding: 8px;
//   background: none;
//   border: none;
//   border-bottom: 2px solid transparent;
//   cursor: pointer;
//   font-weight: bold;
// }

// .tabs button.active {
//   border-bottom: 2px solid #007bff;
//   color: #007bff;
// }

// .tab-content {
//   font-size: 14px;
//   color: #444;
//   margin-top: 8px;
// }

// .card-actions {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 15px;
// }

// .card-actions button {
//   flex: 1;
//   padding: 8px;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   font-weight: bold;
// }

// .card-actions .train {
//   background: #e0e0e0;
// }

// .card-actions .flight {
//   background: #007bff;
//   color: white;
//   margin-left: 5px;
// }   

// export class BookingpageComponent {



//   showFilters = false;

//   mainImage = 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410211734063978-3075721f-29bd-42d6-ae75-ac8bfb9fea77.jpg';
//   images = [
//     'https://r1imghtlak.mmtcdn.com/0f00d12b-9701-420b-b944-7cf35bc4d064.jpg?&output-quality=75&crop=520:350;2,0&output-format=jpg&downsize=540:*',
//     'https://r1imghtlak.mmtcdn.com/2d382902-8cb2-49f3-9d60-ecb7572deb44.jpg',
//     'https://r1imghtlak.mmtcdn.com/887a2539-a471-45d1-ad8d-5643260068f7.jpg',
//     'https://r1imghtlak.mmtcdn.com/458ac9f7-6cb7-4d43-a011-b365669e18b0.jpeg'

//   ];

//   toggleFilters() {
//     this.showFilters = !this.showFilters;
//   }

//   onThumbnailHover(img: string) {
//     this.mainImage = img;
//   }


//   activeTab: 'description' | 'reviews' = 'description';
// }