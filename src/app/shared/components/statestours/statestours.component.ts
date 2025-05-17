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
    console.log('Route ID:', this.getroute);
    this.getsubDestinations(this.getroute);
  }

  getsubDestinations(id: any) {
    this.as_.getSubDesAll(id).then((res) => {
      console.log("API Response:", res.data);
      this.getallsubdes = res.data.sub_destinations;
      console.log("All Sub Destinations:", this.getallsubdes);

      // ✅ Group data into chunks of 4 after data is fetched
      this.sliderGroups = this.as_.chunkArray(this.getallsubdes, 4);
    }).catch((err) => {
      console.error("Error fetching data:", err);
    });
  }

 
}
