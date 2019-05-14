import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/Character'
import { CharacterService } from '../../services/character.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters:Character[];

  constructor(private characterService:CharacterService) { }

  ngOnInit() {
    // Subscribe is like then
    this.characterService.getCharacters().subscribe(characters => {
        this.characters = characters;
    });
  }

  firstFunc() {
    this.characterService.charactersUrl = this.characterService.first;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  prevFunc() {
    this.characterService.charactersUrl = this.characterService.prev;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  nextFunc() {
    this.characterService.charactersUrl = this.characterService.next;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  lastFunc() {
    this.characterService.charactersUrl = this.characterService.last;
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

}
