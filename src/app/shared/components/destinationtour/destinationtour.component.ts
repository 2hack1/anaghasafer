import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinationtour',
  imports: [CommonModule ,RouterLink],
  templateUrl: './destinationtour.component.html',
  styleUrl: './destinationtour.component.scss'
})
export class DestinationtourComponent {


  showFilters: boolean = false;
  filterButtonText: string = 'Show Filters';

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.filterButtonText = this.showFilters ? 'Hide Filters' : 'Show Filters';
  }

  packages = [
    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
      ],
      price: 20600
    },

    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
       
      ],
      price: 20600
    },
    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
       
      ],
      price: 20600
    },
    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
       
      ],
      price: 20600
    },
    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
       
      ],
      price: 20600
    },
    {
      title: 'DWARKA BET DWARKA-SOMNATH WITH SASAN GIR EX RAJKOT',
      image: 'assets/6 images/kashmir.jpg',
      details: [
        { label: 'Duration', value: '4 Nights/5 Days' },
        { label: 'Origin', value: 'Rajkot' },
        { label: 'Departure', value: 'Daily' },
        { label: 'Package Code', value: 'WAH11' },
        { label: 'Destination', value: 'Dwarka / Nageshwar / Porbandar / Somnath' },
        { label: ' Date Of Journey', value: ' Multiple Options' },
       
      ],
      price: 20600
    },
    // You can add more packages here
  ];

}
 