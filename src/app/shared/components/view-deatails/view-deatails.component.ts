import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-deatails',
  imports: [CommonModule],
  templateUrl: './view-deatails.component.html',
  styleUrl: './view-deatails.component.scss'
})
export class ViewDeatailsComponent {
  days = [
    {
      title: 'Day 1:',
      subtitle: 'Delhi to Manali',
      description: 'The Spiti Valley Road Trip expedition will start from Delhi; our team will be receiving you from the pickup point.',
      open: false
    },
    {
      title: 'Day 2:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    },
    {
      title: 'Day 3:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    },
    {
      title: 'Day 4:',
      subtitle: 'Arrive Manali & Explore Local',
      description: 'Full day in Manali exploring the local culture, monasteries, temples and nearby points of interest.',
      open: false
    }
  ];

  toggleDay(index: number) {
    this.days[index].open = !this.days[index].open;
  }

  
}
