import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let bookServiceStub: Partial<BookService>;
  let userSubject: BehaviorSubject<User | null>;

  beforeEach(async () => {
    userSubject = new BehaviorSubject<User | null>(null);

    const authSpy = jasmine.createSpyObj('AuthService', ['logOut'], {
      user: userSubject.asObservable()
    });

    bookServiceStub = {}; // You can mock methods if needed

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: BookService, useValue: bookServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true when user is present', () => {
    const user = new User('test@example.com', 'abc123', 'token', new Date(Date.now() + 10000));
    userSubject.next(user);

    component.ngOnInit();

    expect(component.isAuthenticated).toBeTrue();
  });

  it('should set isAuthenticated to false when user is null', () => {
    userSubject.next(null);

    component.ngOnInit();

    expect(component.isAuthenticated).toBeFalse();
  });

  it('should call logOut and set isAuthenticated to false', () => {
    component.isAuthenticated = true;

    component.onLogOut();

    expect(component.isAuthenticated).toBeFalse();
    expect(authServiceSpy.logOut).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component['userSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
