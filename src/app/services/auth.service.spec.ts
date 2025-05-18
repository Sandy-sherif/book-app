import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { AuthResponseData } from '../Models/auth-response-data.interface';
import { User } from '../Models/user.model';

describe('AuthService', () => {
  let service: AuthService;

  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user', () => {
    const mockResponse: AuthResponseData = {
      idToken: 'token',
      email: 'test@example.com',
      refreshToken: 'refresh',
      expiresIn: '3600',
      localId: 'abc123',
    };

    service.signUp('test@example.com', '123456').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.urlAuth}signUp${environment.key}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log in a user', () => {
    const mockResponse: AuthResponseData = {
      idToken: 'token',
      email: 'test@example.com',
      refreshToken: 'refresh',
      expiresIn: '3600',
      localId: 'abc123',
    };

    service.login('test@example.com', '123456').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.urlAuth}signInWithPassword${environment.key}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should auto login a user from localStorage', () => {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new User(
      'test@example.com',
      'abc123',
      'token',
      expirationDate
    );
    localStorage.setItem('user', JSON.stringify(user));

    service.autoLogin();

    expect(service.user.value?.email).toBe('test@example.com');
  });

  it('should auto logout after expiration', (done) => {
    spyOn(service, 'logOut');
    service.autoLogOut(100);

    setTimeout(() => {
      expect(service.logOut).toHaveBeenCalled();
      done();
    }, 150);
  });

  it('should log out the user', () => {
    localStorage.setItem('user', JSON.stringify({}));
    service.logOut();

    expect(service.user.value).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
    expect(localStorage.getItem('user')).toBeNull();
  });
});
