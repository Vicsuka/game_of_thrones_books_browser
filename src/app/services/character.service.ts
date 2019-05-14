import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Character } from '../models/Character'
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public charactersUrl:string;


  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  constructor(private http:HttpClient) {
    this.charactersUrl = 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50';
   }

  getCharacters(): Observable<Character[]> {
    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";

    this.printout_response(this.charactersUrl);

    return this.http.get<Character[]>(`${this.charactersUrl}`);
  }

  printout_response(url: string) {
    this.http.get<Character[]>(url,{ observe: 'response' }).subscribe(resp => {
      const Link  = this.parse_link_header(resp.headers.get('Link'));
        this.first  = Link["first"];
        this.last   = Link["last"];
        this.prev   = Link["prev"];
        this.next   = Link["next"];
    });
  }

  parse_link_header(header) {
    if (header.length == 0) {
      return ;
    }
    
    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    
    return links;
  }

}
