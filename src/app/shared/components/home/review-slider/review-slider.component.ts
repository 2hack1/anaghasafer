import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-review-slider',
  imports: [CommonModule],
  templateUrl: './review-slider.component.html',
  styleUrl: './review-slider.component.scss'
})

export class ReviewSliderComponent {
  testimonials = [
  {
    name: 'Amit Verma',
    message: 'The stay was fantastic! Very comfortable rooms and excellent service. Highly recommend.',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  },
  {
    name: 'Priya Sharma',
    message: 'Comfortable hotel and friendly staff. The guided tour made the experience unforgettable.',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  },
  {
    name: 'Rahul Mehta',
    message: 'Beautiful trip with excellent arrangements. Hotel rooms were clean and service was top-notch.!',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  },
  {
    name: 'Sneha Gupta',
    message: 'Everything was perfect. From the check-in at the hotel to the tour guides, a memorable experience.',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  },
  {
    name: 'Vikram Singh',
    message: 'Excellent hotel stay and amazing trip arrangements. Would love to book again.',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  },
  {
    name: 'Jonita Rao',
    message: 'A very pleasant experience. Everything from check-in to check-out was smooth.',
    img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  }
];
isExpanded: boolean[] = Array(this.testimonials.length).fill(false);

// Toggle function
toggleExpand(index: number) {
  this.isExpanded[index] = !this.isExpanded[index];
}

  index = 0;
  visibleCards = 3;
  cardWidth = 320; // card + margin
  maxIndex = this.testimonials.length - this.visibleCards;

  prevSlide() {
    if (this.index > 0) {
      this.index--;
    }
  }
  nextSlide() {
    if (this.index < this.maxIndex) {
      this.index++;
    }
  }
}