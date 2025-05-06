import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { book } from '../Models/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books!: book[];

  constructor(private http: HttpClient) {}

  fetchBooks() {
    this.http
      .get<{ [key: string]: book }>(
        'https://book-app-48750-default-rtdb.firebaseio.com/books.json'
      )
      .pipe(
        retry(3),
        map((responseData) => {
          const booksArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              booksArray.push({ ...responseData[key], id: key });
            }
          }
          return booksArray;
        })
      )
      .subscribe({
        next: (response) => {
          this.books = response;
          console.log(this.books);
        },
        error: (err) => {
          alert(err);
        },
      });
  }
  addBook(bookData: book) {
    this.http
      .post(
        'https://book-app-48750-default-rtdb.firebaseio.com/books.json',
        bookData
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          alert(err);
        },
      });
  }

  editBook(bookData: book, id: string) {
    return this.http
      .put(
        'https://book-app-48750-default-rtdb.firebaseio.com/books/' +
          id +
          '.json',
        bookData
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          alert(err);
        },
      });
  }
  deleteBook( id: string) {
    return this.http
      .delete(
        'https://book-app-48750-default-rtdb.firebaseio.com/books/' +
          id +
          '.json'
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          alert(err);
        },
      });
  }
}
