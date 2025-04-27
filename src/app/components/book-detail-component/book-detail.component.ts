import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { book } from '../../Models/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  id!:number;
  book?:book;

  constructor(private _activatedroute : ActivatedRoute,private _bookservice : BookService){}

  ngOnInit() {
    this._activatedroute.paramMap.subscribe((paramMap)=>{
       this.id = Number(paramMap.get('id'));
       this.book = this._bookservice.books.find((book)=>book.id==this.id);
    })
  }
  

}
