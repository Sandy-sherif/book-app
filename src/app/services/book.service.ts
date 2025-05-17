import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { book } from '../Models/book.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books!: book[];
  filteredTitle = '';

  constructor(private http: HttpClient) {}

  fetchBooks() {
    return this.http
      .get<{ [key: string]: book }>(`${environment.url}.json`)
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
      );
  }
  addBook(bookData: book) {
    return this.http.post(`${environment.url}.json`, bookData);
  }

  editBook(bookData: book, id: string) {
    return this.http.put(`${environment.url}/${id}.json`, bookData);
  }
  deleteBook(id: string) {
    return this.http.delete(`${environment.url}/${id}.json`);
  }
}
