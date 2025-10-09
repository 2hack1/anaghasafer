import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServicesService } from '../../../core/services/userService/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-payment-destination',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payment-destination.component.html',
  styleUrl: './payment-destination.component.scss'
})
export class PaymentDestinationComponent implements OnInit {

showQrModal=true;

  showpaymess:boolean=false;
  openSection: string | null = 'upi';
  // default open section
  toggleAccordion(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }
  // paylater 
  openSectionpay: string | null = null;
  toggleAccordionpay(section: string) {
    if (this.openSectionpay === section) {
      this.openSectionpay = null;
    } else {
      this.openSectionpay = section;
    }
  }
  // Netbanking 
  openSectionnet: string | null = null;
  toggleAccordionnet(section: string) {
    if (this.openSectionnet === section) {
      this.openSectionnet = null;
    } else {
      this.openSectionnet = section;
    }
  }
  // CARDS 
  openSection2: string = '';
  cardForm: FormGroup;
  constructor(private fb: FormBuilder,private userservice:UserServicesService,private actirouter:ActivatedRoute ,private paymentService: AxiosService) {
    this.cardForm = this.fb.group({
      cardHolder: [
        '', [Validators.required, Validators.minLength(3)]]
      , cardNumber:
        ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryMonth:
        ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]],
      expiryYear:
        ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }
normalpayment:any;
encryptpayment:any;
desName:any;
decryptpayment:any;

  ngOnInit(): void {
   this.actirouter.params.subscribe(params => {
  this.normalpayment = params['amount'] || null;
  this.desName = params['tour'] || null;
  this.encryptpayment = params['touramount'] || null;

});


    
  this.decryptpay(this.encryptpayment,this.desName)

  }


decryptpay(encryptpay: string, desname: any) {
  if (!encryptpay || !desname) {
    console.warn('Missing encryption data.');
    return;
  }

  let decrypted = encryptpay;

  // Calculate how many times it was encrypted
  const decryptTimes = 3 + ((desname?.length ?? 1) - 1);

  // Reverse Base64 decoding that many times
  for (let i = 0; i < decryptTimes; i++) {
    try {
      decrypted = atob(decrypted);
    } catch (e) {
      console.error('Error during decryption:', e);
      break;
    }
  }

  this.decryptpayment = decrypted;
  console.log('Decrypted Payment Amount:', this.decryptpayment);
}


  toggleAccordion2(section: string) {
    this.openSection = this.openSection === section ? '' : section;
  }
  submitCard() {
    if (this.cardForm.valid) {
      console.log('Card Details:', this.cardForm.value);
      alert('Card details submitted successfully!');
    } else {
      alert('Please fill all fields correctly.');
    }
  }
  // openSection3: string = '';
  selectedBank: string = '';
  // List of Netbanking banks 
  netBanks = [{ id: 'hdfc', name: 'HDFC Bank' },
  { id: 'Pnb', name: 'Punjab National Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' }];
  // Toggle Netbanking accordion (renamed function to avoid clashes) 
  toggleNetbankingAccordion() {
    this.openSection = this.openSection === 'netbanking' ? '' : 'netbanking';
  }
  // Handle Netbanking payment (renamed function to avoid clashes)
  processNetbankingPayment() {
    if (!this.selectedBank) {
      alert('Please select a bank before proceeding.');
      return;
    }
    console.log('Redirecting to bank:', this.selectedBank);

    // Add your payment gateway integration here 
    } 
    // component.ts 
    showMoreBanks: boolean = false;
    toggleMoreBanks() {
      this.showMoreBanks = !this.showMoreBanks;
    }
  
selectedPayment: string = '';
paymentMethod(paymethod: string) {
  this.selectedPayment = paymethod;
  console.log("payment method", paymethod);

  const unsupportedMethods = [
    'SBIBank', 'BOBBank', 'BOIBank', 'ICICIBank', 
    'HDFCBank', 'AxisBank', 'KotakMahindraBank', 
    'Simpl', 'LazyPay'
  ];

  this.showpaymess = unsupportedMethods.includes(paymethod);
  console.log("this.showpaymess:",this.showpaymess)
  if(!this.showpaymess){
    // this.showpaymess=   
    this.showQrModal=true;
    this.qrImageUrl = ''; // reset to show loader
    this.genrated();
  }
}
// formattedTime: string = '05:00'; // mm:ss display
qrCodeUrl: string = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=demo@upi&pn=Demo%20User';

closeQrModal() {
  this.showQrModal = false;
}

genQRcode(){
  if(!this.showpaymess){
    this.showQrModal=true;
    this.qrImageUrl = ''; // reset to show loader
    this.genrated();
  }
}
// **********************************  this is for payment *****************
qrImageUrl: string | null = null;
  qrId: string | null = null;
  showQR: boolean = false;
  isLoading: boolean = false;

  interval: any;
  countdownInterval: any;
  timeLeft: number = 0; // seconds
  formattedTime: string = '05:00'; // mm:ss display

  // Step 1: Generate QR
  genrated() {
    this.isLoading = true;
    
    const a= new FormData();
    a.append('amount','1')
    this.paymentService.createQR(a).then((res: any) => {
      this.qrImageUrl = res.data.qr_code.image_url;
      this.qrId = res.data.qr_code.id;
      this.showQR = true;
      this.isLoading = false;

      // Start 5 min timer (300 seconds)
      this.startCountdown(300);

      // Step 2: Start polling
      this.startPolling();
    }).catch(() => {
      this.isLoading = false;
    });
  }

  // Countdown timer for 5 min
  startCountdown(seconds: number) {
    this.timeLeft = seconds;
    this.updateFormattedTime(); // show immediately
    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      this.timeLeft--;
      this.updateFormattedTime();
      if (this.timeLeft <= 0) {
        this.expireQR();
      }
    }, 1000);
  }

  // Format seconds → mm:ss
  updateFormattedTime() {
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    this.formattedTime =
      `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  // Poll backend for QR status
  startPolling() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.qrId) return;

      this.paymentService.checkQR(this.qrId).then((res: any) => {
        if (res.data.payments > 0 || res.data.status === 'closed') {
          this.expireQR();
        }
      });
    }, 5000);
  }

  // Handle QR expiration or payment
  expireQR() {
    this.showQR = false;
    clearInterval(this.interval);
    clearInterval(this.countdownInterval);
    
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.countdownInterval);
  }

}
