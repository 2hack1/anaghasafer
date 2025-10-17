
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ToastrService } from 'ngx-toastr';
import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationConfig,
   provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
   } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideRouter(routes),
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ]
};
