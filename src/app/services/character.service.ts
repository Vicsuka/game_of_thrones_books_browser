import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { PersistanceServiceService} from './persistance-service.service'
import { Character } from '../models/Character'
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public charactersUrl:string;

  //Pagination urls stored
  public first: string;
  public prev: string;
  public next: string;
  public last: string;

  constructor(private http:HttpClient,private persister: PersistanceServiceService) {
    //Set base Character url and clear pagination urls
    this.charactersUrl = 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50';
    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";

   }

   //Get a specific character by a provided url
  getSpecificCharacter(url:string): Observable<Character> {
    return this.http.get<Character>(url);
  }

  //Filter search for a specified name
  getFilteredCharacters(name): Observable<Character[]> {
    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";

    //Filtered url
    let filterUrl = 'https://www.anapioficeandfire.com/api/characters?name='+name;

    //Getting pagination data from url
    this.printout_response(filterUrl);
    
    //Return the characters
    return this.http.get<Character[]>(`${filterUrl}`);
  }

  getCharacters(): Observable<Character[]> {

    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";

    //Getting pagination data from url
    this.printout_response(this.charactersUrl);

    //Return the characters
    return this.http.get<Character[]>(`${this.charactersUrl}`);
  }

  //Make request by url then get Pagination info
  printout_response(url: string) {
    this.http.get<Character[]>(url,{ observe: 'response' }).subscribe(resp => {
      const Link  = this.parse_link_header(resp.headers.get('Link'));
        this.first  = Link["first"];
        this.last   = Link["last"];
        this.prev   = Link["prev"];
        this.next   = Link["next"];
    });
  }

  //Parse the links from the response header
  parse_link_header(header) {
    if (header.length == 0) {
      return ;
    }
    
    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      //Regex to filter the required part
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    
    return links;
  }

}
