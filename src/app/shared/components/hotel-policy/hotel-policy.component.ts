import { Component, OnInit, OnDestroy } from '@angular/core';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-policy',
  imports: [CommonModule],
  templateUrl: './hotel-policy.component.html',
  styleUrl: './hotel-policy.component.scss'
})
export class HotelPolicyComponent implements OnInit, OnDestroy {
  qrImageUrl: string | null = null;
  qrId: string | null = null;
  showQR: boolean = false;
  interval: any;

  constructor(private paymentService: AxiosService) {}

  ngOnInit() {}

  // Step 1: Generate QR
  genrated() {
    this.paymentService.createQR().then((res: any) => {
      // console.log("Qr code data", res.data);
      this.qrImageUrl = res.data.qr_code.image_url;
      this.qrId = res.data.qr_code.id;
      this.showQR = true;

      // Step 2: Start polling
      this.startPolling();
    });
  }

  // Step 2: Poll backend for QR status
  startPolling() {
    this.interval = setInterval(() => {
      if (!this.qrId) return;

      this.paymentService.checkQR(this.qrId).then((res: any) => {
        // console.log("QR Status:", res.data);

        // If payment happened, hide QR
        if (res.data.payments > 0 || res.data.status === 'closed') {
          this.showQR = false;
          clearInterval(this.interval);
        }
      });
    }, 5000); // check every 5 sec
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
