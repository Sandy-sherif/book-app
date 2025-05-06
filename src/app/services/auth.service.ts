import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../Models/auth-response-data.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCINNEfaRKVUz4Vz-HbaExMQ7HkmigHxvQ',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(this.handleError));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCINNEfaRKVUz4Vz-HbaExMQ7HkmigHxvQ',
      { email: email, password: password, returnSecureToken: true }
    ).pipe(catchError(this.handleError))
  }

  private handleError(errRes: HttpErrorResponse){
    let errorMessage = 'An unkown error occured';
    if(!errRes.error || !errRes.error.error){
      return throwError(errorMessage);
    }
    switch(errRes.error.error.message) {
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
