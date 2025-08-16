import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotelroominfo',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotelroominfo.component.html',
  styleUrl: './hotelroominfo.component.scss'
})
export class HotelroominfoComponent {

  showFilters = false; mainImage = 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410211734063978-3075721f-29bd-42d6-ae75-ac8bfb9fea77.jpg';
   images = ['https://r1imghtlak.mmtcdn.com/0f00d12b-9701-420b-b944-7cf35bc4d064.jpg?&output-quality=75&crop=520:350;2,0&output-format=jpg&downsize=540:*', 
    'https://r1imghtlak.mmtcdn.com/2d382902-8cb2-49f3-9d60-ecb7572deb44.jpg',
     'https://r1imghtlak.mmtcdn.com/887a2539-a471-45d1-ad8d-5643260068f7.jpg', 
     ];
   toggleFilters() { this.showFilters = !this.showFilters; } 
   onThumbnailHover(img: string) { this.mainImage = img; }
    activeTab: 'description' | 'reviews' = 'description';
}
