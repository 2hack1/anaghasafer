import { Component, OnInit, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { error } from 'jquery';

@Component({
  selector: 'app-hotel-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-policy.component.html',
  styleUrls: ['./hotel-policy.component.scss']
})
export class HotelPolicyComponent implements OnInit {
  vendorData: any = null;
ngOnInit(): void {
this.fatchVendorData();
}
constructor(private service:AxiosService){}

fatchVendorData(){
    this.service.getvendoralldata(1)
      .then((res: any) => {
        console.log('res :', res);
        this.vendorData = res.data;  // store vendor data
      })
      .catch((err: any) => {
        console.error('error :', err);
      });
  }


  // qrImageUrl: string | null = null;
  // qrId: string | null = null;
  // showQR: boolean = false;
  // isLoading: boolean = false;

  // interval: any;
  // countdownInterval: any;
  // timeLeft: number = 0; // seconds
  // formattedTime: string = '05:00'; // mm:ss display

  // constructor(private paymentService: AxiosService) {}

  // ngOnInit() {}

  // Step 1: Generate QR
  // genrated() {
  //   this.isLoading = true;
    
  //   const a= new FormData();
  //   a.append('amount','1')
  //   this.paymentService.createQR(a).then((res: any) => {
  //     this.qrImageUrl = res.data.qr_code.image_url;
  //     this.qrId = res.data.qr_code.id;
  //     this.showQR = true;
  //     this.isLoading = false;

  //     // Start 5 min timer (300 seconds)
  //     this.startCountdown(300);

  //     // Step 2: Start polling
  //     this.startPolling();
  //   }).catch(() => {
  //     this.isLoading = false;
  //   });
  // }

  // Countdown timer for 5 min
  // startCountdown(seconds: number) {
  //   this.timeLeft = seconds;
  //   this.updateFormattedTime(); // show immediately
  //   clearInterval(this.countdownInterval);
  //   this.countdownInterval = setInterval(() => {
  //     this.timeLeft--;
  //     this.updateFormattedTime();
  //     if (this.timeLeft <= 0) {
  //       this.expireQR();
  //     }
  //   }, 1000);
  // }

  // Format seconds → mm:ss
  // updateFormattedTime() {
  //   const m = Math.floor(this.timeLeft / 60);
  //   const s = this.timeLeft % 60;
  //   this.formattedTime =
  //     `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  // }

  // Poll backend for QR status
  // startPolling() {
  //   clearInterval(this.interval);
  //   this.interval = setInterval(() => {
  //     if (!this.qrId) return;

  //     this.paymentService.checkQR(this.qrId).then((res: any) => {
  //       if (res.data.payments > 0 || res.data.status === 'closed') {
  //         this.expireQR();
  //       }
  //     });
  //   }, 5000);
  // }

  // Handle QR expiration or payment
  // expireQR() {
  //   this.showQR = false;
  //   clearInterval(this.interval);
  //   clearInterval(this.countdownInterval);
  // }

  // ngOnDestroy() {
  //   clearInterval(this.interval);
  //   clearInterval(this.countdownInterval);
  // }


}
