import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-statestours',
  imports: [RouterLink,CommonModule],
  templateUrl: './statestours.component.html',
  styleUrl: './statestours.component.scss'
})
export class StatestoursComponent {

  sliderGroups = [
    [
      { name: 'Delhi', image: 'assets/6 images/delhi.jpg', packages: '30+' },
      { name: 'Gujrat', image: 'assets/6 images/gujrat.jpg', packages: '41+' },
      { name: 'Kashmir', image: 'assets/6 images/kashmir.jpg', packages: '35+' },
      { name: 'Madhya Pradesh', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ],
    [
      { name: 'Andhra Pradesh', image: 'assets/6 images/delhi.jpg', packages: '40+' },
      { name: 'Arunachal Pradesh', image: 'assets/6 images/gujrat.jpg', packages: '12+' },
      { name: 'Uttarakhand', image: 'assets/6 images/kashmir.jpg', packages: '10+' },
      { name: 'Uttar Pradesh', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ],
    [
      { name: 'Mizoram', image: 'assets/6 images/delhi.jpg', packages: '40+' },
      { name: 'Nagaland', image: 'assets/6 images/gujrat.jpg', packages: '12+' },
      { name: 'Odisha', image: 'assets/6 images/kashmir.jpg', packages: '10+' },
      { name: 'Punjab', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ],
    [
      { name: 'Rajasthan', image: 'assets/6 images/delhi.jpg', packages: '40+' },
      { name: 'Sikkim', image: 'assets/6 images/gujrat.jpg', packages: '12+' },
      { name: 'Tamil Nadu', image: 'assets/6 images/kashmir.jpg', packages: '10+' },
      { name: 'Tripura', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ],
    [
      { name: 'Chhattisgarh', image: 'assets/6 images/delhi.jpg', packages: '40+' },
      { name: 'Goa', image: 'assets/6 images/gujrat.jpg', packages: '12+' },
      { name: 'Haryana', image: 'assets/6 images/kashmir.jpg', packages: '10+' },
      { name: 'Himachal Pradesh', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ],
    [
      { name: 'Jharkhand', image: 'assets/6 images/delhi.jpg', packages: '40+' },
      { name: 'Karnataka', image: 'assets/6 images/gujrat.jpg', packages: '12+' },
      { name: 'Manipur', image: 'assets/6 images/kashmir.jpg', packages: '10+' },
      { name: 'Meghalaya', image: 'assets/6 images/mp.jpg', packages: '44+' },
    ]
  ];
  
}
