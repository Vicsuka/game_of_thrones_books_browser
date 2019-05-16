import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Book } from '../models/Book'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  //Storing the base url of the books
  booksUrl:string = 'https://www.anapioficeandfire.com/api/books';

  //Filter url that will be used for first query
  filter:string = '?page=1&pageSize=20';

  //We need the httpclient
  constructor(private http:HttpClient) { }

  //Get the books by url and filter
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksUrl}${this.filter}`);
  }

  //Get a specific book by provided url
  getSpecificBook(url:string): Observable<Book> {
    return this.http.get<Book>(url);
  }
  
}
