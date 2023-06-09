import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './models/pokemon';
import { ListApiResponse } from './models/list-api-response';
import { GenerationsApiResponse } from './models/generations-api-response';
import { EvolutionApiResponse } from './models/evolution-api-response';
import { SpeciesApiResponse } from './models/species-api-response';
import { TypesApiResponse } from './models/types-api-response';
import { PokemonTypeApiResponse } from './models/pokemon-type-api-response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url = ' https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  public getPokemonCount() {
    const params = {
      offset: 0,
      limit: 1000000,
    };
    return this.http
      .get<ListApiResponse>(`${this.url}/pokemon`, { params: params })
      .pipe(map((res) => res.count));
  }

  public getPokemonList(pageOffset = 0, limit = 10) {
    const params = {
      offset: pageOffset,
      limit: limit,
    };
    return this.http
      .get<ListApiResponse>(`${this.url}/pokemon`, { params: params })
      .pipe(map((res) => res.results));
  }

  public getPokemonListByGeneration(gen: string) {
    return this.http
      .get<GenerationsApiResponse>(`${this.url}/generation/${gen}`)
      .pipe(map((res) => res.pokemon_species));
  }

  public getPokemonDetails(name: string) {
    name = name.toLowerCase();
    return this.http.get<any>(`${this.url}/pokemon/${name}`);
  }

  public getPokemonSpecies(url: string) {
    return this.http
      .get<SpeciesApiResponse>(url)
      .pipe(map((res) => res.evolves_to.species));
  }

  public getPokemonEvolution(url: string) {
    return this.http
      .get<EvolutionApiResponse>(url)
      .pipe(map((res) => res.evolves_to.species));
  }
  public getPokemonTypes() {
    return this.http
      .get<TypesApiResponse>(`${this.url}/type`)
      .pipe(map((res) => res.results));
  }
  public getPokemonTypesList(pokemonType: string) {
    return this.http
      .get<PokemonTypeApiResponse>(`${this.url}/type/${pokemonType}`)
      .pipe(map((res) => res.pokemon));
  }
}
