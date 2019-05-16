import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/Character'

@Component({
  selector: '[app-character-item]',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {
  //Input is a Character
  @Input() character: Character;

  constructor() {    
  }

  ngOnInit() {
    //We need the correct id of the character
    var strings = this.character.url.split('-');
    let id = strings[4];
    this.character.id = parseInt(id);
  }

  //Setting the CSS for the Book
  setClasses() {
    let classes = {
        character: true,
        'format' : true
    }

    return classes;
  }

}
