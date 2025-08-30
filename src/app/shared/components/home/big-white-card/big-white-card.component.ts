import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Axios } from 'axios';
import $ from 'jquery';
import { AxiosService } from '../../../../core/services/axios/axios.service';

@Component({
    selector: 'app-big-white-card',
    imports: [CommonModule, FormsModule, CommonModule],
    templateUrl: './big-white-card.component.html',
    styleUrl: './big-white-card.component.scss'
})
export class BigWhiteCardComponent implements OnInit, AfterViewInit {

    // ------------------------------------------------
    // 🔹 STATE VARIABLES
    // ------------------------------------------------
    hotelService = false;
    destinationService = true;
    isArrowUp = true;
    //   isArrowUpfortour = true;

    showModal = false;
    showModal1 = false;
    showPriceDropdown = false;
    //   showPriceDropdownfortour = false;
    showPriceDropdown1 = false;

    checkonmyside = false;
    checkonmyside1 = false;

    searchText: string = '';
    searchText1: string = '';
    selectedmonth: string = 'March';

    minPrice = 0;
    maxPrice = 1500;
    //   minPricefortour = 0;
    //   maxPricefortour = 1500;
    tomorrow = new Date();
    activeTab: 'destination' | 'hotel' | 'train' = 'destination';

    a1 = '';
    a2 = '';

    // ------------------------------------------------
    // 🔹 DATA MODELS
    // ------------------------------------------------
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
    };

    tour = {
        destination: "gwalior",
        months: '',
        adults: 1,
        children: 1,
        guests: 1
    };

    destination = ['gwalior', 'indore', 'bhopal', 'ujjain', 'khajuraho', 'orchha'];
    priceOptions = ['0–1500', '1500–2500', '2500–5000', '5000-6000', '6000+'];
    //   priceOptions1 = ['0–5000', '5000–10000', '15000–25000', '25000-30000', '30000+'];
    months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    guestCounts = {
        adults: 2,
        children: 1,
        rooms: 1,
    };

    guestTypes = [
        { type: 'adults', label: 'Adults' },
        { type: 'children', label: 'Children' },
        { type: 'rooms', label: 'Rooms' },
    ];

    TuorguestCounts = {
        adultss: 2,
        childrens: 1,
        days: 1,
    };
    TuorguestTypes = [
        { type: 'adultss', label: 'Adultss' },
        { type: 'childrens', label: 'Childrens' },
        { type: 'days', label: 'Dayss' },
    ];

    // ------------------------------------------------
    // 🔹 CONSTRUCTOR
    // ------------------------------------------------
    constructor(private route: Router, private service: AxiosService) { }

    // ------------------------------------------------
    // 🔹 LIFECYCLE HOOKS
    // ------------------------------------------------
    ngOnInit(): void {
        console.log("hotel", this.hotel);
        const today = new Date();
        this.tomorrow.setDate(today.getDate() + 1);

        this.hotel.checkIn = this.formatDate(today);
        this.hotel.checkOut = this.formatDate(this.tomorrow);
    }



randerWithFilterOnTop(){
// console.log("selectedmonth",this.selectedmonth)
// console.log("destination",this.tour.destination)
// console.log("adultss",this.TuorguestCounts.adultss)
// console.log("childrens",this.TuorguestCounts.childrens)
// console.log("days",this.TuorguestCounts.days)
// console.log("price",this.minPricefortour);
// console.log("maxprice",this.maxPricefortour);

 this.route.navigate(['/dss'], {
    queryParams: {
      selectedMonth: this.selectedmonth,
      destination: this.tour.destination,
      adults: this.TuorguestCounts.adultss,
      children: this.TuorguestCounts.childrens,
      days: this.TuorguestCounts.days,
      minPrice: this.minPricefortour,
      maxPrice: this.maxPricefortour
    }
  });

        
    }




    ngAfterViewInit(): void {
        $(document).on('click', function (event) {
            const $target = $(event.target);
            if (
                !$target.closest('.dropdown-modal').length &&
                !$target.closest('[data-modalname]').length
            ) {
                $('.dropdown-modal').hide();
            }
        });

        $('[data-modalname]').on('click', function () {
            const modalId = $(this).attr('data-modalname');
            $('.dropdown-modal').hide();
            const $el = $('.dropdown-modal#' + modalId);

            if ($el.is('input')) {
                $el.show();
                $el.trigger('click');
            } else {
                $el.show();
            }
        });

        $('.checkin-date').on('change', function () {
            let value = $(this).val();
            const minDate = new Date(value.toString());
            const formattedMin = minDate.toISOString().split('T')[0];
            $('.checkout-date').attr('min', formattedMin);
        });

        $('.checkout-date').on('change', function () {
            let value = $(this).val();
            console.log(value);
        });
    }

    // ------------------------------------------------
    // 🔹 GETTERS
    // ------------------------------------------------
    get filteredDestinations() {
        if (!this.searchText) return this.destination;
        return this.destination.filter(item =>
            item.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

    get filteredDestinations1() {
        if (!this.searchText1) return this.destination;
        return this.destination.filter(item =>
            item.toLowerCase().includes(this.searchText1.toLowerCase())
        );
    }

    get totalGuests() {
        return {
            Guests: this.guestCounts.adults + this.guestCounts.children,
            rooms: this.guestCounts.rooms
        };
    }
    get totalGuests1() {
        return {
            Guests: this.TuorguestCounts.adultss + this.TuorguestCounts.childrens,
                day: this.TuorguestCounts.days
        };
    }

    // ------------------------------------------------
    // 🔹 HELPER METHODS
    // ------------------------------------------------
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // ------------------------------------------------
    // 🔹 DESTINATION & TOUR HANDLING
    // ------------------------------------------------
    showdestinationMySide() {
        this.checkonmyside = !this.checkonmyside;
    }

    showdestinationMySideForTour() {
        this.checkonmyside1 = !this.checkonmyside1;
    }

    closeAllModalForhotel(destination_name: any) {
        this.hotel.destination = destination_name;
        this.checkonmyside = false;
        this.searchText1 = '';
    }

    closeAllModalFortour(destination_name: string) {
        this.tour.destination = destination_name;
        this.checkonmyside1 = false;
        this.searchText = '';
    }

    // ------------------------------------------------
    // 🔹 TAB HANDLING
    // ------------------------------------------------
    setActive(tab: 'destination' | 'hotel' | 'train') {
        this.activeTab = tab;

        if (tab === 'destination') {
            this.destinationService = true;
            this.hotelService = false;
        } else if (tab === 'hotel') {
            this.destinationService = false;
            this.hotelService = true;
        } else {
            this.destinationService = false;
            this.hotelService = false;
        }
    }

    // ------------------------------------------------
    // 🔹 PRICE HANDLING
    // ------------------------------------------------
    togglePriceDropdown() {
        this.showPriceDropdown = !this.showPriceDropdown;
        this.isArrowUp = !this.isArrowUp;
    }

    //   togglePriceDropdownfortour() {
    //     this.showPriceDropdownfortour = !this.showPriceDropdownfortour;
    //     this.isArrowUpfortour = !this.isArrowUpfortour;
    //   }


    togglePriceDropdown1() {
        this.showPriceDropdown1 = !this.showPriceDropdown1;
    }

    //   selectPrice(price: string) {
    //     this.showPriceDropdown = false;
    //     const parts = price.split(/–|-/);
    //     if (parts.length === 2) {
    //       this.minPrice = Number(parts[0].trim());
    //       this.maxPrice = Number(parts[1].trim());
    //     } else {
    //       this.minPrice = Number(parts[0].trim());
    //       this.maxPrice = this.minPrice;
    //     }
    //   }


    selectPrice(price: string) {
        this.showPriceDropdown = false;

        if (price === '6000+') {
            // Special case for 30000+
            this.minPrice = 6000;
            this.maxPrice = null;
        } else {
            // Normal price range case
            const parts = price.split(/–|-/);
            this.minPrice = Number(parts[0].trim());
            this.maxPrice = Number(parts[1].trim());
        }
    }


    priceOptions1 = ['0–5000', '5000–10000', '15000–25000', '25000–30000', '30000+'];

    isArrowUpfortour = true;
    showPriceDropdownfortour = false;
    minPricefortour: number | null = 0;
    maxPricefortour: number | null = 5000;


    togglePriceDropdownfortour() {
        this.showPriceDropdownfortour = !this.showPriceDropdownfortour;
        this.isArrowUpfortour = !this.isArrowUpfortour;
    }

    selectPricefortour(price: string) {
        this.showPriceDropdownfortour = false;

        if (price === '30000+') {
            // Special case for 30000+
            this.minPricefortour = 30000;
            this.maxPricefortour = null;
        } else {
            // Normal price range case
            const parts = price.split(/–|-/);
            this.minPricefortour = Number(parts[0].trim());
            this.maxPricefortour = Number(parts[1].trim());
        }
    }

    selectPrice1(month: string) {
        this.selectedmonth = month;
        this.showPriceDropdown1 = false;
    }

    // ------------------------------------------------
    // 🔹 MODAL HANDLING
    // ------------------------------------------------
    openModal() {
        this.showModal = !this.showModal;
    }
    closeModal() {
        this.showModal = false;
    }
     openModal1() {
        this.showModal1 = !this.showModal1;
    }
   
    closeModal1() {
        this.showModal1 = false;
    }

    closeAllModal() {
        $('.dropdown-modal').each(function () {
            $(this).hide();
        });
    }

    // ------------------------------------------------
    // 🔹 GUEST HANDLING
    // ------------------------------------------------
    increase(type: string) {
        this.guestCounts[type]++;
    }

    decrease(type: string) {
        if (this.guestCounts[type] > 0) {
            this.guestCounts[type]--;
        }
    }
    tourincrease(type: string) {
        this.TuorguestCounts[type]++;
    }

    tourdecrease(type: string) {
        if (this.TuorguestCounts[type] > 0) {
            this.TuorguestCounts[type]--;
        }
    }

    // ------------------------------------------------
    // 🔹 FORM SUBMIT
    // ------------------------------------------------
    onSubmit() {
        const params = {
            city: this.hotel.destination,
            checkin: this.hotel.checkIn,
            checkout: this.hotel.checkOut,
            adults: this.guestCounts.adults,
            children: this.guestCounts.children,
            rooms: this.guestCounts.rooms,
            min_price: this.minPrice,
            max_price: this.maxPrice
        };

        if (this.maxPrice) {
            this.route.navigate(['/Hotel-Rooms'], { queryParams: params });
        } else {
            alert("Please fill the fields");
        }
    }

    // ------------------------------------------------
    // 🔹 DATE CHANGE HANDLER
    // ------------------------------------------------
    onDateChange() {
        console.log('CheckIn:', this.hotel.checkIn);
        console.log('CheckOut:', this.hotel.checkOut);
    }
}
