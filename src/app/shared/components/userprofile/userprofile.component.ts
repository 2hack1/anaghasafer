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
  nothaveoder:boolean=false
  selectedTab = 0;
   booking :any={}
   userdata:any;
  selectTab(index: number) {
    this.selectedTab = index;
  }

  constructor(private router:ActivatedRoute,private service:AxiosService){

  }

  
  ngOnInit(): void {
    
const encryptedId = this.router.snapshot.paramMap.get('id');
  const id = atob(encryptedId!);

  // console.log("Route ID:", id);
 
  // this.getBookingdata(id);
  this.getuserdata(id);

  }

getuserdata(id:any){
  this.service.getuserdata(id).then((res:any)=>{
//  console.log("user data",res.data)
   this.userdata=res.data;

this.getBookingdata(id);
this.getorderdata(id);

  }).catch((err:any)=>{
    // console.log(err,'user not found');
  })
}

bookingData:any=[];
getBookingdata(id:any){
  this.service.getBookingWithuser(id).then((res:any)=>{
//  console.log("booking data",res.data )
  this.bookingData=res.data;
if (!res.data || res.data.length === 0) {
  this.nothavebooking = true;
} else {
  this.nothavebooking = false;
  // this.booking = res.data[0];
  this.booking=res.data

}

  }).catch((err:any)=>{
    // console.log(err);
    
  })
}
cancelBooking(){

  if(window.confirm('Are you sure you want to cancel this booking?')){
   alert('Booking cancelled.');
  }else{
     alert('Action cancelled.');
  }
  
}
packageData: any = {};   // keep it as an object
itinaries:any;
getorderdata(id:any){
this.service.getOrderDataOnUserProfile(id).then((res:any)=>{
  // console.log('data.....: ',res.data[0].iteneris)
  // this.itinaries=res.data[0].iteneris;
  this.itinaries = res.data[0]?.iteneris || [];
  // console.log("jdfsjdfl",this.itinaries)
  this.packageData=res.data;
  // console.log('packageData ',this.packageData)
if (!res.data || res.data.length === 0) {
  this.nothaveoder = true;
} else {
  this.nothaveoder = false;
  // this.booking = res.data[0];
  

}
}).catch((err:any)=>{
  
  console.error(err)
})
}

}
