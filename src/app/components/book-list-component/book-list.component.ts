import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

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
  openDetails(id: String) {
    this.router.navigate(['/BookDetails', id]);
  }
  onDelete(id: string) {
    this.bookService.deleteBook(id);
    this.bookService.fetchBooks();
  }
}
