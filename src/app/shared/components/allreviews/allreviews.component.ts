import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-allreviews',
  imports: [CommonModule],
  templateUrl: './allreviews.component.html',
  styleUrl: './allreviews.component.scss'
})
export class AllreviewsComponent {
reviews = [
  {
    name: 'Amit Verma',
    message: 'The trip was amazing! Everything from transportation to sightseeing was well organized. Highly recommended.',
    rating: 5,
    tripName: 'Golden Triangle Tour',
    hotelName: 'Hotel Taj Palace',
    place: 'Delhi, Jaipur, Agra',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  },
  {
    name: 'Priya Sharma',
    message: 'Comfortable hotel and friendly staff. The guided tour made the experience unforgettable.',
    rating: 4,
    tripName: 'Himalayan Adventure',
    hotelName: 'Snow View Resort',
    place: 'Manali, Shimla',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  },
  {
    name: 'Rahul Mehta',
    message: 'Beautiful trip with excellent arrangements. Hotel rooms were clean and service was top-notch.',
    rating: 5,
    tripName: 'Goa Beach Getaway',
    hotelName: 'Seaside Hotel',
    place: 'Goa',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  },
  {
    name: 'Sneha Gupta',
    message: 'Everything was perfect. From the check-in at the hotel to the tour guides, a memorable experience.',
    rating: 5,
    tripName: 'Kerala Backwaters Tour',
    hotelName: 'Lakeside Resort',
    place: 'Alleppey, Kerala',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  },
  {
    name: 'Vikram Singh',
    message: 'Excellent hotel stay and amazing trip arrangements. Would love to book again.',
    rating: 4,
    tripName: 'Rajasthan Heritage Tour',
    hotelName: 'Heritage Palace Hotel',
    place: 'Jaipur, Udaipur, Jodhpur',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  },
   {
    name: 'Jonita Rao',
    message: 'A very pleasant experience. Everything from check-in to check-out was smooth.',
    rating: 4,
    tripName: 'Rajasthan Heritage Tour',
    hotelName: 'Heritage Palace Hotel',
    place: 'Jaipur, Udaipur, Jodhpur',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
     expanded: false
  }
];
;
toggleRead(index: number) {
  this.reviews[index].expanded = !this.reviews[index].expanded;
}
}
