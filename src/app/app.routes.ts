import { Routes } from '@angular/router';

import { BookListComponent } from './components/book-list-component/book-list.component';
import { BookDetailComponent } from './components/book-detail-component/book-detail.component';

export const routes: Routes = [


    {path : '', component : BookListComponent},
    {path :'BookList', component : BookListComponent},
    {path :'BookDetails/:id', component : BookDetailComponent}
];
