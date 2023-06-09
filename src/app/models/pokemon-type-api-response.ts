import { Pokemon } from './pokemon';

export interface PokemonTypeApiResponse {
  pokemon: { pokemon: Pokemon }[];
}
