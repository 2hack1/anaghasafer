import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from "./shared/components/login/login.component";

import { Router, NavigationEnd } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AxiosService } from './core/services/axios/axios.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
   isLoginPage: boolean = false;   // ✅ Add this
    status: 'active' | 'deactive' = 'deactive';
  constructor(private router: Router ,private user:AxiosService) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     window.scroll(0, 0);
    //   }
    // });
    this.router.events.subscribe(event => {
          const role = sessionStorage.setItem('role','user');
  if (event instanceof NavigationEnd) {
    const url = event.urlAfterRedirects;

    const loginLikePages = ['/home', '/login', '/hotelVendorForm'];
    this.isLoginPage = loginLikePages.some(page => url.startsWith(page));

    const role = sessionStorage.getItem('role');

    const isDeskboard = url.startsWith('/home');

    // 🔒 Example role handling
    if ( role === 'user') {
      if (!isDeskboard) {
        this.router.navigate(['/home']);
        return;
      }
    }

    // Handle other roles...
  }
});

this.user.state$.subscribe(state => {
      this.status = state as 'active' | 'deactive';
    });

 
  }

  // Handle scroll-top issue
  onActivate(event: any) {
    document.body.scrollTop = 0;
  }

  ngOnInit(): void {
    

    // Redirect only if user is at the root ("/")
  // if (this.router.url === '/' || this.router.url === '') {
  //   this.router.navigate(['/home']);
  // }
  }
    
    



}