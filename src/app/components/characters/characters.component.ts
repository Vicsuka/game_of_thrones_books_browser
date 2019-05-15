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
  characters:Character[];
  filter:string;

  constructor(private characterService:CharacterService) { }

  filterSearch(form: NgForm) {
    console.log(form.value);
    let temp = JSON.stringify(form.value).split('"');
    this.filter = temp[3];
    console.log('Filter name: ' + this.filter);
    this.characterService.getFilteredCharacters(this.filter).subscribe(characters => {
      this.characters = characters;
     });
  }

  ngOnInit() {
    // Subscribe is like then
    this.characterService.getCharacters().subscribe(characters => {
        this.characters = characters;
    });
  }

  getInt(url: string) {
    let numbers = url.split('/');
    var result = parseInt(numbers[5]);
    return result;
  }

  firstFunc() {
    if ( this.characterService.first != undefined)
    this.characterService.charactersUrl = this.characterService.first;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  prevFunc() {
    if ( this.characterService.prev != undefined)
    this.characterService.charactersUrl = this.characterService.prev;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  nextFunc() {
    if ( this.characterService.next != undefined)
    this.characterService.charactersUrl = this.characterService.next;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  lastFunc() {
    if ( this.characterService.last != undefined)
    this.characterService.charactersUrl = this.characterService.last;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

}
