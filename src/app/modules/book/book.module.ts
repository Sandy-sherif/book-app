import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { BookListComponent } from '../../components/book-list-component/book-list.component';
import { BookDetailComponent } from '../../components/book-detail-component/book-detail.component';



@NgModule({
  declarations: [BookListComponent, BookDetailComponent],
  imports: [SharedModule],
})
export class BookModule {}
