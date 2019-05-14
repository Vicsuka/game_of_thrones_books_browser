import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book'
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books:Book[];

  constructor(private bookService:BookService) { }

  ngOnInit() {
    // Subscribe is like then
    this.bookService.getBooks().subscribe(books => {
        this.books = books;
    });
  }

}
