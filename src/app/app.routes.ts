import { Routes } from '@angular/router';

import { BookListComponent } from './components/book-list-component/book-list.component';
import { BookDetailComponent } from './components/book-detail-component/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [


    {path: '', pathMatch: "full", redirectTo : 'BookList'},
    {path: 'BookList', component: BookListComponent},
    {path: 'addBook', component: AddBookComponent},
    {path: 'editBook/:id', component: EditBookComponent},
    {path: 'BookDetails/:id', component: BookDetailComponent},
    {path: 'auth', component: AuthComponent},
    {path : '**', component: NotFoundComponent}
];
