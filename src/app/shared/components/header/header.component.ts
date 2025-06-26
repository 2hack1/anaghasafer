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
