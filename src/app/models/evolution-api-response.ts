import { Pokemon } from './pokemon';

export interface EvolutionApiResponse {
  id: number;
  chain: { evolves_to: { evolves_to: { species: { name: string } } }[] };
}
