import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router)
  
  if (auth.isAuth()) {
    router.navigate(['/dash'])
    return false
  }

  return true
};
