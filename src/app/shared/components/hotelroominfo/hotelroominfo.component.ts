import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { error } from 'jquery';
import { query } from '@angular/animations';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-hotelroominfo',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotelroominfo.component.html',
  styleUrl: './hotelroominfo.component.scss'
})
export class HotelroominfoComponent implements OnInit {
  // this is for prive calculated
   totalnight:any;
 // this is for prive calculated
  combo_check: any;
  filter: any;
  combo: boolean = false;
  exact: boolean = true;
  notfound: boolean = false;
  showFilters = false;
  requirerooms: any;
  combovalue: any;
  exactvalue: any;
  amenities: string[] = [];
  pertions: any;
  child: any;
  available: boolean = false;
  totelroom: any;
  mainImage = 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202410211734063978-3075721f-29bd-42d6-ae75-ac8bfb9fea77.jpg';

  images = ['https://r1imghtlak.mmtcdn.com/0f00d12b-9701-420b-b944-7cf35bc4d064.jpg?&output-quality=75&crop=520:350;2,0&output-format=jpg&downsize=540:*',
    'https://r1imghtlak.mmtcdn.com/2d382902-8cb2-49f3-9d60-ecb7572deb44.jpg',
    'https://r1imghtlak.mmtcdn.com/887a2539-a471-45d1-ad8d-5643260068f7.jpg',
  ];
  env = environment
  toggleFilters() { this.showFilters = !this.showFilters; }

  onThumbnailHover(img: string) { this.mainImage = img; }
  activeTab: 'description' | 'reviews' = 'description';

  hotelimageCombo: any;
  hotelimageExact: any;

  constructor(private route: ActivatedRoute, private service: AxiosService, private router: Router) {


    this.route.queryParamMap.subscribe(query => {
      this.pertions = query.get('adults');
      this.child = query.get('childrens');
      this.calculateDays(query.get('check_in_date'),query.get('check_out_date'))
      if (query.get('combo')) {
        const hotelid = query.get('hotel_vendor_id');
        const room_id = query.get('hotel_roomId')
        this.filter = {
          check_in_date: query.get('check_in_date'),
          check_out_date: query.get('check_out_date'),
          rooms_required: query.get('rooms_required'),
          roomType: query.get('roomType'),
          hotel_roomId: query.get('hotel_roomId'),
          hotel_vendor_id: query.get('hotel_vendor_id'),
          childrens: query.get('childrens'),
          adults: query.get('adults'),
        };

        this.service.checavailability(this.filter).then((res: any) => {
          const availlibllity = res.data;
          const comboavailable = availlibllity.available;

          if (comboavailable) {
            this.available = true;

          } else {
            this.available = false;

          }


          // console.log("availablity check:", comboavailable)

          this.requirerooms = availlibllity.require_room
          
          // console.log("availability", availlibllity.require_room)
          console.log("availability", this.requirerooms)
          // sessionStorage.setItem('roomtype',this.requirerooms);
          // endcrpt 
          sessionStorage.setItem(
  'roomtype',
  btoa(unescape(encodeURIComponent(JSON.stringify(this.requirerooms))))
);

        }).catch((err: any) => {
          console.error(err);
        });

        this.service.getinfo(hotelid, room_id).then((res: any) => {

          this.combovalue = res.data.data;
          this.amenities = this.combovalue.amenities;
          this.combo = true;
          this.exact = false;
          console.log("this.combovalue:", this.combovalue)
          console.log("this.combovalue.basePrice:", this.combovalue.basePrice)
          this.hotelimageCombo = this.combovalue.hotel.hotel_images[0];
          // this.service.basePrice=this.combovalue.basePrice*this.requirerooms
          // this.service.basePrice=this.combovalue.basePrice
          if (!this.exactvalue) {
            const charges = parseFloat(this.combovalue?.cancellation_charges || "0");
            if (charges === 0) {
              this.combo_check = "with Free Cancellation";
              // console.log("charges",charges)
            } else {
              this.combo_check = "with More features";
              //  console.log("charges",charges)
            }     // run this

          } else {
            const charges = parseFloat(this.exactvalue?.cancellation_charges || "0");
            if (charges === 0) {
              this.combo_check = "with Free Cancellation";
              // console.log("charges",charges)
            } else {
              this.combo_check = "with More features";
              //  console.log("charges",charges)
            }
          }




          if (this.combovalue.rooms_image) {
            // console.log("infor id base:")
            this.mainImage = this.combovalue.rooms_image[0]; // first image as main
            this.images = this.combovalue.rooms_image;       // thumbnails list
          }

        }).catch((err: any) => {
          console.error(err)
          this.notfound = true;
        })

        // console.log("lsdjfj",this.filter)
      } else {
        // run thsi

        const hotelid = query.get('hotel_vendor_id');
        const room_id = query.get('hotel_roomId')
 this.calculateDays(query.get('check_in_date'),query.get('check_out_date'))
        this.filter = {
          check_in_date: query.get('check_in_date'),
          check_out_date: query.get('check_out_date'),
          rooms_required: query.get('rooms_required'),
          roomType: query.get('roomType'),
          hotel_roomId: query.get('hotel_roomId'),
          hotel_vendor_id: query.get('hotel_vendor_id'),
          childrens: query.get('childrens'),
          adults: query.get('adults'),

        };

        this.service.checavailability(this.filter).then((res: any) => {
          const availability = res.data;
          const exactavailable = availability.available;
          this.totelroom = availability.totalRooms;
          //  console.log("totelroom", this.totelroom);
          if (exactavailable) {
            this.available = true;

          } else {
            this.available = false;

          }
          // console.log("availablity check:", exactavailable);
          this.requirerooms = availability.require_room
          // console.log("availability", availability);



        }).catch((err: any) => {
          console.error(err);

        });

        this.service.getinfo(hotelid, room_id).then((res: any) => {

          this.exactvalue = res.data.data;
          this.amenities = this.exactvalue.amenities;
          this.combo = false;
          this.exact = true;
          console.log("this.exactvalue:", this.exactvalue)
          this.hotelimageExact = this.exactvalue.hotel.hotel_images[0].url;
          const charges = parseFloat(this.exactvalue?.cancellation_charges || "0");

          if (charges === 0) {
            this.combo_check = "with Free Cancellation";
          } else {
            this.combo_check = "with features";
          }
          if (this.exactvalue.rooms_image) {
            this.mainImage = this.exactvalue.rooms_image[0]; // first image as main
            this.images = this.exactvalue.rooms_image;       // thumbnails list
          }

        }).catch((err: any) => {
          console.error(err)
          this.notfound = true
        })
      }

    })


  }
  comboRender(roomtype:any) {
    // this.service.roomtype=roomtype;

    sessionStorage.setItem('type',roomtype)

    console.log('room type check', roomtype)
    console.log("required", this.requirerooms);
    // console.log("smnfdkdsnkjfn",this.totelroom )    
    this.router.navigate(['/paricular-hotel-room-data',], {
      queryParams: {
        hotel_vendor_id: this.filter.hotel_vendor_id,
        hotel_roomId: this.filter.hotel_roomId,
        roomType: this.filter.roomType,
        check_in_date: this.filter.check_in_date,
        check_out_date: this.filter.check_out_date,
        rooms: this.filter.rooms_required,
        adutls: this.filter.adults,
        children: this.filter.childrens,
        avrooms: this.totelroom
      }
    })
    // console.log('its working');
  }

  ngOnInit(): void {


  }


  // Example amenities coming from backend

  // Amenity-to-icon mapping
  amenityIcons: { [key: string]: string } = {
    "AC / Non-AC": "https://img.icons8.com/ios-filled/50/999999/air-conditioner.png",
    "Free Wi-Fi": "https://img.icons8.com/ios-filled/50/999999/wifi.png",
    "TV": "https://img.icons8.com/ios-filled/50/999999/tv.png",
    "Room Service": "https://image.flaticon.com/icons/png/512/1569/1569695.png",
    "Attached Bathroom": "https://img.icons8.com/ios-filled/50/999999/bath.png",
    "Mini Bar": "https://img.icons8.com/ios-filled/50/999999/cocktail.png",
    "Safe Locker": "https://img.icons8.com/ios-filled/50/999999/safe.png",
    "Work Desk": "https://img.icons8.com/ios-filled/50/999999/desk.png",
    "Balcony": "https://img.icons8.com/ios-filled/50/999999/balcony.png",
    "Smoking Allowed": "https://img.icons8.com/ios-filled/50/999999/cigarette.png",
    "Pets Allowed": "https://img.icons8.com/ios-filled/50/999999/dog.png",
    "Swimming Pool": "https://img.icons8.com/ios-filled/50/999999/swimming-pool.png",
    "Caretaker": "https://promos.makemytrip.com/images/highlighted/caretaker.png",
    "Housekeeping": "https://img.icons8.com/ios-filled/50/999999/broom.png",
    "Elevator/Lift": "https://img.icons8.com/ios-filled/50/999999/elevator.png",
    "Washing Machine": "https://img.icons8.com/ios-filled/50/999999/washing-machine.png",
    "Kitchenette": "https://img.icons8.com/ios-filled/50/999999/kitchen-room.png",
    "Living Room": "https://img.icons8.com/ios-filled/50/999999/sofa.png",
    "Dining Area": "https://img.icons8.com/ios-filled/50/999999/dining-room.png",
    "Paid Public Parking": "https://img.icons8.com/ios-filled/50/999999/parking.png"
  };

  // Example: when you fetch from backend

  // assume you got amenities from API



  email: string = '';
  password: string = '';
  loading: boolean = false;

  login() {

    if (this.email && this.password) {
      this.loading = true;
      // apicall
      setTimeout(() => {
        // console.log('Email:', this.email);
        // console.log('Password:', this.password);

        this.loading = false;
        alert('not match try again');
      }, 1000); // FAKE TWO SECOND DELAY

    } else {
      alert('fill both field');
    }
    // show spinner

    // Simulate API call

  }


   calculateDays(checkin: any, checkout: any) {
  const start = new Date(checkin);
  const end   = new Date(checkout);

  // Difference in milliseconds
  const diff = end.getTime() - start.getTime();

  // Convert to days
  this.totalnight = diff / (1000 * 60 * 60 * 24);
  console.log("diffrence",this.totalnight)
}

}
