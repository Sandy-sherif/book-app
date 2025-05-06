import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { book } from '../../Models/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  book?: book;
  id!: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.bookService.books.find((book) => {
        console.log(book.id === id);
        if (book.id === id) {
          this.book = book;
          this.id = book.id;
        }
      });
    });
  }
}
