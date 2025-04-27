import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { book } from '../../Models/book.interface'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books:book[]
  
  constructor(private _bookService:BookService,private _router:Router){
    this.books=_bookService.books;
  }
  OpenDetails(id:number){
    this._router.navigate(['BookDetails',id]);

  }

}
