import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { book } from '../Models/book.interface';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books', () => {
    const mockResponse = {
      '1': {
        id: '1',
        title: 'Book One',
        author: 'Author A',
        publicationYear: '2020',
        genre: ['Fiction'],
        description: 'A great book',
        coverImage: 'img1.jpg',
      },
    };

    service.fetchBooks().subscribe((books) => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe('Book One');
    });

    const req = httpMock.expectOne(`${environment.url}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a book', () => {
    const newBook: book = {
      id: '2',
      title: 'Book Two',
      author: 'Author B',
      publicationYear: '2021',
      genre: ['Non-fiction'],
      description: 'Another great book',
      coverImage: 'img2.jpg',
    };

    service.addBook(newBook).subscribe((res) => {
      expect(res).toEqual(newBook);
    });

    const req = httpMock.expectOne(`${environment.url}.json`);
    expect(req.request.method).toBe('POST');
    req.flush(newBook);
  });

  it('should edit a book', () => {
    const updatedBook: book = {
      id: '1',
      title: 'Updated Book',
      author: 'Author A',
      publicationYear: '2022',
      genre: ['Drama'],
      description: 'Updated description',
      coverImage: 'img3.jpg',
    };

    service.editBook(updatedBook, '1').subscribe((res) => {
      expect(res).toEqual(updatedBook);
    });

    const req = httpMock.expectOne(`${environment.url}/1.json`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedBook);
  });

  it('should delete a book', () => {
    service.deleteBook('1').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.url}/1.json`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
