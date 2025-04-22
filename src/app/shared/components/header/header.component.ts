import { CommonModule } from '@angular/common';
import { Component, OnInit,HostListener } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { trigger, animate, style, state, transition } from "@angular/animations"

@Component({
  selector: 'app-header',
  imports: [CommonModule, LoginComponent],
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
  isLogin = false

  isHidden = false;
  lastScrollTop = 0;

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


  ngOnInit(): void {
    document.body.addEventListener('scroll', (event) => {
      console.log(event)
    })
  }
}
