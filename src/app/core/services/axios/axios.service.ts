import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.base_url, // Laravel API base URL
      withCredentials: false, // set to true only if using cookies/sessions
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getGreeting() {
    return this.api.get('/greeting'); // Laravel route: /api/greeting
  }

  getimg() {
    return this.api.get('/topimagess');
  }

  // get destinations
  getdes() {
    return this.api.get('/destination/all/des')
  }
  
  getSubDesLimit(id: any) {
    return this.api.get(`/destination/${id}/limit`);
  }

}
