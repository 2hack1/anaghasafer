import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit {
  showFilters = false;
  mainImage = 'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*';
  images = [
    'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',

  ];

  constructor( private route:ActivatedRoute, private service:AxiosService) { }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
  const filter = {
    city: params['city'],
    checkin: params['checkin'],
    checkout: params['checkout'],
    adults: params['adults'],
    children: params['children'],
    rooms: params['rooms'],
    min_price: params['min_price'],
    max_price: params['max_price']
  };
  
  this.service.getHotelRoomsWithCombo(filter).then((res: any) => {
              console.log("res Combo", res.data.non_matched_rooms)
          }).catch((err: any) => {
              console.log("err", err);
          })
            this.service.getHotelRoomsWithExact(filter).then((res: any) => {
                console.log("res exact", res.data.rooms)
            }).catch((err: any) => {
                console.log("err", err);
            })

});


  }



limitedImages = this.images.slice(0, 8);



onSeeMoreClick() {
  alert('Show more images in a modal or gallery view');
}
  toggleFilters() {

    this.showFilters = !this.showFilters;

  }

  onThumbnailHover(img: string) {

    this.mainImage = img;
  
  }


}
