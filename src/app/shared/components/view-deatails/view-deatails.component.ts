import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { FormsModule } from '@angular/forms';


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
  imports: [CommonModule,FormsModule],
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
  packageprice: any = 0;
  slip=false;
  avoidSlip=true;
  // startdate: string = '';
  
  packageDetails: any = [];
  packag: any[] = [];
  monthDate: any = [];
  itenaries: any = [];
  // data validation
  phoneNumber: string = '';
  termsAccepted: boolean = false;
  startdate:any;
  getEmailsesstion:any
  // afterpay=false;
  ngOnInit() {
    this.packageId = this.Route.snapshot.paramMap.get('id');
    console.log("package id:", this.packageId);
    this.getpackagesdetails(this.packageId);
    this.getmonthAndDate(this.packageId);
    this.getiteraries(this.packageId);
    this.gettransport(this.packageId);
    console.log("++++++++++", this.selectMonth);
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  getpackagesdetails(id: any) {
    this.as_.getPackagesDetails(id).then((res) => {
      this.packageDetails = res.data[0];
      console.log("pakage data", this.packageDetails);
      this.packageprice = this.packageDetails.price_trip;

      this.adultPrice = this.packageprice;
      this.childPrice = (this.packageprice/2);

      console.log("pakage price", this.packageprice)
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
  selectMonth(key: any): void {
    this.selectedMonth = key;
    console.log("sakfpoasfoasdo", this.selectedMonth);
    this.getdate(this.selectedMonth);

  }

  date: any[] = [];
  getdate(id: any) {

    this.as_.getdate(id).then((res) => {
      console.log("dates", res.data);
      this.date = res.data;
      console.log(this.date);
    }).catch((err) => {
      console.error("error", err);
    })
  }

  getiteraries(id: any) {
    this.as_.getIteries(id).then((res) => {
      // console.log("itineries", res.data[0].day_wise_details);
      this.itenaries = res.data[0].day_wise_details;
    }).catch((err) => {
      console.log("error", err);
    })
  }

  trans: any = [];
  gettransport(id: any) {
    this.as_.getTransport(id).then((res) => {
      console.log("Trasports", res.data);
      this.trans = res.data[0].mode;
      console.log("Mode", res.data[0].mode);

    }).catch((err) => {
      console.log("error", err);
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
  opens: boolean = false;

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
    { key: 'train', amount: 0, icon: 'fi fi-ts-subway' },
    { key: 'bus', amount: 0, icon: 'fi fi-ts-bus-alt' },
    { key: 'plane', amount: 0, icon: 'fi fi-ts-plane-alt' },
    { key: 'car', amount: 0, icon: 'fi fi-ts-car-side' }
  ];


  getAvailableModes(): any[] {
    const transKeys = this.trans.map((t: any) => t.key);
    return this.transportModes.filter(mode => transKeys.includes(mode.key));
  }

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
  adultPrice:any;
  childPrice:any;
  // roomCharge = 2000;


  // addRoom(): void {
  //   this.rooms.push({
  //     travellers: [
  //       { type: 'Adult', ageGroup: '(12+ yrs)', count: 1 },
  //       { type: 'Child ', ageGroup: '(12- yrs)', count: 0 },
  //       { type: 'Infant', ageGroup: '(5- yrs)', count: 0 }
  //     ]
  //   });
  //   this.calculateTotalAmount();  // Important!
  // }

  // removeRoom(index: number): void {
  //   this.rooms.splice(index, 1);
  //   this.calculateTotalAmount();
  // }

  increaseCount(roomIndex: number, traveller: any): void {
    const label = traveller.type.toLowerCase();
    const currentCount = traveller.count;

    // if (label.includes('adult') && currentCount >= 2) {
    //   alert('Maximum 2 Adults allowed per room.');
    //   return;
    // }
    // if (label.includes('child') && currentCount >= 1) {
    //   alert('Maximum 1 Child (with bed) allowed per room.');
    //   return;
    // }
    // if (label.includes('infant') && currentCount >= 2) {
    //   alert('Maximum 2 Infants allowed per room.');
    //   return;
    // }

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
    // let totalRooms = this.rooms.length;
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
      // totalRooms = 0;
    } 

    const totalAmount = (totalAdults * this.adultPrice) + (totalChildren * this.childPrice) + (this.transportPrice);
    this.totalAmount = totalAmount;
  }

  // payment validation

  validateForm(): boolean {
    // for (const room of this.rooms) {
    //   for (const traveller of room.travellers) {
    //     if (!traveller.count || traveller.count < 1) {
    //       alert("Each traveller must have a count of at least 1.");
    //       return false;
    //     }
    //   }
    // }
    for (let i = 0; i < this.rooms.length; i++) {
  const room = this.rooms[i];

  // Check if any traveller has count >= 1
  const hasValidTraveller = room.travellers.some(traveller => traveller.count && traveller.count >= 1);

  if (!hasValidTraveller) {
    alert(`Room ${i + 1} must have at least one traveller (Adult, Child, or Infant).`);
    return false;
  }
}


  if (!this.startdate) {
    alert("Please select a travel date.");
    return false;
  }
  

const email = this.getEmailsesstion?.trim();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!email || !emailRegex.test(email)) {
  alert("Please enter a valid email address.");
  return false;
}
  
  const phone = this.phoneNumber;

const phoneRegex = /^\d{10}$/;

if (!phone || !phoneRegex.test(phone.trim())) {
  alert("Please enter a valid 10-digit phone number.");
  return false;
}

  if (!this.termsAccepted) {
    alert("You must accept the terms and conditions.");
    return false;
  }

  if (!this.selectedTransport) {
    alert("Please select a transport option.");
    return false;
  }


  return true;
}
  
  togglePopup(): void {
    this.showPopup1 = !this.showPopup1;
  }
  showPopup11: boolean = false;
showstartdate:string='';
endtdate:string='';
convertmonth:any;
  openPopup11(id:any,starttourdate:any,endtourdate:any): void {
    this.showPopup11 = true;
   this.getEmailsesstion= sessionStorage.getItem('email')
    this.startdate=starttourdate+"  TO  "+endtourdate;
    this.showstartdate=starttourdate;
    this.endtdate=endtourdate;
    this.convertmonth=this.converMonth(starttourdate);
  
    // console.log("dateid",id);
    // console.log("tourdate",this.startdate);
    // console.log("tourmonth",endtourdate);
    // console.log("tourmonth",this.selectedMonth);
  }
  
  // conver month  no. to string 
  converMonth(date:string):string{

    if(!date) return '';
    const[year, month, day]=date.split('-').map(Number);
    const datee=new Date(year,month-1,day);
    console.log("convert month date:",datee)
    // return datee.toLocaleString('default',{month:'short'},{year:'numer'});
    return datee.toLocaleString('default', { month: 'short', year: 'numeric' });

  }

  closePopup11(): void {
    this.showPopup11 = false;
  }

nameOfUser:any;
  submitForm() {
    if(!sessionStorage.getItem('token')){
      alert('please firstly login or signUp')
      return;
    }
  if (this.validateForm()) {
   this.slip=!this.slip;
  this.avoidSlip=!this.avoidSlip;
    console.log("chck")
    this.showPopup11=false;
    this.nameOfUser=sessionStorage.getItem('name');
  }
}

 
printSlip() {
    const printContents = document.getElementById('printArea')?.innerHTML;
    if (!printContents) return;

    const popupWin = document.createElement('iframe');
    popupWin.style.position = 'absolute';
    popupWin.style.top = '-1000px';
    popupWin.style.left = '-1000px';

    document.body.appendChild(popupWin);
    const doc = popupWin.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Tour Slip</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #000;
            }

            .logo {
              width: 120px;
              float: right;
            }

            h2, h3 {
              text-align: center;
              margin: 0;
            }

            .section {
              margin-top: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
              margin-top: 10px;
            }

            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }

            th {
              background-color: #f2f2f2;
            }

            .total-price-btn {
              background-color: purple;
              color: white;
              padding: 10px 20px;
              font-size: 18px;
              border: none;
              border-radius: 6px;
              width: 100%;
              max-width: 300px;
              text-align: center;
              margin: 20px auto;
            }
          </style>
        </head>
        <body onload="window.print(); setTimeout(() => window.close(), 100);">
          ${printContents}
        </body>
      </html>
    `);
    doc.close();
  }

}