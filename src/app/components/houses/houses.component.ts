import { Component, OnInit } from '@angular/core';
import { House } from '../../models/House'
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  //Storing all the houses cointained as House
  houses:House[];

  constructor(private houseService:HouseService) { 
  }

  ngOnInit() {
      //Getting the first 50 house
      this.houseService.getHouses().subscribe(houses => {
        this.houses = houses;
    });
  }

  //Returns the ID of the house from URL
  getInt(url: string) {
    let numbers = url.split('/');
    var result = parseInt(numbers[5]);
    return result;
  }

  //Pagination first click function
  firstFunc() {
    if (this.houseService.first != undefined)
    this.houseService.houseUrl = this.houseService.first;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  //Pagination previous click function
  prevFunc() {
    if (this.houseService.prev != undefined)
    this.houseService.houseUrl = this.houseService.prev;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  //Pagination next click function
  nextFunc() {
    if (this.houseService.next != undefined)
    this.houseService.houseUrl = this.houseService.next;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

  //Pagination last click function
  lastFunc() {
    if (this.houseService.last != undefined)
    this.houseService.houseUrl = this.houseService.last;
    this.houseService.getHouses().subscribe(houses => {
      this.houses = houses;
    });
  }

}
