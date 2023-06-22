export class Pokemon {
  id?: number;
  name?: string;
  height?: number;
  weight?: number;
  baseXp?: number;
  hp?: number;
  attack?: number;
  specialAttack?: number;
  defense?: number;
  specialDefense?: number;
  speed?: number;
  evasion?: number;
  accuracy?: number;
  generationId?: number;
  evolutions?: [];
  sprite?: { normal: string; shiny: string };
  url?: string;
  trainersPokemons?: [];
  abilities?: [];
  moves?: [];
  types?: [];

  constructor(name: string) {
    this.name = name;
  }
}
