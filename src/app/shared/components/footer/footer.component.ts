import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterLink } from "../../../../../node_modules/@angular/router/router_module.d-DIceKvcB";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  email: string = '';
  message: string = '';
  constructor(private as_: AxiosService, private route: Router) { }
  ngOnInit(): void {
    this.footerData();
    this.pushDataForGuard();
  }

  pushDataForGuard(){

  // Generate two random long values and encrypt them (simple base64 encoding for demonstration)
  const longValue1 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const longValue2 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);


  // const encryptedValue1 = btoa(longValue1.toString());
  // const encryptedValue2 = btoa(longValue2.toString());

  this.as_.tokenization=btoa(longValue1.toString());
  this.as_.utilization=btoa(longValue2.toString());
  sessionStorage.setItem('tokenization', this.as_.tokenization);
  sessionStorage.setItem('utilization', this.as_.utilization);
  
  
  }
  footerdata: any;
  footerData() {
    this.as_.footerShowPackageName().then((res: any) => {
      console.log(res.data);
      this.footerdata = res.data;
    }).catch((err: any) => {

      console.log(err);
    })
  }

  randorwithid(id: any) {
    this.route.navigate(['/view', id]);
  }

  submitEmail() {
    if (!this.email) {
      alert('Please enter your email.');

      return;
    }

    // Simple email regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      alert('Please enter a valid email address.');
      return;
    }



    this.email = '';
    this.message = 'Subscription successful!......';
    setTimeout(() => {
      this.message = '';
    }, 3000);

  }

}
