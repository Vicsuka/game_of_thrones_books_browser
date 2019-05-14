import { Component, OnInit, Input } from '@angular/core';
import { House } from 'src/app/models/House'

@Component({
  selector: '[app-house-item]',
  templateUrl: './house-item.component.html',
  styleUrls: ['./house-item.component.css']
})
export class HouseItemComponent implements OnInit {
  @Input() house: House;

  constructor() { 
    
  }

  ngOnInit() {
  }

  setClasses() {
    let classes = {
        house: true,
        'format' : true
    }

    return classes;
  }

}
