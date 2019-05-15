import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { House } from 'src/app/models/House';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-specific-house',
  templateUrl: './specific-house.component.html',
  styleUrls: ['./specific-house.component.css']
})
export class SpecificHouseComponent implements OnInit {
  houseLinks: string[] = [];
  houses:House[] = [];

  constructor(
    private houseService:HouseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHouse();
  }

  getHouse():void {
    const id = +this.route.snapshot.paramMap.get('id');
    var myhouse = 'https://www.anapioficeandfire.com/api/houses/' + id;
    this.houseService.getSpecificHouse(myhouse)
      .subscribe(char => this.houses.push(char))

  }

  goBack(): void {
    this.location.back();
  }

}
