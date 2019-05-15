import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/Character'

@Component({
  selector: '[app-character-item]',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {
  @Input() character: Character;

  constructor() {    
  }

  ngOnInit() {
    var strings = this.character.url.split('-');
    let id = strings[4];
    this.character.id = parseInt(id);
  }

  setClasses() {
    let classes = {
        character: true,
        'format' : true
    }

    return classes;
  }

}
