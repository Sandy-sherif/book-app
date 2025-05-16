import { Routes } from '@angular/router';

import { BookListComponent } from './components/book-list-component/book-list.component';
import { BookDetailComponent } from './components/book-detail-component/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'BookList',
    component: BookListComponent,
    loadChildren: () =>
      import('./modules/book/book.module').then((m) => m.BookModule),
    canActivate: [authGuard],
  },
  { path: 'addBook', component: AddBookComponent, canActivate: [authGuard] },
  {
    path: 'editBook/:id',
    component: EditBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'BookDetails/:id',
    component: BookDetailComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
