import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

  selectedTab = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
