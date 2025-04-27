import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { BookListComponent } from '../../components/book-list-component/book-list.component';
import { BookDetailComponent } from '../../components/book-detail-component/book-detail.component';
import { BookService } from '../../services/book.service';

@NgModule({
  declarations: [BookListComponent, BookDetailComponent],
  imports: [SharedModule],
  providers: [BookService],
})
export class BookModule {}
