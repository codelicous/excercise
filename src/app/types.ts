export type Pokemon  ={
  name: string;
  url: string;
}
export type PokemonTableRow = Pokemon & { id: string };

export type PokemonData = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
