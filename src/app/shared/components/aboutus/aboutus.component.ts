import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent implements OnInit {
   

  constructor(private as_:AxiosService){}

  ngOnInit(): void {
    this.getmess();

  }

  getmess() {
    this.as_.getGreeting()
      .then(res => {
        console.log('API Response:', res.data);
        // You can bind res.data.message to a variable if needed
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  }

 

  
}
