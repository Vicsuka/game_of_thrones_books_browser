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
  //We need to store the Objects connected to the Specific House
  houses:House[] = [];
  overLord:House;
  heir:Character;
  currentLord:Character;
  founder:Character;
  cadetBranches:House[] = [];
  swornMembers:Character[] = [];
  ids:number;

  //Setting the required services
  constructor(
    private bookService:BookService,
    private characterService:CharacterService,
    private houseService:HouseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    //IMPORTANT we this to make the page refresh when switching from one house to another
    this.route.params.subscribe(params => {
      this.ids = params['id'];
      console.log("New id = " + this.ids);
      this.getHouse();
    });
  }

  getHouse():void {
    //Clearing previous values
    this.houses = [];
    this.overLord = undefined;
    this.heir = undefined;
    this.currentLord = undefined;
    this.founder = undefined;
    this.cadetBranches = [];
    this.swornMembers = [];
    //Getting the ID from the parameters then setting myHouse for the resource
    const id = +this.route.snapshot.paramMap.get('id');
    var myhouse = 'https://www.anapioficeandfire.com/api/houses/' + id;
    this.houseService.getSpecificHouse(myhouse)
      .subscribe(house => {
        //The house itself
        this.houses.push(house);

        //The overlord of the house (also a House)
        if (house.overlord != '')
        this.houseService.getSpecificHouse(house.overlord)
          .subscribe(ovr => this.overLord = ovr);

        //The heir of the house (a Character)
        if (house.heir != '')
        this.characterService.getSpecificCharacter(house.heir)
          .subscribe(hei => this.heir = hei);
        
        //The current lord of the house (a Character)
        if (house.currentLord != '')
        this.characterService.getSpecificCharacter(house.currentLord)
          .subscribe(crt => this.currentLord = crt);
          
        //The founder of the house (a Character)
        if (house.founder != '')
        this.characterService.getSpecificCharacter(house.founder)
          .subscribe(fnd => this.founder = fnd);

        //The cadet branches of the house (array of Houses)
        house.cadetBranches.forEach(house => {
          this.houseService.getSpecificHouse(house)
            .subscribe(cade => this.cadetBranches.push(cade))
        });

        //The sworn members of the house (array of Characters)
        house.swornMembers.forEach(member => {
          this.characterService.getSpecificCharacter(member)
            .subscribe(mmb => this.swornMembers.push(mmb))
        });

      });

  }

  //Return the id of the house
  getInt(url: string) {
    let numbers = url.split('/');
    var result = parseInt(numbers[5]);
    return result;
  }

  //Go back to the previous page component
  goBack(): void {
    this.location.back();
  }

}
