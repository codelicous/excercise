import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokemonData} from './app/types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  getPokemons(offset = 0, limit = 20): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemon(id: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${this.baseUrl}/pokemon/${id}`);
  }
}
