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
      name: 'Stuart Little',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Sharma',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      name: 'Rahul Mehta',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
      name: 'Robin Jems',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Rahul Mehta',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
      name: 'Jon Ford',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus provident...',
      img: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ];

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