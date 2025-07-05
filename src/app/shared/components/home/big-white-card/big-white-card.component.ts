import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-big-white-card',
  imports: [CommonModule],
  templateUrl: './big-white-card.component.html',
  styleUrl: './big-white-card.component.scss'
})
export class BigWhiteCardComponent {
  hotel = {
    destination: "Gwalior",
    checkIn: "",
    checkOut: "",
    extra: {
      rooms: 1,
      adults: 1,
      childrens: 1,
      guests: 1
    }
  }


  closeAllModal() {
    $('.dropdown-modal').each(function () {
      $(this).hide();
    });
  }

  openThisAssociatedModal() {

  }
}
