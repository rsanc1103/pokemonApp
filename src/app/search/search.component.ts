import { ChangeDetectorRef, Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, NavigationSkipped, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public filteredPokemons: string[] = [];
  public pokemonTypes$: Observable<any>;
  public pokemonsList: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    public route: ActivatedRoute,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.pokemonService.getPokemonList(0, 10000).subscribe((p) =>
      p.map((x) => {
        this.pokemonsList.push(x.name!);
      })
    );

    this.pokemonTypes$ = this.pokemonService.getPokemonTypes();
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

  typeSelection(selectedValue: string) {
    this.router.navigate([`type/`, selectedValue]);
  }

  genreationSelection(gen: string) {
    this.router.navigate([`generation/`, gen]);
  }
}
