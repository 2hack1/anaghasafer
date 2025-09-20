import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { trigger, animate, style, state, transition } from "@angular/animations"
import { Router, RouterLink } from '@angular/router';
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
  constructor(private us_: UserServicesService,private route:Router) { }
  isLogin = false

  isHidden = false;
  lastScrollTop = 0;

  name: string = 'Kapil Agrawal';
  firstLetter: string = '';
   bgColor: string = '';


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
  this.firstLetter = this.name.charAt(0).toUpperCase();
  this.bgColor = this.getColorForLetter(this.firstLetter);

    this.us_.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.us_.logout();
    this.isProfileMenuOpen= false;
  }

  openLoginModal() {
    this.isLogin = true;
  }


getColorForLetter(letter: string): string {
  const colors: { [key: string]: string } = {
    A: '#FF5733', B: '#33B5FF', C: '#28A745', D: '#FFC300', E: '#9B59B6',
    F: '#E74C3C', G: '#1ABC9C', H: '#F39C12', I: '#2ECC71', J: '#8E44AD',
    K: '#3498DB', L: '#E67E22', M: '#16A085', N: '#C0392B', O: '#2980B9',
    P: '#D35400', Q: '#27AE60', R: '#8E44AD', S: '#34495E', T: '#F1C40F',
    U: '#7F8C8D', V: '#E84393', W: '#00CEC9', X: '#6C5CE7', Y: '#D63031',
    Z: '#0984E3'
  };
  return colors[letter] || '#666'; // Default gray if not found
}


 
  
    userName = sessionStorage.getItem('name'); 
    
    userEmail =sessionStorage.getItem('email');


    // if(sessionStorage.getItem('email') &&sessionStorage.getItem('p') )
     isProfileMenuOpen = false; 
    toggleProfileMenu() {
       this.isProfileMenuOpen = !this.isProfileMenuOpen; 
      }
       goToProfile() {
        //  console.log('Navigating to profile...'); 
        
            const userId = sessionStorage.getItem('userid');

 this.isProfileMenuOpen=false;
// Encrypt the ID
const encryptedId = btoa(userId!); // Base64 encode

// Navigate with the encrypted ID as a route param
this.route.navigate(['/profile', encryptedId]);
       } 
       goToSettings() { 
        // console.log('Navigating to settings...'); 

       } 






}

