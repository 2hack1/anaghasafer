import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { UserServicesService } from '../../../core/services/userService/user-services.service';




@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {
  check=true;
  nothavebooking:boolean=false
  nothaveoder:boolean=false
  selectedTab = 0;
   booking :any={}
   userdata:any;
   
  selectTab(index: number) {
    this.selectedTab = index;
  }

  constructor(private router:ActivatedRoute,private service:AxiosService,private userservice:UserServicesService){}

  
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
  console.log("data not have")
} else {
  this.nothavebooking = false;
    console.log("data have")
  // this.booking = res.data[0];
  this.booking=res.data

}

  }).catch((err:any)=>{
      this.nothavebooking = true;
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
  console.log("data not have order")
} else {
  console.log("data  have order" )
  this.nothaveoder = false;
  // this.booking = res.data[0];
  

}
}).catch((err:any)=>{
   this.nothaveoder = true;
  console.error(err)
})
}

  onClickCallProfile() {
    this.userservice.callProfileFunction();
    this.check=!this.check;
    console.log("onClickCallProfile  on profile",this.check);
  }
}
