import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-destinationtour',
  imports: [CommonModule, RouterLink],
  templateUrl: './destinationtour.component.html',
  styleUrl: './destinationtour.component.scss'
})
export class DestinationtourComponent implements OnInit {
  backendUrl = environment.backend_url + '/storage/';

  constructor(private routes: ActivatedRoute, private as_: AxiosService) { }
  catchRouteId: any | null = null;
  package: any[] = [];

  ngOnInit(): void {
    this.catchRouteId = this.routes.snapshot.paramMap.get('id');
    // console.log(this.catchRouteId);
    this.getpackages(this.catchRouteId);
  }

 

  getpackages(id: any) {
    this.as_.getPackages(id).then((res) => {
      console.log("ALL Packages :",res.data);

      this.package = res.data;
    }).
      catch((err) => {
        console.error(err);
      });

  }
  showFilters: boolean = false;
  filterButtonText: string = 'Show Filters';

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.filterButtonText = this.showFilters ? 'Hide Filters' : 'Show Filters';
  }


}
