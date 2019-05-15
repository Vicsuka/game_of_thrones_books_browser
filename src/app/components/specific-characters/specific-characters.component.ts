import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { Character } from '../../models/Character'
import { CharacterService } from '../../services/character.service'

@Component({
  selector: '[app-specific-character]',
  templateUrl: './specific-characters.component.html',
  styleUrls: ['./specific-characters.component.css']
})
export class SpecificCharactersComponent implements OnInit {
  @Input() characterLinks: string[];
  characters:Character[];

  constructor(private characterService:CharacterService) { }

  ngOnInit() {
    if (this.characterLinks != undefined)
    this.characterLinks.forEach(link => {
      this.characterService.getSpecificCharacter(link).subscribe(character => {
        this.characters.push(character);
      })
    });
  }

}
