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
  pokemonId$: Observable<string>;
  pokemon$: Observable<Pokemon>;

  types$: Observable<any>;
  // chain$: Observable<any>;
  evolution: string = '';

  constructor(
    public route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemonId$ = route.params.pipe(map((p) => p['id']));

    this.pokemon$ = this.pokemonId$.pipe(
      concatMap((id: string) => this.pokemonService.getPokemonDetails(id))
    );
    this.pokemon$ = this.pokemon$.pipe(map((p: any) => p[0]));

    // testing
    this.pokemonId$
      .pipe(
        concatMap((id: string) => this.pokemonService.getPokemonDetails(id))
      )
      .subscribe((p: any) => new Pokemon(p[0]['name']));

    this.types$ = this.pokemonId$.pipe(
      concatMap((id: string) => this.pokemonService.getPokemonTypes(id))
    );
    // this.chain$ = this.pokemon$.pipe(
    //   concatMap((pokemon) =>
    //     this.pokemonService
    //       .getPokemonSpecies(pokemon.species?.url!)
    //       .pipe(
    //         concatMap((url) => this.pokemonService.getPokemonEvolution(url.url))
    //       )
    //   )
    // );

    // this.chain$.subscribe(
    //   (e) => (this.evolution = e[0]['evolves_to'][0]['species']['name'])
    // );
  }
}
