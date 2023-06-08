import { Pokemon } from './pokemon';

export interface EvolutionApiResponse {
  id: number;
  evolves_to: { species: Pokemon[] };
}
