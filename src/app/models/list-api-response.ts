import { Pokemon } from './pokemon';

export interface ListApiResponse {
  count: number;
  next: string;
  previous?: string;
  results: Pokemon[];
  chain: {species: Pokemon[]};
}



