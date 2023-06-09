import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { GenerationsListComponent } from './generations-list/generations-list.component';
import { TypesListComponent } from './types-list/types-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PokemonListComponent,
  },
  {
    path: 'list',
    component: PokemonListComponent,
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent,
  },
  {
    path: 'generation/:gen',
    component: GenerationsListComponent,
  },
  {
    path: 'type/:pokemonType',
    component: TypesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
