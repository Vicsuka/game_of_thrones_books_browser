import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Character } from '../../models/Character'
import { CharacterService } from '../../services/character.service'

@Component({
  selector: '[app-specific-character]',
  templateUrl: './specific-characters.component.html',
  styleUrls: ['./specific-characters.component.css']
})
export class SpecificCharactersComponent implements OnInit {
  characterLinks: string[] = [];
  characters:Character[] = [];

  constructor(
    private characterService:CharacterService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter():void {
    const id = +this.route.snapshot.paramMap.get('id');
    var myCharacter = 'https://www.anapioficeandfire.com/api/characters/' + id;
    this.characterService.getSpecificCharacter(myCharacter)
      .subscribe(char => this.characters.push(char))

  }

  goBack(): void {
    this.location.back();
  }
}
