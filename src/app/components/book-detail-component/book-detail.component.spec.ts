import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { of } from 'rxjs';
import { book } from '../../Models/book.interface';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  const mockBooks: book[] = [
    {
      id: '1',
      title: 'Test Book',
      author: 'Author A',
      publicationYear: '2020',
      genre: ['Fiction'],
      description: 'A test book',
      coverImage: 'cover.jpg'
    }
  ];

  beforeEach(async () => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', [], { books: mockBooks });

    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    mockBookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load book details based on route param', () => {
    component.ngOnInit();

    expect(component.book).toEqual(mockBooks[0]);
    expect(component.id).toBe('1');
  });

  it('should not set book if id does not match', () => {
    // Override paramMap to return a non-matching ID
    const route = TestBed.inject(ActivatedRoute);
    (route as any).paramMap = of({
      get: (key: string) => '999'
    });

    component.ngOnInit();

    expect(component.book).toBeUndefined();
  });
});
