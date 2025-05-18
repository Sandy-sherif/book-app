import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookComponent } from './edit-book.component';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { book } from '../../Models/book.interface';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const mockBook: book = {
    id: '1',
    title: 'Test Book',
    author: 'Author A',
    publicationYear: '2020',
    genre: ['Fiction'],
    description: 'A test book',
    coverImage: 'cover.jpg'
  };

  beforeEach(async () => {
    const bookSpy = jasmine.createSpyObj('BookService', ['editBook'], { books: [mockBook] });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [EditBookComponent, LoadingSpinnerComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BookService, useValue: bookSpy },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastMock },
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

    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with book data on init', () => {
    component.ngOnInit();

    expect(component.bookForm.value.title).toBe(mockBook.title);
    expect(component.bookForm.value.author).toBe(mockBook.author);
    expect(component.bookForm.value.publicationYear).toBe(+mockBook.publicationYear);
    expect(component.id).toBe(mockBook.id);
  });

  it('should call editBook and navigate on valid form submission', () => {
    component.ngOnInit();
    bookServiceSpy.editBook.and.returnValue(of({}));

    component.onEdit();

    expect(bookServiceSpy.editBook).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/BookList']);
    expect(toastrSpy.success).toHaveBeenCalledWith('Book details updated successfully 😊');
  });

  it('should show error toast on editBook failure', () => {
    component.ngOnInit();
    const error = { error: { error: 'Update failed' } };
    bookServiceSpy.editBook.and.returnValue(throwError(() => error));

    component.onEdit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Update failed');
  });

  it('should not submit if form is invalid', () => {
    component.bookForm.controls['title'].setValue('');
    component.bookForm.controls['author'].setValue('');
    component.bookForm.controls['id'].setValue('');
    component.bookForm.controls['publicationYear'].setValue(1800); // invalid year
    component.bookForm.controls['description'].setValue('');
    component.bookForm.controls['coverImage'].setValue('');

    component.onEdit();

    expect(bookServiceSpy.editBook).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
