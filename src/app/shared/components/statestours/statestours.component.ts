import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';

@Component({
  selector: 'app-statestours',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './statestours.component.html',
  styleUrl: './statestours.component.scss'
})
export class StatestoursComponent implements OnInit {

  constructor(
    private routes: ActivatedRoute,
    private as_: AxiosService
  ) {}

  getroute: any | null = null;
  getallsubdes: any[] = [];
  sliderGroups: any[][] = [];

  ngOnInit(): void {
    this.getroute = this.routes.snapshot.paramMap.get('id');
    this.as_.destination_id=this.getroute;
    console.log('Route ID:', this.getroute);
    this.getsubDestinations(this.getroute);
  }
  getsubDestinations(id: any) {
    this.as_.getSubDesAll(id).then((res) => {
      console.log("API Response:", res.data);
      this.getallsubdes = res.data.sub_destinations;
     
      console.log("All Sub Destinations:", this.getallsubdes);

      this.sliderGroups = this.chunkArray(this.getallsubdes, 5);
      console.log("slidergroups:",this.sliderGroups);
    }).catch((err) => {
      console.error("Error fetching data:", err);
    });
  }

 chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
 
}
