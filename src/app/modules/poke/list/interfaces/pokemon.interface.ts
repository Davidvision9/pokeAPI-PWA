export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats?: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  moves?: Array<{
    move: { name: string };
  }>;
  sprites: {
    front_default: string;
    front_shiny?: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
  cries?: {
    latest: string;
    legacy: string;
  };
  forms?: Array<{ name: string }>;
  game_indices?: Array<{
    game_index: number;
    version: { name: string };
  }>;
  species: { name: string; url: string };
  imageUrl: string;
  favorito: boolean
}

