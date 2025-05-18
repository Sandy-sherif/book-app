import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthResponseData } from '../../Models/auth-response-data.interface';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const mockResponse: AuthResponseData = {
    idToken: 'testToken',
    email: 'test@example.com',
    refreshToken: 'testRefreshToken',
    expiresIn: '3600',
    localId: 'testLocalId',
    registered: true,
  };

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent, LoadingSpinnerComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle login mode', () => {
    expect(component.isLoginMode).toBeTrue();
    component.onSwitchMode();
    expect(component.isLoginMode).toBeFalse();
  });

  it('should call login and navigate on success', () => {
    const mockForm = {
      valid: true,
      value: { email: 'test@example.com', password: '123456' },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.onSubmit(mockForm);

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'test@example.com',
      '123456'
    );
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Welcome back!😊 You have successfully logged in.'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/BookList']);
    expect(component.isLoading).toBeFalse();
  });

  it('should call signUp and navigate on success', () => {
    component.isLoginMode = false;

    const mockForm = {
      valid: true,
      value: { email: 'new@example.com', password: 'abcdef' },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    authServiceSpy.signUp.and.returnValue(of(mockResponse));

    component.onSubmit(mockForm);

    expect(authServiceSpy.signUp).toHaveBeenCalledWith(
      'new@example.com',
      'abcdef'
    );
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'You did it!😊 Your account is ready. Let’s get started!'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/BookList']);
    expect(component.isLoading).toBeFalse();
  });

  it('should show error toast on login failure', () => {
    const mockForm = {
      valid: true,
      value: { email: 'fail@example.com', password: 'wrong' },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    authServiceSpy.login.and.returnValue(throwError(() => 'Login failed'));

    component.onSubmit(mockForm);

    expect(toastrSpy.error).toHaveBeenCalledWith('Login failed');
    expect(component.isLoading).toBeFalse();
  });

  it('should not submit if form is invalid', () => {
    const mockForm = {
      valid: false,
      value: {},
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    component.onSubmit(mockForm);

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(authServiceSpy.signUp).not.toHaveBeenCalled();
  });
});
