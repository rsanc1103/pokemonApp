import { ChangeDetectorRef, Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Observable, concatMap, map } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  public pokemons$: Observable<Pokemon[]>;
  public listSize$: Observable<number>;
  public pageOffset$: Observable<number>;
  public urlParams: any;
  public pokemonsCount: any;
  public pokemonsSeen: number = 0;
  public pokemonsList: string[] = [];
  public filteredPokemons: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    public route: ActivatedRoute,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {
    route.queryParams.subscribe((p) => {
      const o = parseInt(p['offset']) || 0;
      const s = parseInt(p['listSize']) || 10;
      this.pokemonsSeen = o + s;
      this.urlParams = p;
    });

    this.listSize$ = route.queryParams.pipe(map((qp) => qp['listSize'] || 10));
    this.pageOffset$ = route.queryParams.pipe(
      map((qp) => qp['offset'] || this.listSize$)
    );

    this.pokemons$ = route.queryParams.pipe(
      concatMap((qp) =>
        this.pokemonService.getPokemonList(qp['offset'], qp['listSize'])
      ),
      map((pl) => pl.map((p) => new Pokemon(p.name!, p.url!)))
    );

    this.pokemonService.getPokemonList(0, 10000).subscribe((p) =>
      p.map((x) => {
        this.pokemonsList.push(x.name!);
        this.pokemonsCount = p.length;
      })
    );
  }

  setListSize(listSize: number) {
    this.router.navigate([], {
      queryParams: { listSize },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
  prevPage() {
    if (parseInt(this.route.snapshot.queryParams['offset']) > 0) {
      const listSize =
        parseInt(this.route.snapshot.queryParams['listSize']) || 10;
      const paramOffset =
        parseInt(this.route.snapshot.queryParams['offset']) || 0;
      const offset = paramOffset - listSize;
      this.router.navigate([], {
        queryParams: { offset, listSize },
        queryParamsHandling: 'merge',
        relativeTo: this.route,
      });
    }
  }

  nextPage() {
    const listSize =
      parseInt(this.route.snapshot.queryParams['listSize']) || 10;
    const paramOffset =
      parseInt(this.route.snapshot.queryParams['offset']) || 0;

    const offset = listSize + paramOffset;

    this.router.navigate([], {
      queryParams: { offset, listSize },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
  searchPokemon(pokemonName: string) {
    // Navigate to the specified URL
    this.router.navigate(['pokemon', pokemonName.toLowerCase()]);
  }

  suggestPokemon(value: string): void {
    this.filteredPokemons = [];

    for (const item of this.pokemonsList) {
      if (item.startsWith(value)) {
        this.filteredPokemons.push(item);
      }
    }

    if (value.length < 1) {
      this.filteredPokemons = [];
    }

    this.cdr.detectChanges(); // Trigger change detection
  }
}
