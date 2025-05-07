import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, SlicePipe } from '@angular/common';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardComponent } from '../shared/card/card.component';
import { FormsModule } from '@angular/forms';

describe('BookListComponentComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent, FilterPipe, CardComponent],
      imports: [CommonModule,RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [BookService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
