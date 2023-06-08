import { Pokemon } from "./pokemon";

export interface SpeciesApiResponse {
  id: number;
  evolves_to: { species: Pokemon[] };
}
