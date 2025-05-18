import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookComponent } from './add-book.component';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const bookSpy = jasmine.createSpyObj('BookService', ['addBook']);
    const toastSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [AddBookComponent, LoadingSpinnerComponent],
      imports: [FormsModule],
      providers: [
        { provide: BookService, useValue: bookSpy },
        { provide: ToastrService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addBook and reset form on success', () => {
    const mockForm = {
      value: { title: 'Test Book' },
      reset: jasmine.createSpy('reset')
    } as unknown as NgForm;

    bookServiceSpy.addBook.and.returnValue(of({}));

    component.onSubmit(mockForm);

    expect(bookServiceSpy.addBook).toHaveBeenCalledWith(mockForm.value);
    expect(mockForm.reset).toHaveBeenCalled();
    expect(toastrSpy.success).toHaveBeenCalledWith('Book has been added successfully 😊');
  });

  it('should show error toast on failure', () => {
    const mockForm = {
      value: { title: 'Test Book' },
      reset: jasmine.createSpy('reset')
    } as unknown as NgForm;

    const errorResponse = { error: { error: 'Something went wrong' } };
    bookServiceSpy.addBook.and.returnValue(throwError(() => errorResponse));

    component.onSubmit(mockForm);

    expect(bookServiceSpy.addBook).toHaveBeenCalledWith(mockForm.value);
    expect(toastrSpy.error).toHaveBeenCalledWith('Something went wrong');
  });
});
