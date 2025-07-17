
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import $ from 'jquery';


@Component({
    selector: 'app-big-white-card',
    imports: [CommonModule],
    templateUrl: './big-white-card.component.html',
    styleUrl: './big-white-card.component.scss'
})
export class BigWhiteCardComponent implements OnInit, AfterViewInit {
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
    ngOnInit(): void { }

    closeAllModal() {
        $('.dropdown-modal').each(function () {
            $(this).hide();
        });
    }

    openThisAssociatedModal() {

    }

    showModal = false;

    guestCounts = {
        adults: 2,
        children: 0,
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
        // return this.guestCounts.adults + this.guestCounts.children , this.guestCounts.rooms;
    }

    openModal() {
        this.showModal = true;
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

}


