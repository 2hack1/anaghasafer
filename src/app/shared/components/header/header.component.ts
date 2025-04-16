import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class HeaderComponent {
  isLogin = false

}
