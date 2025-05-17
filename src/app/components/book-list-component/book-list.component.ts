import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  constructor(
    public bookService: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.bookService.fetchBooks().subscribe({
      next: (res) => {
        this.bookService.books = res;
      },
      error: (err) => {
        this.toastr.error(err.error.error);
      },
    });
  }
  openDetails(id: String) {
    this.router.navigate(['/BookDetails', id]);
  }
  onDelete(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.bookService.fetchBooks().subscribe({
          next: (res) => {
            this.bookService.books = res;
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          },
        });
        this.toastr.success('Book deleted successfully 😊');
      },
      error: (err) => {
        this.toastr.error(err.error.error);
      },
    });
  }
}
