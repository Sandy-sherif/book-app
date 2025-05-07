import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardComponent } from '../shared/card/card.component';

describe('BookDetailComponentComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent, CardComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [BookService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
