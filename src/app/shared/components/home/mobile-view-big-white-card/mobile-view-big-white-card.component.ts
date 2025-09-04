import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-view-big-white-card',
  imports: [CommonModule,FormsModule],
  templateUrl: './mobile-view-big-white-card.component.html',
  styleUrl: './mobile-view-big-white-card.component.scss'
})
export class MobileViewBigWhiteCardComponent implements OnInit {
// Guest & room counters 
  adults = 2;
  children = 0;
  rooms = 1; maxadults = 5; maxchildren = 5; maxRooms = 5;
  // Other fields
  city = 'Goa';
  cityOptions: string[] = ['Delhi', 'Mumbai', 'Bangalore', 'Goa'];
  country = 'India'; checkIn: ''
  checkOut: ''
  totalGuests = 2; 
  totalRooms = 1;
  // Modals 
  showGuestsModal = false;
 
  showPriceModal = false;
  // tempCheckIn: string = ''; 
  // // tempCheckOut: string = '';
  isMobile = false;


  // for tour
  
  ngOnInit(): void {
    this.checkScreenSize();
  }
  // ✅ Detect mobile 
  @HostListener('window:resize') onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() { this.isMobile = window.innerWidth <= 1150; }
  // ✅ Guest increment/decrement
  incAdults() { if (this.adults < this.maxadults) this.adults++; this.updateGuests(); }
  decAdults() { if (this.adults > 1) this.adults--; this.updateGuests(); }
  incChildren() { if (this.children < this.maxchildren) this.children++; this.updateGuests(); }
  decChildren() { if (this.children > 0) this.children--; this.updateGuests(); }
  incRooms() { if (this.rooms < this.maxRooms) this.rooms++; this.updateGuests(); }
  decRooms() { if (this.rooms > 1) this.rooms--; this.updateGuests(); }
  updateGuests() { this.totalGuests = this.adults + this.children; this.totalRooms = this.rooms; }
  applyGuests() { this.showGuestsModal = false; }
  // ✅ Price range increment/decrement 
  incMinPrice() { if (this.minPrice + 500 <= this.maxPrice) this.minPrice += 500; }
  decMinPrice() { if (this.minPrice - 500 >= 0) this.minPrice -= 500; }
  incMaxPrice() { if (this.maxPrice + 500 <= 50000) this.maxPrice += 500; }
  decMaxPrice() { if (this.maxPrice - 500 >= this.minPrice) this.maxPrice -= 500; }
  applyPrice() { this.showPriceModal = false; }

  toggleGuestsModal() { this.showGuestsModal = !this.showGuestsModal; }

  togglePriceModal() { this.showPriceModal = !this.showPriceModal; }
  search() { console.log('Searching hotels...'); }


  hotelService = false;
  destinationService = true;
  a1 = '';
  a2 = '';
  isArrowUp = true;
  minPrice = 0;
  maxPrice = 1500;
  tomorrow = new Date();


  hotel = {
    destination: "gwalior", checkIn: "",
    checkOut: "", extra: { rooms: 1, adults: 1, childrens: 1, guests: 1 }
  }
  activeTab: 'destination' | 'hotel' | 'train' = 'destination';
  setActive(tab: 'destination' | 'hotel' | 'train') {
    this.activeTab = tab;
    // keep these two flags in sync with the selected tab 
    if (tab === 'destination') {
      this.destinationService = true; this.hotelService = false;
    } else if (tab === 'hotel') {
      this.destinationService = false; this.hotelService = true;
    }
    else { this.destinationService = false; this.hotelService = false; }
  }
  closeAllModal() { $('.dropdown-modal').each(function () { $(this).hide(); }); }
  destination = ['gwalior', 'indore', 'bhopal'];
  showModal = false;
  guestCounts = { adults: 2, children: 1, rooms: 1, }
  guestTypes = [{ type: 'adults', label: 'Adults' },
  { type: 'children', label: 'Children' },
  { type: 'rooms', label: 'Rooms' },
  ];
  openModal() {
    this.showModal = !this.showModal;
  }
  closeModal() { this.showModal = false; }
  increase(type: string) {
    this.guestCounts[type]++;
  }
  decrease(type: string) {
    if (this.guestCounts[type] > 0) {
      this.guestCounts[type]--;
    }
  }
  showPriceDropdown = false;
  priceOptions = ['0–1500', '1500–2500', '2500–5000', '5000-6000', '6000+'];
  // selectedPrice = ''; 
  togglePriceDropdown() {
    this.showPriceDropdown = !this.showPriceDropdown;
    this.isArrowUp = !this.isArrowUp;
  }
  selectPrice(price: string) {
    // this.selectedPrice = price;
    this.showPriceDropdown = false;
    const parts = price.split(/–|-/);
    // covers en dash and hyphen 
    if (parts.length === 2) {
      this.minPrice = Number(parts[0].trim());
      this.maxPrice = Number(parts[1].trim());
    } else {
      this.minPrice = Number(parts[0].trim());
      this.maxPrice = this.minPrice;
    }
  }
  onSubmit() {
    const params = { city: this.hotel.destination, checkin: this.hotel.checkIn, checkout: this.hotel.checkOut, adults: this.guestCounts.adults, children: this.guestCounts.children, rooms: this.guestCounts.rooms, min_price: this.minPrice, max_price: this.maxPrice };
  }
  // Component TS
  today = new Date().toISOString().split('T')[0];
  // today's date in yyyy-mm-dd
  //  // slides
  currentSlide: number = 1;
  goToSlide(index: number) {
    this.currentSlide = index;
  }

  tempCheckIn: string = '';
  tempCheckOut: string = '';

  showDateModal: boolean = false;
  constructor() {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); this.hotel.checkIn = this.formatDate(today); this.hotel.checkOut = this.formatDate(tomorrow); this.tempCheckIn = this.hotel.checkIn; this.tempCheckOut = this.hotel.checkOut;
  } /** Open date selection modal */
  openDateModal(): void { this.showDateModal = true; this.tempCheckIn = this.hotel.checkIn; this.tempCheckOut = this.hotel.checkOut; } /** Close date modal without saving changes */ closeDateModal(): void { this.showDateModal = false; } /** Close modal from "X" button */ PriceModal(): void { this.showDateModal = false; } /** Apply selected dates */ applyDates(): void {
    if (!this.tempCheckIn || !this.tempCheckOut) { alert('Please select both Check-In and Check-Out dates.'); return; } const checkInDate = new Date(this.tempCheckIn); const checkOutDate = new Date(this.tempCheckOut);
    // Validation: check-out date must be after check-in
    if (checkOutDate <= checkInDate) { alert('Check-out date must be after Check-in date.'); return; }
    // Update hotel dates 
    this.hotel.checkIn = this.tempCheckIn;
    this.hotel.checkOut = this.tempCheckOut;
    // Close modal after applying 
    this.showDateModal = false;
  }
  /** Helper function to format date into yyyy-mm-dd */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} -${month} -${day}`;
  }
  
  
  // for hotel slide 
  hotelCity: string = '';
  hotelCityOptions: string[] = ['Goa', 'Delhi', 'Mumbai', 'Jaipur'];
  hotelCountry: string = 'India'; hotelBooking = { checkIn: '', checkOut: '' };
  showHotelDateModal = false; tempHotelCheckIn: string = '';
  tempHotelCheckOut: string = ''; hotelTotalGuests: number = 2;
  hotelTotalRooms: number = 1; hotelMinPrice: number = 1000;
  hotelMaxPrice: number = 10000;
  openHotelDateModal() { this.showHotelDateModal = true; }
  closeHotelDateModal() { this.showHotelDateModal = false; }
  applyHotelDates() {
    this.hotelBooking.checkIn = this.tempHotelCheckIn;
    this.hotelBooking.checkOut = this.tempHotelCheckOut;
    this.closeHotelDateModal();
  }
  hotelSearch() { console.log("Hotel search triggered!"); }
  // For Hotel Price Modal 
  showHotelPriceModal: boolean = false;
  toggleHotelPriceModal() { this.showHotelPriceModal = !this.showHotelPriceModal; }
  applyHotelPrice() { this.toggleHotelPriceModal(); }
  showHotelGuestsModal: boolean = false;
  toggleHotelGuestsModal() {
    this.showHotelGuestsModal = !this.showHotelGuestsModal;
  }
  applyHotelGuests() { this.toggleHotelGuestsModal(); }
 
  openDateModal1() {
    // // Temporary variables to avoid direct binding until applied 
    this.tempCheckIn = this.hotel.checkIn;
    this.tempCheckOut = this.hotel.checkOut;
    this.showDateModal = true;
  }
  closeDateModal1() {
    this.showDateModal = false;
  }



  

  // slides //month for the trip 
  showMonthModal = false; selectedMonth: string = 'March';
  // Default 
  months: string[] = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  toggleMonthModal() { this.showMonthModal = !this.showMonthModal; }
  selectMonth(month: string) { this.selectedMonth = month; }
  applyMonth() { this.showMonthModal = false; console.log('Selected Month:', this.selectedMonth); }


// ********************************************************************************************************************

  // --------- TOUR MODAL VARIABLES ----------
adultsTour = 2;
childrenTour = 0;
roomsTour = 1;

maxAdultsTour = 5;
maxChildrenTour = 5;
maxRoomsTour = 5;

totalGuestsTour = 2;
totalRoomsTour = 1;

showGuestsModalTour = false;

// --------- TOUR MODAL METHODS ----------
incAdultsTour() {
  if (this.adultsTour < this.maxAdultsTour) this.adultsTour++;
  this.updateGuestsTour();
}

decAdultsTour() {
  if (this.adultsTour > 1) this.adultsTour--;
  this.updateGuestsTour();
}

incChildrenTour() {
  if (this.childrenTour < this.maxChildrenTour) this.childrenTour++;
  this.updateGuestsTour();
}

decChildrenTour() {
  if (this.childrenTour > 0) this.childrenTour--;
  this.updateGuestsTour();
}

incRoomsTour() {
  if (this.roomsTour < this.maxRoomsTour) this.roomsTour++;
  this.updateGuestsTour();
}

decRoomsTour() {
  if (this.roomsTour > 1) this.roomsTour--;
  this.updateGuestsTour();
}

updateGuestsTour() {
  this.totalGuestsTour = this.adultsTour + this.childrenTour;
  this.totalRoomsTour = this.roomsTour;
}

applyGuestsTour() {
  this.showGuestsModalTour = false;
}

toggleGuestsModalTour() {
  this.showGuestsModalTour = !this.showGuestsModalTour;
}


search0(){
alert(' destination uder working ')
}

search1(){
  alert(' hotle uder working')
}

search2(){
  alert(' train uder working')
}
}
