import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/api', // Laravel API base URL
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

  getimg(){
    return this.api.get('/topimagess')
  }

}
