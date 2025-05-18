import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
} from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';

describe('AuthInterceptorService', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let user$: BehaviorSubject<User | null>;

  beforeEach(() => {
    user$ = new BehaviorSubject<User | null>(null);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
        {
          provide: AuthService,
          useValue: { user: user$ },
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add auth param and content-type header when user is authenticated', () => {
    const mockUser = new User(
      'test@example.com',
      'abc123',
      'mock-token',
      new Date(Date.now() + 10000)
    );
    user$.next(mockUser);

    httpClient.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return request.url.includes('/test-endpoint');
    });

    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.params.get('auth')).toBe('mock-token');
    req.flush({});
  });

  it('should not modify request when user is not authenticated', () => {
    user$.next(null);

    httpClient.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');

    expect(req.request.headers.has('Content-Type')).toBeFalse();
    expect(req.request.params.has('auth')).toBeFalse();
    req.flush({});
  });
});
