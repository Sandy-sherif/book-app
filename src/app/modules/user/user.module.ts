import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { BookModule } from '../book/book.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';
import { AuthInterceptorService } from '../../interceptors/auth-interceptor.service';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { AuthComponent } from '../../components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [HeaderComponent, AppComponent, AuthComponent, NotFoundComponent],
  imports: [
    RouterModule.forRoot(routes),
    RouterOutlet,
    BookModule,
    SharedModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class UserModule {}
