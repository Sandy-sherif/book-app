import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {
      return !!user;
    }),
    tap((isAuth) => {
      if (!isAuth) {
        router.navigate(['/auth']);
      }
    })
  );
};
