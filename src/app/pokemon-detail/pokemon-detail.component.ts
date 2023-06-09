import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, map } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  pokemonName$: Observable<string>;
  pokemon$: Observable<Pokemon>;
  chain$: Observable<any>;
  evolution: string = '';

  constructor(
    public route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemonName$ = route.params.pipe(map((p) => p['name']));
    this.pokemon$ = this.pokemonName$.pipe(
      concatMap((name: string) => this.pokemonService.getPokemonDetails(name))
    );

    this.chain$ = this.pokemon$.pipe(
      concatMap((pokemon) =>
        this.pokemonService
          .getPokemonSpecies(pokemon.species?.url!)
          .pipe(
            concatMap((url) => this.pokemonService.getPokemonEvolution(url.url))
          )
      )
    );

    this.chain$.subscribe(
      (e) => (this.evolution = e[0]['evolves_to'][0]['species']['name'])
    );
  }
}
