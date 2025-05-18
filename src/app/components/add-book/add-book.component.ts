import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  isLoading = false;
  constructor(
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.bookService.addBook(form.value).subscribe({
      next: () => {
        form.reset();
        this.toastr.success('Book has been added successfully 😊');
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error.error);
        this.isLoading = false;
      },
    });
  }
}
