import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-particular-hotel-room-data',
  imports: [CommonModule,FormsModule],
  templateUrl: './particular-hotel-room-data.component.html',
  styleUrl: './particular-hotel-room-data.component.scss'
})
export class ParticularHotelRoomDataComponent {
    guest = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    hasGST: false
  };

}
