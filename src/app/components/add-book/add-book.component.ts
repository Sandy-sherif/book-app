import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  constructor(private bookService: BookService) {}

  onSubmit(form: NgForm) {
    this.bookService.addBook(form.value);
    form.reset();
  }
}
