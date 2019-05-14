import { Component, OnInit, Input} from '@angular/core';
import { Book } from 'src/app/models/Book'

@Component({
  selector: '[app-book-item]',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

  setClasses() {
    let classes = {
        book: true,
        'format' : true
    }

    return classes;
  }
}
