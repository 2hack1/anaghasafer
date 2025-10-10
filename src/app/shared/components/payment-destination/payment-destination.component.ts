import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServicesService } from '../../../core/services/userService/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-payment-destination',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payment-destination.component.html',
  styleUrl: './payment-destination.component.scss'
})
export class PaymentDestinationComponent implements OnInit {

showQrModal=false;
   shwomesswhenexpireQRcode=false;
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
  constructor(private fb: FormBuilder,private userservice:UserServicesService,private actirouter:ActivatedRoute ,private paymentService: AxiosService,private route:Router) {
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

data: {
  destinationId: any;
  subdesId?: any;
  packagesId?: any;
  transaction_id?: any;
  payment_status?: any;
  payment_method?: any;
  total_amount?: any;
  month?: any;
  date?: any;
  adult?: any;
  children?: any;
  infant?: any;
} = {
  destinationId: null,
  subdesId: null,
  packagesId: null,
  transaction_id: null,
  payment_status: null,
  payment_method: null,
  total_amount: null,
  month: null,
  date: null,
  adult: null,
  children: null,
  infant: null
};

user_id:any;
  ngOnInit(): void {
 this.user_id=sessionStorage.getItem('userid');
    this.actirouter.queryParams.subscribe(queryParams => {
    console.log('Query Params:', queryParams);

    this.data.destinationId = queryParams['destinationId'];
    this.data.subdesId = queryParams['subdes'];
    this.data.packagesId = queryParams['package'];
    this.data.month = queryParams['month'];
    this.data.date = queryParams['date'];
    this.data.adult = queryParams['adult'];
    this.data.children = queryParams['children'];
    this.data.infant = queryParams['infant'];
  });
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
}
// formattedTime: string = '05:00'; // mm:ss display
qrCodeUrl: string = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=demo@upi&pn=Demo%20User';

closeQrModal() {
  this.showQrModal = false;
   this.expireQR()
}

genQRcode(){
  if(!this.showpaymess && this.selectedPayment){
    this.showQrModal=true;
    this.qrImageUrl = ''; // reset to show loader
    this.genrated();
  }else{
    alert('Please select a payment method before proceeding.');
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
    // a.append('amount',this.decryptpayment)
    a.append('amount','1')
    this.paymentService.createQR(a).then((res: any) => {
      this.shwomesswhenexpireQRcode=false;
      this.qrImageUrl = res.data.qr_code.image_url;
      this.qrId = res.data.qr_code.id;
      this.showQR = true;
      this.isLoading = false;

      // Start 5 min timer (300 seconds) ***************************************

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
    if(!this.user_id){
      alert("Something went wrong. Please log in before proceeding with the payment.")
     return;
    }
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.qrId) return;
// ************************************************ after used
      // this.paymentService.checkQR(this.qrId).then((res: any) => {
      //   if(!res.data){
      //     return
      //   }else{
      //     this.orderset(res.data.transaction_id,res.data.payment_status,res.data.payment_method,res.data.total_amount);
      //   }
      //   // if (res.data.payments > 0 || res.data.status === 'closed') {
      //   //   this.expireQR();
      //   // }
      // });
      this.paymentService.checkQR(this.qrId).then((res: any) => {


        console.log("this si checkQR data check care fully:",res)
  const data = res?.data;

  if (!data || !data.payment_details || data.payment_details.length === 0) {
    return;
  }

  // Get the first payment (you can loop if multiple)
  // const payment = data.payment_details[0];

  // Prepare correctly structured data
   const transaction_id = res.data.payment_details[0].transaction_id;
   const payment_status = res.data.payment_details[0].status; // 'captured', 'authorized', etc.
   const payment_method = res.data.payment_details[0].status;
   const total_amount = Number(res.data.payment_details[0].amount) / 100;
 // Convert from paise to INR
  console.log('transaction_id:', transaction_id);
  console.log('payment_status:', payment_status);
  console.log('payment_method:', payment_method);
  console.log('total_amount:', total_amount);
  // Pass clean structured data to your order setter
     this.orderset(transaction_id, payment_status, payment_method,total_amount);
     // if (res.data.payments > 0 || res.data.status === 'closed') {
      //   //   this.expireQR();
      //   // }
});

    }, 5000);
  }

  // Handle QR expiration or payment
  expireQR() {
     this.paymentService.QRexpire(this.qrId).then((res:any)=>{
  console.log("Qrcode expire",res);
       }).catch((err:any)=>{
        console.error("error in expiary",err)
       })
    this.showQR = false;
    clearInterval(this.interval);
    clearInterval(this.countdownInterval);
    this.shwomesswhenexpireQRcode=true;

    
    // console.log("QRCODEexpiry")
    
  }
//   adult
// : 
// "1"
// children
// : 
// "0"
// dateId
// : 
// "81"
// destinationId
// : 
// "12"
// infant
// : 
// "0"
// monthId
// : 
// "167"
// packagesId
// : 
// "127"
// payment_method
// : 
// "netbanking"
// payment_status
// : 
// "1514"
// subdesId
// : 
// "24"
// total_amount
// : 
// "captured"
// transaction_id
// : 
// "pay_9QB6MYNFAXC75gvR"
// userId
// : 
// "1"

// {
//     "qr_id": "qr_RRkcStFQZL5hSt",
//     "status": "active",
//     "payments": 1,
//     "payment_details": [
//         {
//             "transaction_id": "pay_81GvZe2ltG9nTJ4X",
//             "amount": 350900,
//             "currency": "INR",
//             "status": "failed",
//             "method": "wallet",
//             "order_id": "order_H6gNENhP7T",
//             "notes": {
//                 "tour": "mock-tour-17",
//                 "source": "mock-test"
//             },
//             "created_at": "2025-10-10 10:55:25"
//         }
//     ]
// }


  orderset(transactionId:string,status:string ,method:string,totalAamount:Number){
      this.data.transaction_id = transactionId;
      this.data.payment_status = status;
      this.data.payment_method = method;
      this.data.total_amount = totalAamount;
  const data=new FormData();
    data.append('userId', this.user_id);
    data.append('destinationId', this.data.destinationId);
    data.append('subdesId', this.data.subdesId);
    data.append('packagesId', this.data.packagesId);
    data.append('transaction_id', this.data.transaction_id);
    data.append('payment_status', this.data.payment_status);
    data.append('payment_method', this.data.payment_method);
    data.append('total_amount', this.data.total_amount);
    data.append('monthId', this.data.month);
    data.append('dateId', this.data.date);
    data.append('adult', this.data.adult);
    data.append('children', this.data.children);
    data.append('infant', this.data.infant);
  this.paymentService.sendwithpaymentDetails(data).then((res:any)=>{
         console.log("res when send the data",res)
           const encryptedId = btoa(this.user_id.toString()); // convert to Base64
          this.route.navigate(['/profile',encryptedId]);
  }).catch((err:any)=>{
    console.error("error:",err);
  })
  

  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.countdownInterval);
  }

}
