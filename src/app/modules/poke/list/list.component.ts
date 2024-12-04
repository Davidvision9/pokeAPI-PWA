import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { ApiService } from '../../../service/api.service'
import { PokeAPIResponse } from '../../../service/interfaces/pokeRespuesta.interface'
import { PokemonComponent } from '../pokemon/pokemon.component'
import { Pokemon, PokemonDetails } from './interfaces/pokemon.interface'
import { FavoritosService } from '../../../service/favoritos.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  catalogoPokemons: PokemonDetails[] = []
  totalPokemons: number = 0
  tamanioPagina: number = 20
  paginaActual: number = 0

  favoritos: string[] = []

  constructor(
    private pokemonService: ApiService,
    private dialog: MatDialog,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    this.fetchPokemons()
    this.favoritosService.favoritos$.subscribe(favoritos => {
      this.favoritos = favoritos
      this.updateFavoritosInCatalogo()
    })
  }

  fetchPokemons(offset: number = 0, limit: number = 20) {
    this.pokemonService.fetchPokemons(offset, limit).subscribe({
      next: (response: PokeAPIResponse) => {
        this.totalPokemons = response.count
        this.fetchPokemonDetails(response.results)
      },
      error: (err) => {
        console.error('Error al obtener los pokémons:', err)
      }
    })
  }

  fetchPokemonDetails(pokemons: Pokemon[]): void {
    this.pokemonService.fetchPokemonsDetails(pokemons).subscribe({
      next: (details: PokemonDetails[]) => {
        const favoritos = typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('favoritos') || '[]'): []

        this.catalogoPokemons = details.map((details) => {
          const isFavorito = favoritos.includes(details.name)

          const imageUrl = details.sprites?.other['official-artwork'].front_default
          return {
            id: details.id,
            name: details.name,
            imageUrl: imageUrl,
            types: details.types.map(t => ({ type: { name: t.type.name } })),
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map(a => ({ ability: { name: a.ability.name } })),
            sprites: details.sprites,
            species: details.species,
            favorito: isFavorito
          }
        })
      },
      error: (err) => {
        console.error('Error al obtener los detalles de los pokémons:', err)
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.paginaActual = event.pageIndex
    const offset = event.pageIndex * event.pageSize
    this.tamanioPagina = event.pageSize
    this.fetchPokemons(offset, this.tamanioPagina)
  }

  openPokemonDialog(pokemon: PokemonDetails): void {
    this.dialog.open(PokemonComponent, {
      data: pokemon
    })
  }

  tipoColores: { [key: string]: string } = {
    fire: '#f96302',
    water: '#3b83f6',
    grass: '#76d85d',
    electric: '#f9e233',
    psychic: '#f33c9e',
    fighting: '#9e2a2a',
    bug: '#72bf44',
    normal: '#f1f1f1',
    ice: '#56d6d6',
    dragon: '#ac57f0',
    dark: '#4c3f3f',
    fairy: '#f9a1f5',
    ghost: '#6e2e9b',
    poison: '#9b59b6',
    steel: '#7e7e7e',
    rock: '#b68d40',
    ground: '#e19b2e'
  }

  aniadirFavoritos(pokemonNombre: string): void {
    this.favoritosService.actualizarFavoritos(pokemonNombre)

    const pokemon = this.catalogoPokemons.find(p => p.name === pokemonNombre)
    if (pokemon) {
      pokemon.favorito = this.favoritos.includes(pokemonNombre)
    }
  }

  private updateFavoritosInCatalogo(): void {
    this.catalogoPokemons.forEach(pokemon => {
      pokemon.favorito = this.favoritos.includes(pokemon.name)
    })
  }
}
