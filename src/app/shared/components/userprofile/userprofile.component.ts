// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-userprofile',
//   imports: [CommonModule],
//   templateUrl: './userprofile.component.html',
//   styleUrl: './userprofile.component.scss'
// })
// export class UserprofileComponent {

//   selectedTab = 0;

//   selectTab(index: number) {
//     this.selectedTab = index;
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {

  nothavebooking:boolean=false
  selectedTab = 0;
   booking :any={}
   userdata:any;
  selectTab(index: number) {
    this.selectedTab = index;
  }

  constructor(private router:ActivatedRoute,private service:AxiosService){

  }

  
  ngOnInit(): void {
    
   const id = this.router.snapshot.paramMap.get('id');  // read param
   
// const encryptedId = this.route.snapshot.paramMap.get('id');
// this.userid = atob(encryptedId!);

  console.log("Route ID:", id);
 
  // this.getBookingdata(id);
  this.getuserdata(id);
  }


  // booking = {
  //   id: 5,
  //   user_id: 1,
  //   hotel_vendor_id: 1,
  //   hotel_roomId: 1,
  //   check_in_date: '2025-11-20',
  //   check_out_date: '2025-11-29',
  //   adults: 2,
  //   children: 1,
  //   rooms_booked: 1,
  //   rooms_available: null,
  //   room_no: null,
  //   roomType: 'single',
  //   price_per_night: '12000.00',
  //   total_amount: '1300.00',
  //   payment_status: 'pending',
  //   payment_method: 'phone pay',
  //   transaction_id: 'dsfr33f3c333',
  //   status: 'pending',
  //   special_requests: 'no',
  //   created_at: '2025-08-14T10:00:00.000000Z',
  //   updated_at: '2025-08-14T10:00:00.000000Z',
  //   hotel_vendor: {
  //     hotel_vendor_id: 1,
  //     users_id: '1',
  //     vendor_name: 'kapil agrawal',
  //     vendor_email: 'kapil@gmail.com',
  //     Mobilenumber: '9131475945',
  //     vendor_password: '$2y$12$pJ0rYzvwT1HHHdVqIBKcRenym2z57F.Fp1wDqLt0X0APraoU1yjeq',
  //     hotelname: 'raddition',
  //     hoteltype: 'Resort',
  //     totalrooms: '1200',
  //     city: 'gwalior',
  //     state: 'mp',
  //     pincode: '474006',
  //     address: 'morar gwalior',
  //     baseprice: '1200'
  //   }
  // };

getuserdata(id:any){
  this.service.getuserdata(id).then((res:any)=>{
 console.log("user data",res.data)
   this.userdata=res.data;

this.getBookingdata(id);

  }).catch((err:any)=>{
    console.log(err,'user not found');

  })
}


getBookingdata(id:any){
  this.service.getBookingWithuser(id).then((res:any)=>{
 console.log("booking data",res.data )
  
if (!res.data || res.data.length === 0) {
  this.nothavebooking = true;
} else {
  this.nothavebooking = false;
  // this.booking = res.data[0];
  this.booking=res.data

}

  }).catch((err:any)=>{
    console.log(err);
    
  })
}



}
