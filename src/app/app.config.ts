import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ToastrService } from 'ngx-toastr';
import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes),
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ]
};
