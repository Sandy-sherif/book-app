import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
        take(1),
        exhaustMap( user=>{
            if(!user){
                return next.handle(req);
            }
            const modifiedRequest = req.clone({
                headers: req.headers.append('Content-Type', 'application/json'),
                params: new HttpParams().set('auth', user.token as string)
              });
              return next.handle(modifiedRequest);
        })
    )
    
  }
}
