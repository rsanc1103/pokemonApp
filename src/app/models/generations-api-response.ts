import { Pokemon } from './pokemon';

export interface GenerationsApiResponse {
  id: number;
  pokemon_species: Pokemon[];
}
