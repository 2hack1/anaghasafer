import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';


@Component({
  selector: 'app-particular-hotel-room-data',
  imports: [CommonModule,FormsModule],
  templateUrl: './particular-hotel-room-data.component.html',
  styleUrl: './particular-hotel-room-data.component.scss'
})
export class ParticularHotelRoomDataComponent implements OnInit {
    guest = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    hasGST: false
  };

  chek="dekhte hai";
  infodata:any;
  filter:any;
  checkin:any;
  checkout:any;

    checkInDay: string = '';
  checkInDateFormatted: string = '';
  checkInTimeFormatted: string = '';

  checkOutDay: string = '';
  checkOutDateFormatted: string = '';
  checkOutTimeFormatted: string = '';
   persion:any;
   checkCharges:any;
constructor(private route:ActivatedRoute , private service:AxiosService){
 this.route.queryParams.subscribe(query =>{
 
     this.filter = {
          check_in_date: query['check_in_date'],
          check_out_date: query['check_out_date'],
          roomType: query['roomType'],
          hotel_roomId: query['hotel_roomId'],
          hotel_vendor_id: query['hotel_vendor_id'],
          rooms: query['rooms_required'],
        };

 

 });
 if(this.filter){
  this.service.getinfo(this.filter.hotel_vendor_id,
    this.filter.hotel_roomId).then((res:any)=>{
    console.log(res.data.data);
    this.infodata=res.data.data;
  this.checkin=this.infodata.checkInTime;
  this.checkout=this.infodata.checkOutTime
     this.formatDates(this.checkin,this.checkout);


      const charges = parseFloat(this.infodata?.cancellation_charges || "0");

          if (charges === 0) {
            this.checkCharges = "Refundable when cancel in  24 hour ";
          } else {
            this.checkCharges = "Non-Refundable";
          }
  }).catch((err:any)=>{
    console.error(err);
  })
}
}

  ngOnInit(): void {
      
    this.persion=Number(localStorage.getItem('adults'));
  }


  isLoading = false;
   isSuccess = false; 
   registerNow() { this.isLoading = true; this.isSuccess = false;
     // Simulate API call (2 seconds) 
     setTimeout(() => {
       this.isLoading = false; 
       this.isSuccess = true;
       
         }, 
          1000);
         }

formatDates(checkin:any,checkout:any) {
  
  // Detect format
  const ciParts = this.filter.check_in_date.split('-');
  const coParts = this.filter.check_out_date.split('-');

  let checkIn: Date, checkOut: Date;

  if (ciParts[0].length === 4) {
    // Backend gave YYYY-MM-DD
    const [ciYear, ciMonth, ciDay] = ciParts.map(Number);
    const [coYear, coMonth, coDay] = coParts.map(Number);
    checkIn = new Date(ciYear, ciMonth - 1, ciDay);
    checkOut = new Date(coYear, coMonth - 1, coDay);
  } else {
    // Backend gave DD-MM-YYYY
    const [ciDay, ciMonth, ciYear] = ciParts.map(Number);
    const [coDay, coMonth, coYear] = coParts.map(Number);
    checkIn = new Date(ciYear, ciMonth - 1, ciDay);
    checkOut = new Date(coYear, coMonth - 1, coDay);
  }

  this.checkInDay = checkIn.toLocaleDateString('en-US', { weekday: 'short' }); 
  this.checkOutDay = checkOut.toLocaleDateString('en-US', { weekday: 'short' });

  this.checkInDateFormatted = checkIn.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  this.checkOutDateFormatted = checkOut.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  this.checkInTimeFormatted = this.formatTime(checkin);
  this.checkOutTimeFormatted = this.formatTime(checkout);
}

formatTime(time: string): string {
  if (!time) return '';
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}



}
