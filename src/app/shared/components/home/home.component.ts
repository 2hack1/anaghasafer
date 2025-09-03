
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { AxiosResponse } from 'axios';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgModel, NgModelGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import $ from 'jquery';
import { ReviewSliderComponent } from './review-slider/review-slider.component';
import { BigWhiteCardComponent } from './big-white-card/big-white-card.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterModule, ReviewSliderComponent,BigWhiteCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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

  currentSlide = 0;
  totalSlides = 3;
  facebookUsername = "anaghasafer";
  instagramUsername = "anaghasafer";
  email = 'anaghasafer21@mail.com';
  stores: any;
  international: any;
  destinationsid: any[] = [];
  images: any[] = [];
  desId: any | null = null;
  formModel!: FormGroup;
  env = environment

  constructor(private as_: AxiosService, private FB_: FormBuilder, private router: Router) {
    this.formModel = FB_.group({
      your_address: [null, Validators.required],
      destination_address: [null, Validators.required],
      email: [null, Validators.required],
      check_in: [null, Validators.required],
      check_out: [null, Validators.required],
      adults: [null, Validators.required],
      children: [null, Validators.required]
    })

  }
  ngOnInit(): void {

    localStorage.clear();
    setInterval(() => this.nextSlide(), 5000);
    this.getImages();
    this.getcards();

    (async () => {
      this.stores = await this.getdestination(0);
      console.log("store", this.stores)

      this.getSubLimit(this.stores);

      this.international = await this.getdestination(2);
      this.getSubInternationalLimit(this.international);
      console.log("data", this.international)
      // this.getSubLimit(this.international);

    })()

  }

  destination: string = '';
  customPrice: number | null = null;
  selectedMonth: string = '';
  selectedPrice: string = '';
  showOtherInput: boolean = false;

  onPriceChange() {
    this.showOtherInput = this.selectedPrice === 'other';
  }


  randerToDestination(sub_desId: number, destId: number) {
    this.as_.destination_id = destId;
    this.router.navigate(['/des', sub_desId]);
  }

  submitSearch() {
    const price = this.selectedPrice === 'other' ? this.customPrice : this.selectedPrice;
    const queryParams = {
      place_name: this.destination,
      price: price,
      duration: this.selectedMonth
    };

    this.router.navigate(['/des'], { queryParams });

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


  async getdestination(id: any) {
    await this.as_.getdes()
      .then(res => {
        this.destinationsid = res.data.map((item: any) => item.destination_id);
      })
      .catch(err => {
        console.error("Error fetching destinations:", err);
      });
    return this.destinationsid[id]
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
        // Combine all sub_destinations into one array
        this.subDes = this.getsub.sub_destinations;
      })
      .catch(err => {
        console.error("Some error occurred:", err);
      });
    return this.subDes;
  }


  getsubinter: any = [];
  subDesinter: any[] = [];

  getSubInternationalLimit(destination_id: any) {
    this.as_.InternationalPackages(22)
      .then((res: AxiosResponse) => {
        this.getsubinter = res.data;
        this.subDesinter = res.data;
        // this.subDesinter = this.getsubinter.sub_destinations;
        // console.log("ihnternationsl", this.subDesinter);
        console.log("packages response ", res);
        console.log("package data ", this.getsubinter);
      })
      .catch(err => {
        console.error("Some error occurred:", err);
      });
    return this.subDesinter;
  }

  fourcart: any = [];
  // four cards
  getcards() {
    this.as_.getFourCard().then((res: any) => {
      this.fourcart = res.data;
    })
  }

  checkEmail = false;
  makeMytrip() {
    const formValue = this.formModel.value;
    const email = formValue.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("formmodel:", this.formModel.value);
    if (!emailRegex.test(email)) {
      this.checkEmail = true;
      return;
    }
    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }


    this.as_.makeYourtrip(formData)
      .then((res: any) => {
        console.log(res.data);
        this.getMailOnMakeMyTrip(formData);
        this.formModel.reset();

      })
      .catch((err) => {
        console.log("come error:", err);
      });
  }


  getMailOnMakeMyTrip(data: FormData) {
    this.as_.makeMyFormMail(data).then(() => {

      console.log("succussfully send mail");
    }).catch((err) => {
      console.log("not email send ", err);
    })
  }


  closeAllModal() {
    $('.dropdown-modal').each(function () {
      $(this).hide();
    });
  }

  openThisAssociatedModal() {

  }

  randerinternations(package_id: number, subdesid: number) {

    this.as_.subdes_id = subdesid;
    this.as_.destination_id = 5;
    this.router.navigate(['/view', package_id]);
    //  console.log("subdesid",subdesid);
  }
}



