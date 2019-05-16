import { Component, OnInit, OnChanges, SimpleChange, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Character } from '../../models/Character'
import { CharacterService } from '../../services/character.service'
import { BookService } from 'src/app/services/book.service';
import { HouseService } from 'src/app/services/house.service';
import { Book } from 'src/app/models/Book';
import { House } from 'src/app/models/House';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-specific-character]',
  templateUrl: './specific-characters.component.html',
  styleUrls: ['./specific-characters.component.css']
})
export class SpecificCharactersComponent implements OnInit {
  //We need to store the Objects connected to the Specific Character
  characters:Character[] = [];
  books:Book[] = [];
  povBooks:Book[] = [];
  houses:House[] = [];
  father:Character;
  mother:Character;
  spouse:Character;
  ids:number;

  //Setting the required services
  constructor(
    private bookService:BookService,
    private characterService:CharacterService,
    private houseService:HouseService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    //IMPORTANT we this to make the page refresh when switching from one character to another
    this.route.params.subscribe(params => {
      this.ids = params['id'];
      console.log("New id = " + this.ids);
      this.getCharacter();
    });
    
  }

  getCharacter():void {
    //Clearing previous values
    this.characters= [];
    this.books = [];
    this.povBooks = [];
    this.houses = [];
    this.father= undefined;
    this.mother= undefined;
    this.spouse= undefined;
    //Getting the ID from the parameters then setting myCharacter for the resource
    const id = this.route.snapshot.paramMap.get('id');
    var myCharacter = 'https://www.anapioficeandfire.com/api/characters/' + id;
    //Getting our specific Character but also getting it's connected resources
    this.characterService.getSpecificCharacter(myCharacter)
      .subscribe(char => {
        //The Character itself
        this.characters.push(char);
        
        //The books that the Character has appeared in
        char.books.forEach(book => {
          this.bookService.getSpecificBook(book)
            .subscribe(book => this.books.push(book))
        });

        //The POV books that the Character has appeared in
        char.povBooks.forEach(book => {
          this.bookService.getSpecificBook(book)
            .subscribe(book => this.povBooks.push(book))
        });

        //The houses that the Character is loyal to
        char.allegiances.forEach(house => {
          this.houseService.getSpecificHouse(house)
            .subscribe(house => this.houses.push(house))
        });
        
        //The character's father(also a Character)
        if (char.father != '')
        this.characterService.getSpecificCharacter(char.father)
          .subscribe(fat => this.father = fat);
        
        //The character's mother(also a Character)
        if (char.mother != '')
        this.characterService.getSpecificCharacter(char.mother)
        .subscribe(mot => this.mother = mot);

        //The character's spouse(also a Character)
        if (char.spouse != '')
        this.characterService.getSpecificCharacter(char.spouse)
        .subscribe(spo => this.spouse = spo);
      })

  }

  //Return the id of the character
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
