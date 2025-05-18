import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from '../Models/user.model';

describe('authGuard', () => {
  let authServiceMock: Partial<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let user$: BehaviorSubject<User | null>;

  beforeEach(() => {
    user$ = new BehaviorSubject<User | null>(null);

    authServiceMock = {
      user: user$,
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should allow activation if user is authenticated', async () => {
    const mockUser = new User(
      'test@example.com',
      'abc123',
      'token',
      new Date(Date.now() + 10000)
    );
    user$.next(mockUser);

    const result = await TestBed.runInInjectionContext(async () => {
      const result$ = authGuard({} as any, {} as any) as Observable<boolean>;
      return await firstValueFrom(result$);
    });

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation and redirect if user is not authenticated', async () => {
    user$.next(null);

    const result = await TestBed.runInInjectionContext(async () => {
      const result$ = authGuard({} as any, {} as any) as Observable<boolean>;
      return await firstValueFrom(result$);
    });

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
