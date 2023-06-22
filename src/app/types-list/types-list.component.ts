import { Component } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Observable, concatMap, map, pipe } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss'],
})
export class TypesListComponent {
  public pokemons$: Observable<Pokemon[]>;
  public type$: Observable<any>;

  constructor(
    private pokemonService: PokemonService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.type$ = route.params.pipe(map((p) => p['pokemonType']));

    this.pokemons$ = this.type$.pipe(
      concatMap((qp) => this.pokemonService.getPokemonTypesList(qp)),
      map((pl) => pl.map((p) => new Pokemon(p.pokemon.name!)))
    );
  }
}
