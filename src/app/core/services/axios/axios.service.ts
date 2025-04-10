import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  api: Axios

  constructor() {
    this.api = axios.create({
      baseURL: "",
      withCredentials: false
    })
  }

}
