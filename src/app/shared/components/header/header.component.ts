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