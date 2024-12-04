import { Pokemon } from "../../modules/poke/list/interfaces/pokemon.interface";


export interface PokeAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }