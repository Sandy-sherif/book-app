import { Component, OnInit } from '@angular/core';
import { book } from '../../Models/book.interface';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  standalone: false,
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  id!: string;
  isLoading = false;
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publicationYear: new FormControl(1900, [
      Validators.required,
      Validators.min(1900),
      Validators.max(2025),
    ]),
    genre: new FormControl(['']),
    description: new FormControl('', Validators.required),
    coverImage: new FormControl('', Validators.required),
  });

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      console.log(id);
      this.bookService.books.find((book) => {
        console.log(book.id === id);
        if (book.id === id) {
          this.bookForm.setValue({
            title: book.title,
            id: book.title,
            author: book.author,
            publicationYear: +book.publicationYear,
            genre: book.genre,
            description: book.description,
            coverImage: book.coverImage,
          });
          this.id = book.id;
        }
      });
    });
  }

  onEdit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const bookData: book = {
        title: formValue.title!,
        id: formValue.id!,
        author: formValue.author!,
        publicationYear: String(formValue.publicationYear!),
        genre: formValue.genre!,
        description: formValue.description!,
        coverImage: formValue.coverImage!,
      };
      this.isLoading = true;
      this.bookService.editBook(bookData, this.id).subscribe({
        next: () => {
          this.router.navigate(['/BookList']);
          this.toastr.success('Book details updated successfully 😊');
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
          this.isLoading = false;
        },
      });
    }
  }
}
