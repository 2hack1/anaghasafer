import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role'); // e.g., 'admin' or 'hotel_vendor'
  const url = state.url;

  // if (!token) {
  //   return router.createUrlTree(['/login']);
  // }

  // Role-based access control
  if (role === 'user') {
    if (url.startsWith('/home')) {
      return true;
    } else {
      return router.createUrlTree(['/home']);
    }
  }

 
  return router.createUrlTree(['/notfounderror404']);
};
