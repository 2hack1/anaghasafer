import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { data } from 'jquery';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  api: AxiosInstance;


  // for  set in the order in backand db  of this variable date 

  destination_id: number;
  subdes_id: number;
  package_id: number;
  month_id: number;
  date_id: number;
  user_id: any;


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


  //  pakageprice:any;
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

  getSubDesAll(id: any) {
    return this.api.get(`/destination/${id}`);
  }
  // getfilterpackages(data:any){
  // }


  // *********************************************************

  getPackagePlaceName() {
    return this.api.get('/pac/places');
    
  }
  
  getOrderDataOnUserProfile(id:any){
    return this.api.get(`/orderbyid/${id}`);

  }
  // *********************************************************


  getfilterpackages(params: any) {
    return this.api.get(`/top/filter`, { params });
  }

  getPackages(id: any) {
    return this.api.get(`/packages/${id}`);
  }

  getPackagesDetails(id: any) {
    return this.api.get(`/packages/${id}/details`);
  }

  // *********************** with filer

  getPackagesWithFilter(subDesId: number, filters: string[]) {
    return this.api.post(`/packages/${subDesId}/details/filter`, {
      filters: filters
    });
  }

  getPackagesWithFilterdss(subDesId: number, filters: string[]) {
    return this.api.post(`/p/filter/${subDesId}`, {
      filters: filters
    });
  }

  getMonthandDate(id: any) {
    return this.api.get(`/months/${id}`);
  }
  getdate(id: any) {
    return this.api.get(`/dateOfTour/${id}`);
  }
  getIteries(id: any) {
    return this.api.get(`/itineraries/${id}`);
  }

  getTransport(id: any) {
    return this.api.get(`/transports/${id}`)
  }


  // get four cards

  getFourCard() {
    return this.api.get(`/four-cards`)
  }

  makeYourtrip(data: any) {
    return this.api.post(`/trips`, data)
  }

  InternationalPackages(id: number) {
    return this.api.post(`/packages/limit/${id}`);
  }

  getGallaryForImage(packageId: number) {
    return this.api.get(`/gellery/${packageId}`);
  }

  makeMyFormMail(data: FormData) {
    return this.api.post("/send-mail", data);
  }

  setorder(data: FormData) {
    return this.api.post('/order', data);

  }

  orderEmail(data: FormData) {

    return this.api.post('/order-send-mail', data);
  }
  getHotelRoomsWithExact(params: any) {
    return this.api.get('/hotel-available-rooms-exact', { params });
  }
  getHotelRoomsWithCombo(params: any) {
    return this.api.get('/hotel-available-rooms-price', { params })
  }

  checavailability(data: any) {
    return this.api.post('/bookings/check-availability', data)
  }

  getinfo(hotelId: any, roomId: any) {

    return this.api.get(`/hotels/${hotelId}/rooms/${roomId}`);
    //  abhi  nahi lagaya yaad se laga lena
  }

  booking(data: FormData) {
    return this.api.post('/bookings', data);
  }


  getBookingWithuser(id: any) {
    return this.api.get(`bookings/user/${id}`);
  }

  getuserdata(id: any) {
    return this.api.get(`users/${id}`);
    
  }
  
  forgotpassSendOtp(data:FormData){
    return this.api.post(`forget-pass`,data);

  }
 forgotpassOtpVerify(data:FormData){
    return this.api.post(`verify-pass`,data);
    
  }
  
  forgotUpdatePassword(data:FormData){
    
    return this.api.post(`pass-update`,data);
  }

}
