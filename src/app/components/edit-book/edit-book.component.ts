import { Component, OnInit } from '@angular/core';
import { book } from '../../Models/book.interface';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: false,
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  book: book = {} as book;
  id!: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('hello');
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      console.log(id);
      this.bookService.books.find((book) => {
        console.log(book.id === id);
        if (book.id === id) {
          this.book = book;
          this.id = book.id;
        }
      });
    });
  }

  onEdit() {
    this.bookService.editBook(this.book, this.id);
    this.router.navigate(['/BookList']);
  }
}
