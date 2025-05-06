import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { book } from '../Models/book.interface';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books!: book[];
  /* [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publication_year: 1960,
      genre: ['Fiction', 'Classic'],
      description:
        'A classic novel depicting racial injustice in the American South.',
      cover_image: '1.jpg',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      publication_year: 1949,
      genre: ['Dystopian', 'Science Fiction'],
      description: 'A dystopian novel portraying a totalitarian society.',
      cover_image: '2.jpg',
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publication_year: 1813,
      genre: ['Classic', 'Romance'],
      description:
        'A classic novel exploring themes of love, marriage, and social norms.',
      cover_image: '3.jpg',
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publication_year: 1925,
      genre: ['Fiction', 'Classic'],
      description:
        'A tale of the American Dream, wealth, and love during the Roaring Twenties.',
      cover_image: '4.jpg',
    },
    {
      id: 5,
      title: 'Moby-Dick',
      author: 'Herman Melville',
      publication_year: 1851,
      genre: ['Fiction', 'Adventure'],
      description:
        "The epic tale of Captain Ahab's obsession with the white whale.",
      cover_image: '5.jpg',
    },
    {
      id: 6,
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      publication_year: 1954,
      genre: ['Fantasy', 'Adventure'],
      description:
        'An epic fantasy saga about the quest to destroy the One Ring.',
      cover_image: '6.jpg',
    },
  ]; */

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
      .patch(
        'https://book-app-48750-default-rtdb.firebaseio.com/books.json' + id,
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
}
