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
  }

  setClasses() {
    let classes = {
        character: true,
        'format' : true
    }

    return classes;
  }

}
