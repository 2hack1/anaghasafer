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


  // this.getPackagesWithFilters();
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
            this.catchRouteId =res.data.data[0].sub_destination_id    ;
            // console.log('cnsd',this.catchRouteId)
      // console.log("check:",this.check);
      // console.log("check:check:",this.check[0].images[0].img);
}).catch((erro)=>{
     console.error(erro);
  // console.log(erro);
})
}
filterdata:any;
  getpackages(id:any) {
    this.as_.getPackages(id).then((res) => {
      console.log("ALL Packages :",res.data);
       this.filterdata=res.data;
   this.showfilter=true;
         }).
      catch((err) => {
        console.error(err);
           this.showfilter=true;
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

showfilter:boolean=false;

  objectKeys = Object.keys;  
loadingText: string = '';
loadingInterval: any;

getPackagesWithFilters(selectedKey?: string) {
  // If a key is provided, uncheck all other filters
  if (selectedKey) {
    Object.keys(this.filters).forEach(key => {
      this.filters[key] = (key === selectedKey);
    });
  }

  // Collect selected filters
  const selectedMain = Object.keys(this.filters).filter(key => this.filters[key]);
  const selectedPrice = Object.keys(this.priceFilters).filter(key => this.priceFilters[key]);

  const mainLabels = selectedMain.map(key => this.filterLabels[key]);
  const priceLabels = selectedPrice.map(key => this.priceLabels[key]);

  const combinedFilters = [...mainLabels, ...priceLabels];

  // console.log("in the filter:", combinedFilters);
  // console.log("id:", this.catchRouteId);

  // Start loading indicator
  this.loadingText = 'Searching';
  let dotCount = 0;
  this.loadingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // cycles 0 → 1 → 2 → 3
    this.loadingText = 'Searching' + '.'.repeat(dotCount);
  }, 500);

  this.as_.getPackagesWithFilterdss(this.catchRouteId, combinedFilters)
    .then((res: any) => {
      clearInterval(this.loadingInterval); // stop animation

      if (res.data && res.data.length > 0) {
        this.loadingText = 'Search Completed';
      } else {
        this.loadingText = 'No matching tour found';
      }

      // console.log('Filtered Packages:', res.data);
      this.package = res.data;
    })
    .catch(err => {
      clearInterval(this.loadingInterval);
      this.loadingText = 'no matching tour found';
      console.error('API error:', err);
    });
}

}
