import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { routes } from '../../../app.routes';


interface Tour {
  date: string;
  label: string;
  class: string;
}

interface Month {
  key: string;
  label: string;
}

@Component({
  selector: 'app-view-deatails',
  imports: [CommonModule],
  templateUrl: './view-deatails.component.html',
  styleUrl: './view-deatails.component.scss'
})
export class ViewDeatailsComponent implements OnInit {
  activeTab: string = 'tourDates';
  images: string[] = [
    '/assets/slider12.png',
    '/assets/slider13.png',
    '/assets/slider14.png'
  ];
  currentIndex = 0;
  autoSlideInterval: any;
  constructor(private Route: ActivatedRoute, private as_: AxiosService) { }
  packageId: any | null = null;
  selectedMonth: any;
  ngOnInit() {
    this.packageId = this.Route.snapshot.paramMap.get('id');
    console.log("package id:", this.packageId);
    this.getpackagesdetails(this.packageId);
    this.getmonthAndDate(this.packageId);
    console.log("++++++++++", this.selectMonth);
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  packageDetails: any = [];
  packag: any[] = [];
  monthDate: any = [];
  getpackagesdetails(id: any) {
    this.as_.getPackagesDetails(id).then((res) => {
      this.packageDetails = res.data[0];
      this.packag = res.data[0].images;

    }).catch((err) => {
      console.error("error", err);
    })
  }

  getmonthAndDate(packagesId: any) {
    this.as_.getMonthandDate(packagesId).then((res) => {
      console.log("chaek:", res.data);
      this.monthDate = res.data;
    }).catch((err) => {
      console.error("error", err);
    })

  }


  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  days = [
    {
      title: 'Day 1:',
      subtitle: 'Delhi to Manali',
      description: 'The Spiti Valley Road Trip expedition will start from Delhi; our team will be receiving you from the pickup point.',
      open: false
    },
    {
      title: 'Day 2:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    },
    {
      title: 'Day 3:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    },
    {
      title: 'Day 4:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    }
  ];
  toggleDay(index: number): void {
    this.days[index].open = !this.days[index].open;
  }
  
  // Optional: toggle all days
  toggleAll(): void {
    const allOpen = this.days.every(day => day.open);
    this.days.forEach(day => day.open = !allOpen);
  }
  

  // **********************************DATE OF TOURS***************************************
  
  
  
  // months: Month[] = [
    //   { key: 'may', label: "May '25" },
    //   { key: 'jun', label: "Jun '25" },
    //   { key: 'jul', label: "Jul '25" },
    //   { key: 'aug', label: "Aug '25" },
    //   { key: 'sep', label: "Sep '25" }
    // ];
    
    tourData: { [key: string]: Tour[] } = {
      may: [
        { date: '04–May–25 to 13–May–25', label: 'Open', class: 'open1' },
        { date: '07–May–25 to 16–May–25', label: 'Filling Fast', class: 'filling' },
        { date: '11–May–25 to 20–May–25', label: '12 Seats Left', class: 'seats-left' },
        { date: '14–May–25 to 23–May–25', label: 'Filling Fast', class: 'filling' }
      ],
    jun: [
      { date: '04–Jun–25 to 13–Jun–25', label: 'Open', class: 'open1' },
      { date: '07–Jun–25 to 16–Jun–25', label: 'Filling Fast', class: 'filling' },
      { date: '11–Jun–25 to 20–Jun–25', label: '12 Seats Left', class: 'seats-left' },
      { date: '14–Jun–25 to 23–Jun–25', label: 'Filling Fast', class: 'filling' },
      { date: '18–Jun–25 to 27–Jun–25', label: 'Open', class: 'open1' },
      { date: '21–Jun–25 to 30–Jun–25', label: '09 Seats Left', class: 'seats-left' },
      { date: '28–Jun–25 to 07–Jul–25', label: 'Open', class: 'open1' }
    ],
    jul: [
      { date: '04–Jul–25 to 13–Jul–25', label: 'Open', class: 'open1' },
      { date: '07–Jul–25 to 16–Jul–25', label: 'Filling Fast', class: 'filling' }
    ],
    aug: [
      { date: '04–Aug–25 to 13–Aug–25', label: 'Open', class: 'open1' },
      { date: '07–Aug–25 to 16–Aug–25', label: 'Filling Fast', class: 'filling' }
    ],
    sep: [
      { date: '04–Sep–25 to 13–Sep–25', label: 'Open', class: 'open1' },
      { date: '07–Sep–25 to 16–Sep–25', label: 'Filling Fast', class: 'filling' }
    ]
  };

  // selectedMonth: any|null = null;
  
  showPopup: boolean = false;

  openPopup(): void {
    this.showPopup = true;
  }
  
  closePopup(): void {
    this.showPopup = false;
  }
  
  // *****************rooms calculations*****************
  rooms = [
    {
      travellers: [
        { type: 'Adult', ageGroup: '(12+ yrs)', count: 0 },
        { type: 'Child ', ageGroup: '(12- yrs)', count: 0 },
        { type: 'Infant', ageGroup: '(5- yrs)', count: 0 }
      ]
    }
  ];
  
  transportModes = [
    { key: 'subway', amount: 1000, icon: 'fi fi-ts-subway' },
    { key: 'bus', amount: 2000, icon: 'fi fi-ts-bus-alt' },
    { key: 'plane', amount: 5000, icon: 'fi fi-ts-plane-alt' },
    { key: 'car', amount: 3000, icon: 'fi fi-ts-car-side' }
  ];
  
  selectedTransport: string = '';
  transportPrice: number = 0;
  
  selectTransport(key: string): void {
    this.selectedTransport = key;
    
    const selected = this.transportModes.find(mode => mode.key === key);
    this.transportPrice = selected ? selected.amount : 0;
    
    this.calculateTotalAmount();  // 💡 Update total when transport changes
  }

  
  totalAmount: number = 0;
  showPopup1: boolean = false;
  
  // Fix random prices once when component is loaded
  adultPrice = 5000;
  childPrice = 3000;
  roomCharge = 2000;
  
  date:any[]=[];
  getdate(id:any){

    this.as_.getdate(id).then((res)=>{
      console.log("dates",res.data);
      // this.date=res.data;

    }).catch((err)=>{
       console.error("error",err);
    })
  }
  selectMonth(key: any): void {
    this.selectedMonth = key;
    console.log("sakfpoasfoasdo", this.selectedMonth);
    this.getdate(this.selectedMonth);
  }

  addRoom(): void {
    this.rooms.push({
      travellers: [
        { type: 'Adult', ageGroup: '(12+ yrs)', count: 1 },
        { type: 'Child ', ageGroup: '(12- yrs)', count: 0 },
        { type: 'Infant', ageGroup: '(5- yrs)', count: 0 }
      ]
    });
    this.calculateTotalAmount();  // Important!
  }
  
  removeRoom(index: number): void {
    this.rooms.splice(index, 1);
    this.calculateTotalAmount();
  }

  increaseCount(roomIndex: number, traveller: any): void {
    const label = traveller.type.toLowerCase();
    const currentCount = traveller.count;

    if (label.includes('adult') && currentCount >= 2) {
      alert('Maximum 2 Adults allowed per room.');
      return;
    }
    if (label.includes('child') && currentCount >= 1) {
      alert('Maximum 1 Child (with bed) allowed per room.');
      return;
    }
    if (label.includes('infant') && currentCount >= 2) {
      alert('Maximum 2 Infants allowed per room.');
      return;
    }

    traveller.count++;
    this.calculateTotalAmount();
  }

  decreaseCount(roomIndex: number, traveller: any): void {
    if (traveller.count > 0) {
      traveller.count--;
      this.calculateTotalAmount();
    }
  }

  randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calculateTotalAmount(): void {
    let totalAdults = 0;
    let totalChildren = 0;
    let totalRooms = this.rooms.length;
    // let transport=this.transportPrice;
    this.rooms.forEach(room => {
      room.travellers.forEach(traveller => {
        if (traveller.type.toLowerCase().includes('adult')) {
          totalAdults += traveller.count;
        }
        if (traveller.type.toLowerCase().includes('child')) {
          totalChildren += traveller.count;
        }

      });
    });
    if (totalAdults === 0 && totalChildren === 0) {
      totalRooms = 0;
    }

    const totalAmount = (totalAdults * this.adultPrice) + (totalChildren * this.childPrice) + (totalRooms * this.roomCharge) + (this.transportPrice);
    this.totalAmount = totalAmount;
  }

  togglePopup(): void {
    this.showPopup1 = !this.showPopup1;
  }
  showPopup11: boolean = false;

  openPopup11(): void {
    this.showPopup11 = true;
  }

  closePopup11(): void {
    this.showPopup11 = false;
  }

}