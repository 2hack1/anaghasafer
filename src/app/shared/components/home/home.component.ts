import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { AxiosResponse } from 'axios';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterModule],
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
  international: any;
  destinationsid: any[] = [];
  images: any[] = [];
  desId: any | null = null;
  formModel!: FormGroup;
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




  submitSearch() {


    const price = this.selectedPrice === 'other' ? this.customPrice : this.selectedPrice;
    const queryParams = {
      place_name: this.destination,
      price: price,
      duration: this.selectedMonth
    };

    this.router.navigate(['/dss'], { queryParams });


    //   const price = this.selectedPrice === 'other' ? this.customPrice : this.selectedPrice;


    //   const payload = {
    //     place_name: this.destination,
    //     price: price,
    //     duration: this.selectedMonth
    //   };

    //   console.log("payload:",payload);
    //  this.as_.getfilterpackages(payload).then((res:any)=>{
    //    console.log("filtered data:",res.data.data);
    //    console.log("filtered data only res:",res);


    //     this.destination = '';
    //       this.selectedPrice = '';
    //       this.customPrice = null;
    //       this.selectedMonth = '';
    //       this.showOtherInput = false;

    //  }).catch((error)=>{

    //     console.log(error);
    //  })

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
  // @ViewChild('sliderTrack', { static: true }) sliderTrack!: ElementRef;

  // SlideLeft() {
  //   const slider = this.sliderTrack.nativeElement;
  //   slider.scrollLeft -= 300;
  // }

  // SlideRight() {
  //   const slider = this.sliderTrack.nativeElement;
  //   slider.scrollLeft += 300;
  // }
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
    this.as_.getSubDesLimit(destination_id)
      .then((res: AxiosResponse) => {
        this.getsubinter = res.data;
        // Combine all sub_destinations into one array
        this.subDesinter = this.getsubinter.sub_destinations;
        console.log("ihnternationsl", this.subDesinter)


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

    // Example for file (if you have one)
    // formData.append('document', this.selectedFile);

    this.as_.makeYourtrip(formData)
      .then((res: any) => {
        console.log(res.data);
        this.formModel.reset();
      })
      .catch((err) => {
        console.log("come error:", err);
      });
  }


}



