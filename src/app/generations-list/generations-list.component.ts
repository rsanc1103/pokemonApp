import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, map } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-generations-list',
  templateUrl: './generations-list.component.html',
  styleUrls: ['./generations-list.component.scss'],
})
export class GenerationsListComponent {
  public pokemons$: Observable<Pokemon[]>;
  public generation$: Observable<any>;

  constructor(
    private pokemonService: PokemonService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.pokemons$ = route.queryParams.pipe(
      concatMap((qp) =>
        this.pokemonService.getPokemonListByGeneration(qp['gen'])
      )
      // map((pl) => pl.map((p) => new Pokemon(p.name!, p.url!)))
    );

    this.generation$ = route.params.pipe(map((p) => p['gen']));
    this.pokemons$ = this.generation$.pipe(
      // concatMap((name: string) => this.pokemonService.getPokemonDetails(name)),
      concatMap((qp) => this.pokemonService.getPokemonListByGeneration(qp))
      // map((pl) => pl.map((p) => new Pokemon(p.name!, p.url!)))
    );
  }
}
