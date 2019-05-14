import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Book } from '../models/Book'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl:string = 'https://www.anapioficeandfire.com/api/books';

  filter:string = '?page=1&pageSize=20';

  constructor(private http:HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}${this.filter}`);
  }
}
