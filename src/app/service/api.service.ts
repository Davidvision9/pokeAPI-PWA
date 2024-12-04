import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, forkJoin } from 'rxjs'
import { environment } from '../../environment/environment'
import { Pokemon, PokemonDetails } from '../modules/poke/list/interfaces/pokemon.interface'
import { PokeAPIResponse } from './interfaces/pokeRespuesta.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  fetchPokemonDetails(id: string): Observable<PokemonDetails> {
    const url = `${environment.pokeApiUrl}/${id}`
    return this.http.get<PokemonDetails>(url)
  }

  fetchPokemons(offset: number = 0, limit: number = 20): Observable<PokeAPIResponse> {
    const url = `${environment.pokeApiUrl}?limit=${limit}&offset=${offset}`
    return this.http.get<PokeAPIResponse>(url)
  }

  fetchPokemonsDetails(pokemons: Pokemon[]): Observable<PokemonDetails[]> {
    const detailsRequests = pokemons.map(pokemon => this.http.get<PokemonDetails>(pokemon.url))
    return forkJoin(detailsRequests)
  }
}
