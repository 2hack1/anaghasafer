import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserServicesService {

  private baseUrl = environment.base_url; // ✅ Access environment value

    constructor(private http:HttpClient) {
        console.log('API Base URL:', this.baseUrl); // Example usage
     }

  userRegister(data:any) {
  let path = `${this.baseUrl}/register-user`;
    return this.http.post(path,data);
  }
  userLogin(data:any){
    let path = `${this.baseUrl}/login`;
    return this.http.post(path,data);
  }

 private loggedIn = new BehaviorSubject<boolean>(!!sessionStorage.getItem('token'));

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  login(token: string,email:string,name:string,id:any) {
    
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('name',name);
    sessionStorage.setItem('userid',id);

    this.loggedIn.next(true);                                
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.loggedIn.next(false);
  }

}




