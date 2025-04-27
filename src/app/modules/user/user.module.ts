import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { BookModule } from '../book/book.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    BookModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class UserModule {}
