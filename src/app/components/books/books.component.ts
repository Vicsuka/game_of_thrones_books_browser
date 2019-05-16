import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book'
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  //Cointains the array of the books
  books:Book[];

  //Setting the bookService for getting the books
  constructor(private bookService:BookService) { }

  ngOnInit() {
    //Getting the books from the BookService(First 50)
    this.bookService.getBooks().subscribe(books => {
        this.books = books;
    });
  }

}
