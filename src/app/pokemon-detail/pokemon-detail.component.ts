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

  constructor(
    public route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemonName$ = route.params.pipe(map((p) => p['name']));
    this.pokemon$ = this.pokemonName$.pipe(
      concatMap((name: string) => this.pokemonService.getPokemonDetails(name))
    );
  }
}
