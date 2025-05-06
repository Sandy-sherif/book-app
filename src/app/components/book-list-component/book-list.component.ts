import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { book } from '../../Models/book.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  filteredTitle = '';

  constructor(public bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.bookService.fetchBooks();
  }
  OpenDetails(id: String) {
    console.log('ana id list', id);
    this.router.navigate(['BookDetails', id]);
  }
}
