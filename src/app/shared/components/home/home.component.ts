import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { AxiosResponse } from 'axios';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  totalSlides = 3;
  facebookUsername = "anaghasafer";
  instagramUsername = "anaghasafer";
  email = 'anaghasafer21@mail.com';
  stores: any;
  destinationsid: any[] = [];
  images: any[] = [];
  constructor(private as_: AxiosService) { }

  ngOnInit(): void {
    setInterval(() => this.nextSlide(), 5000);
    this.getImages();

    (async () => {
      this.stores = await this.getdestination();
      console.log("asdasdasd", this.stores)
      this.getSubLimit(this.stores);
    })()
  }

  getImages() {
    this.as_.getimg()
      .then(res => {
        console.log('API Response:', res.data);
        this.images = res.data.map((item: any) => item.url);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  }


  async getdestination() {
    await this.as_.getdes()
      .then(res => {
        // console.log("Full response:", res.data);
        this.destinationsid = res.data.map((item: any) => item.destination_id);
      })
      .catch(err => {
        console.error("Error fetching destinations:", err);
      });
    return this.destinationsid[0]
  }


  showSlide(index: number) {
    const container = document.getElementById('slideContainer') as HTMLElement;
    if (index >= this.totalSlides) this.currentSlide = 0;
    else if (index < 0) this.currentSlide = this.totalSlides - 1;
    else this.currentSlide = index;

    container.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  // heading with slider***************************************************** 

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
  @ViewChild('sliderTrack', { static: true }) sliderTrack!: ElementRef;

  SlideLeft() {
    const slider = this.sliderTrack.nativeElement;
    slider.scrollLeft -= 300;
  }

  SlideRight() {
    const slider = this.sliderTrack.nativeElement;
    slider.scrollLeft += 300;
  }
  tours = [
    { name: 'Dubai', image: 'assets/6 images/delhi.jpg', tours: 1 },
    { name: 'Malaysia', image: 'assets/6 images/gujrat.jpg', tours: 1 },
    { name: 'Singapore', image: 'assets/6 images/kashmir.jpg', tours: 1 },
    { name: 'Paris', image: 'assets/6 images/kerala.jpg', tours: 1 },
    { name: 'Bali', image: 'assets/6 images/maharatra.jpg', tours: 1 },
    { name: 'Thailand', image: 'assets/6 images/mp.jpg', tours: 1 }
  ];
  getsub: any = [];
  subDes: any[] = [];
  getSubLimit(destination_id: any) {
    this.as_.getSubDesLimit(destination_id)
      .then((res: AxiosResponse) => {
        this.getsub = res.data;
        console.log("++++++++++ Raw sub data:", this.getsub);

        // Combine all sub_destinations into one array
        this.subDes = this.getsub.sub_destinations;
        console.log("Combined sub-destinations:", this.subDes);
        
      })
      .catch(err => {
        console.error("Some error occurred:", err);
      });
      return this.subDes;
  }

  destinations = [
    { name: 'Uttarakhand', image: 'assets/uttarakhand.webp', packages: '50+' },
    { name: 'Kerala', image: 'assets/kerala.webp', packages: '40+' },
    { name: 'Sikkim', image: 'assets/sikkim.webp', packages: '40+' },
    { name: 'Bhutan', image: 'assets/bhutan.webp', packages: '20+' },
    { name: 'Thailand', image: 'assets/thailand.webp', packages: '10+' },
    { name: 'Uttarakhand', image: 'assets/uttarakhand.webp', packages: '10+' },
    { name: 'Kerala', image: 'assets/kerala.webp', packages: '10+' },
    { name: 'Thailand', image: 'assets/thailand.webp', packages: '10+' },
  ];


}




