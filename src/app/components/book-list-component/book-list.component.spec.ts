import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { book } from '../../Models/book.interface';
import { CardComponent } from '../shared/card/card.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const mockBooks: book[] = [
    {
      id: '1',
      title: 'Test Book',
      author: 'Author A',
      publicationYear: '2020',
      genre: ['Fiction'],
      description: 'A test book',
      coverImage: 'cover.jpg',
    },
  ];

  beforeEach(async () => {
    const bookSpy = jasmine.createSpyObj(
      'BookService',
      ['fetchBooks', 'deleteBook'],
      { books: mockBooks }
    );
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BookListComponent, CardComponent, FilterPipe],
      providers: [
        { provide: BookService, useValue: bookSpy },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on init', () => {
    bookServiceSpy.fetchBooks.and.returnValue(of(mockBooks));

    component.ngOnInit();

    expect(bookServiceSpy.fetchBooks).toHaveBeenCalled();
    expect(bookServiceSpy.books).toEqual(mockBooks);
  });

  it('should show error toast if fetchBooks fails', () => {
    const error = { error: { error: 'Fetch failed' } };
    bookServiceSpy.fetchBooks.and.returnValue(throwError(() => error));

    component.ngOnInit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Fetch failed');
  });

  it('should navigate to book details', () => {
    component.openDetails('1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/BookDetails', '1']);
  });

  it('should delete a book and refresh list on success', () => {
    bookServiceSpy.deleteBook.and.returnValue(of({}));
    bookServiceSpy.fetchBooks.and.returnValue(of(mockBooks));

    component.ngOnInit();
    component.onDelete('1');

    expect(bookServiceSpy.deleteBook).toHaveBeenCalledWith('1');
    expect(bookServiceSpy.fetchBooks).toHaveBeenCalledTimes(2); // once in ngOnInit, once after delete
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Book deleted successfully 😊'
    );
  });

  it('should show error toast if deleteBook fails', () => {
    const error = { error: { error: 'Delete failed' } };
    bookServiceSpy.deleteBook.and.returnValue(throwError(() => error));

    component.onDelete('1');

    expect(toastrSpy.error).toHaveBeenCalledWith('Delete failed');
  });
});
