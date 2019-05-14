import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from 'src/app/components/books/books.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HousesComponent } from './components/houses/houses.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'houses', component: HousesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
