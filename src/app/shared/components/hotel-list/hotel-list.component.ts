import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule,  FormsModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit {
  originalParams: any = {}; 
  showFilters = false;
  execthotelRooms: any[] = [];
  combohotelRooms: any[] = [];
  room:any;

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


  constructor(private route: ActivatedRoute, private service: AxiosService, private router: Router) { }

  ngOnInit(): void {

    window.addEventListener('scroll', this.onScroll, true);
    this.route.queryParams.subscribe(params => {
      this.originalParams = { ...params }; // ✅ store original params
       localStorage.setItem('adults',this.originalParams.adults);
       localStorage.setItem('children',this.originalParams.children);
        this.room =this.originalParams.children
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

  rendercombo(hotelid: any, roomid: any, calculate_rooms: any,roomtype:any) {

    // this.service.hotelId = hotelid;
    // this.service.roomId = roomid;
    // this.service.room = calculate_rooms;
    
    console.log("combo data:", hotelid, roomid, calculate_rooms,roomtype);
    this.router.navigate(['/room-info',],{
      queryParams:{
         combo: 'combo',
      hotel_vendor_id: hotelid,
      hotel_roomId: roomid,
      roomType: roomtype,
      check_in_date:this.originalParams.checkin,
      check_out_date:this.originalParams.checkout,
      rooms_required: calculate_rooms
    }

    });

  }
  rendervalue(roomid: any, roomType: any, hotelid: any) {
    this.router.navigate(['/room-info',], {
      queryParams: {
        check_in_date: this.originalParams.checkin,
        check_out_date: this.originalParams.checkout,
        rooms_required: this.originalParams.rooms,
        roomType: roomType,
        hotel_roomId: roomid,
        hotel_vendor_id: hotelid
      }

    });

  }

  ngOnDestroy() { window.removeEventListener('scroll', this.onScroll, true); } onScroll = () => { 
    const header = document.querySelector('.sticky-header'); 
    if (window.scrollY > 0) { header?.classList.add('scrolled');
      
    } else { header?.classList.remove('scrolled'); } };




  closeAllModal() {

    $('.dropdown-modal').each(function () { $(this).hide(); });
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


  // *************************** changes 16-08-2025*************************

  priceOptions = [{ value: '0-1500', label: '₹ 0 – ₹1,500', selected: false },
  { value: '1500-6000', label: '₹1,500 – ₹6,000', selected: false },
  { value: '4000-7000', label: '₹4,000 – ₹7,000', selected: false },
  { value: '7000-12000', label: '₹7,000 – ₹12,000', selected: false },
  { value: '12000-15000', label: '₹12,000 – ₹15,000', selected: false },
  { value: '15000-20000', label: '₹15,000 – ₹20,000', selected: false },
  { value: '20000-25000', label: '₹20,000 – ₹25,000', selected: false },
  { value: '25000+', label: '₹25,000+', selected: false },];
  placeTypes = ['Hotel', 'Apartment', 'Resort', 'Homestay', 'Villa'];
  selectedPrices: string[] = [];
  selectedPlaceType: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // onSelectPrice(option: any) {
  //   option.selected = !option.selected;
  //   if (option.selected) {
  //     this.selectedPrices.push(option.value);
  //   } else {
  //     this.selectedPrices = this.selectedPrices.filter(v => v !== option.value);
  //   }
  //   // Update min and max price 
  //   if (this.selectedPrices.length > 0) {
  //     const allNumbers = this.selectedPrices.flatMap(v => v.split('-')
  //       .map(n => parseInt(n.replace('+', ''))));
  //     this.minPrice = Math.min(...allNumbers);
  //     this.maxPrice = Math.max(...allNumbers);

  //     // this.applyFilters();
  //   } else {
  //     this.minPrice = null;
  //     this.maxPrice = null;
  //   }
  //   console.log("Selected Prices:", this.selectedPrices);
  //   console.log("Min Price:", this.minPrice, "Max Price:", this.maxPrice);
  //   console.log("Selected Prices:", this.selectedPrices);

  // }
  onSelectPrice(option: any) {
    option.selected = !option.selected;
    if (option.selected) {
      this.selectedPrices.push(option.value);
    } else {
      this.selectedPrices = this.selectedPrices.filter(v => v !== option.value);
    }

    // Update min and max price 
    if (this.selectedPrices.length > 0) {
      const allNumbers = this.selectedPrices.flatMap(v => v.split('-')
        .map(n => parseInt(n.replace('+', ''))));
      this.minPrice = Math.min(...allNumbers);
      this.maxPrice = Math.max(...allNumbers);
    } else {
      this.minPrice = null;
      this.maxPrice = null;
    }

    console.log("Selected Prices:", this.selectedPrices);
    console.log("Min Price:", this.minPrice, "Max Price:", this.maxPrice);

    // ✅ Call API when price changes
    if (this.selectedPrices.length > 0 || this.selectedPlaceType) {
      this.applyFilters();
    }
  }



  removePrice(price: string) {
    this.selectedPrices = this.selectedPrices.filter(v => v !== price);
    const option = this.priceOptions.find(o => o.value === price);
    if (option) option.selected = false;
  }



  onSelectPlaceType(type: string) {
    this.selectedPlaceType = type;
    console.log("Selected Place Type:", this.selectedPlaceType);

    if (this.selectedPlaceType) {
      this.applyFilters();
    }
  }

  clearPlaceType() {
    this.selectedPlaceType = '';

  }



  applyFilters() {
    if ((this.selectedPlaceType && this.selectedPlaceType.length > 0) ||
      (this.selectedPrices && this.selectedPrices.length > 0)) {

      const filter: any = { ...this.originalParams }; // ✅ start with original params

      if (this.minPrice !== null) filter.min_price = this.minPrice;
      if (this.maxPrice !== null) filter.max_price = this.maxPrice;
      // if (this.selectedPlaceType) filter.place_type = this.selectedPlaceType;

      console.log('Final Filter:', filter);

      this.service.getHotelRoomsWithCombo(filter).then((res: any) => {
        this.combohotelRooms = res.data.non_matched_rooms
          .filter((room: any) => room.calculated_needed_rooms !== 1)
          .map((room: any) => ({
            ...room,
            mainImageUrlcombo: room.room?.rooms_image?.[0] || ''
          }));
      }).catch((err: any) => console.log(err));

      this.service.getHotelRoomsWithExact(filter).then((res: any) => {
        this.execthotelRooms = res.data.rooms.map((room: any) => ({
          ...room,
          mainImage: room.rooms_image?.[0] || ''
        }));
      }).catch((err: any) => console.log(err));
    }
  }


  // **************** for the date model ***************************






  resetMainImage(room: any) { room.mainImageUrl = room.rooms_image?.[0] || ''; }
  changeMainImage(room: any, imageUrl: string) { room.mainImageUrl = imageUrl; }
  // modal showing section 
  showCityModal = false;
  showDateModal = false;
  showPriceModal1 = false;
  tempCheckIn: string = '';
  tempCheckOut: string = '';
  destination = ['gwalior', 'indore', 'bhopal', 'Ujjain', 'Chambal'];
  hotel = {
    destination: 'gwalior', checkIn: '', checkOut: '',

    extra: { adults: 20, childrens: 10, rooms: 30 }
  };
  // ✅ Modal Functions
  openCityModal() { this.showCityModal = true; }
  closeCityModal() { this.showCityModal = false; }

  selectCity(city: string) {
    this.hotel.destination = city;
    this.closeCityModal();
  }

  openDateModal() {
    this.tempCheckIn = this.hotel.checkIn;
    this.tempCheckOut = this.hotel.checkOut;
    this.showDateModal = true;
  }

  closeDateModal() {
    this.showDateModal = !this.showDateModal;
    console.log(this.showDateModal)
  }


  applyDates() {
    this.hotel.checkIn = this.tempCheckIn;
    this.hotel.checkOut = this.tempCheckOut;
  }
  // Guests modal
  showGuestsModal = false;
  tempAdults = this.hotel.extra.adults;
  tempChildrens = this.hotel.extra.childrens;
  tempRooms = this.hotel.extra.rooms;
  numberOptions = Array.from({ length: 21 }, (_, i) => i + 1);

  // 1 to 21 

  openGuestsModal() {
    this.tempAdults = this.hotel.extra.adults;
    this.tempChildrens = this.hotel.extra.childrens;
    this.tempRooms = this.hotel.extra.rooms;
    this.showGuestsModal = true;
  }
  closeGuestsModal() { this.showGuestsModal = false; }


  applyGuests() {
    this.hotel.extra.adults = this.tempAdults;
    this.hotel.extra.childrens = this.tempChildrens;
    this.hotel.extra.rooms = this.tempRooms;
    this.showGuestsModal = false; // ✅ Correct modal

  }





  // ✅ Inside your component
  showPriceModal = false; selectedPrice: string = '';
  openPriceModal() { this.showPriceModal = true; }
  closePriceModal() { this.showPriceModal = false; }
  selectPrice(price: string) { this.selectedPrice = price; this.showPriceModal = false; }





}
