import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent {
  showFilters = false;

  mainImage = 'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*';
  images = [
    'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
  ];

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onThumbnailHover(img: string) {
    this.mainImage = img;
  }
}
