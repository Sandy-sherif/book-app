import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../Models/auth-response-data.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer : any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCINNEfaRKVUz4Vz-HbaExMQ7HkmigHxvQ',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCINNEfaRKVUz4Vz-HbaExMQ7HkmigHxvQ',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user') || '');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  } 

  autoLogOut(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    },expirationDuration)

  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogOut(+expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleError(errRes: ErrorEvent) {
    let errorMessage = 'An unkown error occured';
    if (!errRes.error.error.errors) {
      return throwError(errorMessage);
    }
    switch (errRes.error.error.errors[0].message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email or password. Please try again.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not corect';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled by an administrator';
        break;
    }
    return throwError(errorMessage);
  }

  
}
