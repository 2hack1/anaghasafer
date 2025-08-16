import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule , RouterLink],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit {
  showFilters = false;
  execthotelRooms: any[] = [];
  combohotelRooms: any[] = [];

  maincomboImage = 'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*';
  
  comboimages = [
    'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    
  ];
  
  mainImage = 'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*';
  images = [
    'https://r1imghtlak.mmtcdn.com/b80a4f9e32df11eb984b0242ac110002.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    'https://r1imghtlak.mmtcdn.com/010191f275a611ed91930a58a9feac02.jfif?output-quality=75&output-format=jpg&downsize=360:*',
    
  ];

  hotel = {
    destination: "gwalior",
    checkIn: "",
    checkOut: "",
    extra: {
      rooms: 1,
      adults: 1,
      childrens: 1,
      guests: 1
    }
  }
  destination = ['gwalior', 'indore', 'bhopal'];

  constructor(private route: ActivatedRoute, private service: AxiosService) { }

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
        this.combohotelRooms = res.data.non_matched_rooms
    // remove records with calculated_needed_rooms == 1
    .filter((room: any) => room.calculated_needed_rooms !== 1)
    // map for main image
    .map((room: any) => ({
      ...room,
      mainImageUrlcombo: room.room?.rooms_image?.[0] || ''
    }));
      }).catch((err: any) => {
        console.log("err", err);
      })
      this.service.getHotelRoomsWithExact(filter).then((res: any) => {
        console.log("res exact", res.data.rooms)
        this.execthotelRooms = res.data.rooms;
        this.execthotelRooms = res.data.rooms.map((room: any) => ({
          ...room,
          mainImage: room.rooms_image?.[0] || '' // take first image as main
        }));
      }).catch((err: any) => {
        console.log("err", err);
      })
    });


  }



  // limitedImages = this.images.slice(0, 8);



  closeAllModal() {

    $('.dropdown-modal').each(function () {
      $(this).hide();
    });
  }

  onSeeMoreClick() {
    alert('Show more images in a modal or gallery view');
  }

  onSeeMoreClickcombo() {
    alert('Show more images in a modal or gallery view');
    }
      toggleFilters() {

    this.showFilters = !this.showFilters;

  }

  onThumbnailHover(img: string, room: any) {
    room.mainImageUrl = img;
  }
  onThumbnailHovercombo(img: string, room: any) {
    room.mainImageUrlcombo = img;
  }
  



 

toggleAmenities(card: any) {
    card.showAllAmenities = !card.showAllAmenities;
  }

}
