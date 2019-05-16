import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/Character'
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { CharacterService } from '../../services/character.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  //We store the characters in an array
  characters:Character[];
  //Storing the filter string that will be used in a search
  filter:string;

  //Getting the CharacterService for our Characters
  constructor(private characterService:CharacterService) { }

  //Making the filtered search
  filterSearch(form: NgForm) {
    console.log(form.value);
    //Processing the recieved JSON
    let temp = JSON.stringify(form.value).split('"');
    this.filter = temp[3];
    //Debug
    console.log('Filter name: ' + this.filter);
    //Getting the searched characters and setting up the component
    this.characterService.getFilteredCharacters(this.filter).subscribe(characters => {
      this.characters = characters;
     });
  }

  ngOnInit() {
    //Getting the characters (50)
    this.characterService.getCharacters().subscribe(characters => {
        this.characters = characters;
    });
  }

  //This function returns the ID of the element(Character in this case)
  getInt(url: string) {
    let numbers = url.split('/');
    var result = parseInt(numbers[5]);
    return result;
  }

  //Pagination first page click
  firstFunc() {
    if ( this.characterService.first != undefined)
    this.characterService.charactersUrl = this.characterService.first;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  //Pagination previous page click
  prevFunc() {
    if ( this.characterService.prev != undefined)
    this.characterService.charactersUrl = this.characterService.prev;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  //Pagination next page click
  nextFunc() {
    if ( this.characterService.next != undefined)
    this.characterService.charactersUrl = this.characterService.next;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  //Pagination last page click
  lastFunc() {
    if ( this.characterService.last != undefined)
    this.characterService.charactersUrl = this.characterService.last;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

}
