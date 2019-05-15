import { Component, OnInit } from '@angular/core';
import { House } from '../../models/House'
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  houses:House[];

  constructor(private houseService:HouseService) { 
  }

  ngOnInit() {
      // Subscribe is like then
      this.houseService.getHouses().subscribe(houses => {
        this.houses = houses;
    });
  }

  firstFunc() {
    if (this.houseService.first != undefined)
    this.houseService.houseUrl = this.houseService.first;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  prevFunc() {
    if (this.houseService.prev != undefined)
    this.houseService.houseUrl = this.houseService.prev;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  nextFunc() {
    if (this.houseService.next != undefined)
    this.houseService.houseUrl = this.houseService.next;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  lastFunc() {
    if (this.houseService.last != undefined)
    this.houseService.houseUrl = this.houseService.last;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

}
