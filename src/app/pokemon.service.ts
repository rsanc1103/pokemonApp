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
  private url = 'http://localhost:5037';

  constructor(private http: HttpClient) {}

  public getPokemonCount() {
    const params = {
      offset: 0,
      limit: 1000000,
    };
    return this.http
      .get<ListApiResponse>(`${this.url}/Pokemon`, { params: params })
      .pipe(map((res) => res));
  }

  public getPokemonList() {
    return this.http.get<any>(`${this.url}/Pokemon`).pipe(map((res) => res));
  }

  public getPokemonListByGeneration(gen: string) {
    return this.http
      .get<GenerationsApiResponse>(`${this.url}/generation/${gen}`)
      .pipe(map((res) => res.pokemon_species));
  }

  public getPokemonDetails(id: string) {
    return this.http.get<any>(`${this.url}/Pokemon?id=${id}`);
  }

  public getPokemonSpecies(url: string) {
    return this.http
      .get<SpeciesApiResponse>(url)
      .pipe(map((res) => res.evolution_chain));
  }

  public getPokemonEvolution(url: string) {
    return this.http
      .get<EvolutionApiResponse>(url)
      .pipe(map((res) => res.chain.evolves_to));
  }
  public getPokemonTypes(id: string) {
    return this.http
      .get<any>(`${this.url}/Pokemon/type?id=${id}`)
      .pipe(map((res) => res));
  }
  public getTypes() {
    return this.http
      .get<any>(`${this.url}/Pokemon/type`)
      .pipe(map((res) => res));
  }
  public getPokemonTypesList(pokemonType: string) {
    return this.http
      .get<PokemonTypeApiResponse>(`${this.url}/type/${pokemonType}`)
      .pipe(map((res) => res.pokemon));
  }
}
