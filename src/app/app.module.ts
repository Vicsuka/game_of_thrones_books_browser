import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { HousesComponent } from './components/houses/houses.component';
import { HouseItemComponent } from './components/house-item/house-item.component';
import { SpecificCharactersComponent } from './components/specific-characters/specific-characters.component';
import { SpecificHouseComponent } from './components/specific-house/specific-house.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookItemComponent,
    HeaderComponent,
    WelcomeComponent,
    CharactersComponent,
    CharacterItemComponent,
    HousesComponent,
    HouseItemComponent,
    SpecificCharactersComponent,
    SpecificHouseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
