import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AxiosService } from '../../../core/services/axios/axios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filterpackages',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './filterpackages.component.html',
  styleUrl: './filterpackages.component.scss'
})
export class FilterpackagesComponent implements OnInit {

 backendUrl = environment.backend_url + '/storage/';

  constructor(private routes: ActivatedRoute, private as_: AxiosService) { }
  catchRouteId: any | null = null;
  package: any[] = [];
  selectedFilters: string[] = []; // Hold
// filters:any;


  ngOnInit(): void {
    this.catchRouteId = this.routes.snapshot.paramMap.get('id');

  this.getPackagesWithFilters();
    this.getpackages(this.catchRouteId);
    
 this.routes.queryParams.subscribe(params => {
   const filter = {
    selectedMonth: params['selectedMonth'],   // ✅ backend expects this
    destination: params['destination'],       // ✅ backend expects this
    minPrice: params['minPrice'],             // ✅ backend expects this
    maxPrice: params['maxPrice']              // ✅ backend expects this
  };
      // console.log('Destination:', destination);
     
      this.getallfilpackages(filter);
    });
}



check:any;
getallfilpackages(data : any){
  // console.log("data:",data)
this.as_.getfilterpackages(data).then((res:any)=>{
    this.check=res.data.data;

      console.log("check:",this.check);
}).catch((erro)=>{

  console.log(erro);
})
}

  getpackages(id:any) {
    this.as_.getPackages(id).then((res) => {
      console.log("ALL Packages :",res.data);
    
         }).
      catch((err) => {
        console.error(err);
      });
  // vpo-35
  }
  showFilters: boolean = false;
  filterButtonText: string = 'Show Filters';

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.filterButtonText = this.showFilters ? 'Hide Filters' : 'Show Filters';
  }

 filters: any = {
    moreDays: false,
    fourDays: false,
    lessThanFourDays: false,
    oneDay: false,
    all: false,
    international: false,
    wellness: false
  };

  filterLabels: any = {
    moreDays: "More Days",
    fourDays: "4 Days",
    lessThanFourDays: "Less Than 4 Days",
    oneDay: "1 Day",
    all: "All",
    international: "International",
    wellness: "Wellness"
  };

  priceFilters: any = {
    expensive: false,
    under10000: false,
    over6000: false,
    lowPricing: false
  };

  priceLabels: any = {
    expensive: "Expensive Tours",
    under10000: "Under of Price 10000",
    over6000: "Over of Price 6000",
    lowPricing: "Low Pricing"
  };



  objectKeys = Object.keys;

  getPackagesWithFilters() {
    const selectedMain = Object.keys(this.filters).filter(key => this.filters[key]);
    const selectedPrice = Object.keys(this.priceFilters).filter(key => this.priceFilters[key]);

    const mainLabels = selectedMain.map(key => this.filterLabels[key]);
    const priceLabels = selectedPrice.map(key => this.priceLabels[key]);

    const combinedFilters = [...mainLabels, ...priceLabels];
      console.log("in the filter :",combinedFilters);
     console.log("id ;",this.catchRouteId)

     
    // this.as_.getPackagesWithFilter(this.catchRouteId,combinedFilters)
    //   .then((res: any) => {
    //     console.log('Filtered Packages:', res.data);
    //     this.package =res.data;
    //     // Optionally store in a variable for use in HTML
    //   })
    //   .catch(err => {
    //     console.error('API error:', err);
    //   });
  }

  
}
