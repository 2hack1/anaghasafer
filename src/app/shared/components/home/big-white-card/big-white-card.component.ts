
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Axios } from 'axios';
import $ from 'jquery';
import { AxiosService } from '../../../../core/services/axios/axios.service';
@Component({
    selector: 'app-big-white-card',
    imports: [CommonModule, FormsModule,CommonModule],
    templateUrl: './big-white-card.component.html',
    styleUrl: './big-white-card.component.scss'
})
export class BigWhiteCardComponent implements OnInit, AfterViewInit {
         hotelService = false;
         destinationService = true;
         a1=''
         a2=''
    isArrowUp = true;
    minPrice = 0;
    maxPrice = 1500;
    tomorrow = new Date();

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

    constructor(private route: Router, private service: AxiosService) { }
    ngOnInit(): void {
        console.log("hotel", this.hotel)
        const today = new Date();

        this.tomorrow.setDate(today.getDate() + 1);

        this.hotel.checkIn = this.formatDate(today);
        this.hotel.checkOut = this.formatDate(this.tomorrow);
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    onDateChange() {
        console.log('CheckIn:', this.hotel.checkIn);
        console.log('CheckOut:', this.hotel.checkOut);
    }
    ngAfterViewInit(): void {
        $(document).on('click', function (event) {
            const $target = $(event.target);

            if (
                !$target.closest('.dropdown-modal').length &&
                !$target.closest('[data-modalname]').length
            ) {
                $('.dropdown-modal').hide()
                // setTimeout(() => $('.dropdown-modal').hide(), 200);
            }
        });

        $('[data-modalname]').on('click', function () {
            const modalId = $(this).attr('data-modalname');
            $('.dropdown-modal').hide();

            // console.log(modalId)
            const $el = $('.dropdown-modal#' + modalId);

            // if ($el.is('input')) {
            if ($el.is('input')) {
                $el.show();
                $el.trigger('click')
            }
            else {
                $el.show();
            }
        });

        $('.checkin-date').on('change', function () {
            let value = $(this).val()
            const minDate = new Date(value.toString());
            const formattedMin = minDate.toISOString().split('T')[0];

            $('.checkout-date').attr('min', formattedMin);
        })

        $('.checkout-date').on('change', function () {
            let value = $(this).val()
            console.log(value)
        })
    }

    closeAllModal() {

        $('.dropdown-modal').each(function () {
            $(this).hide();
        });
    }


    destination = ['gwalior', 'indore', 'bhopal'];

    showModal = false;

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

    get totalGuests() {
        return {
            Guests: this.guestCounts.adults + this.guestCounts.children,
            rooms: this.guestCounts.rooms
        };
    }

    openModal() {
        this.showModal = !this.showModal;
    }

    closeModal() {
        this.showModal = false;
    }

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
        const parts = price.split(/–|-/); // covers en dash and hyphen
        if (parts.length === 2) {
            this.minPrice = Number(parts[0].trim());
            this.maxPrice = Number(parts[1].trim());
        } else {
            this.minPrice = Number(parts[0].trim());
            this.maxPrice = this.minPrice;
        }
    }

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
            alert("Please fill  the fields");
        }


    }


}


