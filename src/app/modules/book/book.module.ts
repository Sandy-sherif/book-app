import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { BookDetailComponent } from '../../components/book-detail-component/book-detail.component';
import { AddBookComponent } from '../../components/add-book/add-book.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditBookComponent } from '../../components/edit-book/edit-book.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { BookListComponent } from '../../components/book-list-component/book-list.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    AddBookComponent,
    EditBookComponent,
    FilterPipe,
  ],
  imports: [SharedModule, FormsModule, CommonModule, RouterModule],
  providers: [],
})
export class BookModule {}
