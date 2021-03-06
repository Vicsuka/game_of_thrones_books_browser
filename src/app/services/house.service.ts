import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { House } from '../models/House'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  houseUrl:string;

   //Pagination urls stored
  public first: string;
  public prev: string;
  public next: string;
  public last: string;

  constructor(private http:HttpClient) {
    //Set base Character url and clear pagination urls
    this.houseUrl = "https://www.anapioficeandfire.com/api/houses?page=1&pageSize=50";
    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";
   }

  //Get a specific house by a provided url
  getSpecificHouse(url:string): Observable<House> {
    return this.http.get<House>(url);
  }

  //Get the houses set by the url (50)
   getHouses(): Observable<House[]> {
    this.first = "";
    this.prev = "";
    this.next = "";
    this.last = "";

    //Getting pagination data from url
    this.printout_response(this.houseUrl);

    //Return the houses
    return this.http.get<House[]>(`${this.houseUrl}`);
  }

  //Make request by url then get Pagination info
  printout_response(url: string) {
    this.http.get<House[]>(url,{ observe: 'response' }).subscribe(resp => {
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
