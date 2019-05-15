import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { House } from 'src/app/models/House';
import { HouseService } from 'src/app/services/house.service';
import { CharacterService } from 'src/app/services/character.service';
import { BookService } from 'src/app/services/book.service';
import { Character } from 'src/app/models/Character';

@Component({
  selector: '[app-specific-house]',
  templateUrl: './specific-house.component.html',
  styleUrls: ['./specific-house.component.css']
})
export class SpecificHouseComponent implements OnInit {
  houses:House[] = [];
  overLord:House;
  heir:Character;
  currentLord:Character;
  founder:Character;
  cadetBranches:House[] = [];
  swornMembers:Character[] = [];

  ids:number;

  constructor(
    private bookService:BookService,
    private characterService:CharacterService,
    private houseService:HouseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ids = params['id'];
      console.log("New id = " + this.ids);
      this.getHouse();
    });
  }

  getHouse():void {
    this.houses = [];
    this.overLord = undefined;
    this.heir = undefined;
    this.currentLord = undefined;
    this.founder = undefined;
    this.cadetBranches = [];
    this.swornMembers = [];

    const id = +this.route.snapshot.paramMap.get('id');
    var myhouse = 'https://www.anapioficeandfire.com/api/houses/' + id;
    this.houseService.getSpecificHouse(myhouse)
      .subscribe(house => {
        this.houses.push(house);

        if (house.overlord != '')
        this.houseService.getSpecificHouse(house.overlord)
          .subscribe(ovr => this.overLord = ovr);

        if (house.heir != '')
        this.characterService.getSpecificCharacter(house.heir)
          .subscribe(hei => this.heir = hei);
        
        if (house.currentLord != '')
        this.characterService.getSpecificCharacter(house.currentLord)
          .subscribe(crt => this.currentLord = crt);
          
        if (house.founder != '')
        this.characterService.getSpecificCharacter(house.founder)
          .subscribe(fnd => this.founder = fnd);

        house.cadetBranches.forEach(house => {
          this.houseService.getSpecificHouse(house)
            .subscribe(cade => this.cadetBranches.push(cade))
        });

        house.swornMembers.forEach(member => {
          this.characterService.getSpecificCharacter(member)
            .subscribe(mmb => this.swornMembers.push(mmb))
        });

      });

  }

  getInt(url: string) {
    let numbers = url.split('/');
    var result = parseInt(numbers[5]);
    return result;
  }

  goBack(): void {
    this.location.back();
  }

}
