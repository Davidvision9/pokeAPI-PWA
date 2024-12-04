import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ApiService } from '../../../service/api.service'
import { PokemonDetails } from '../list/interfaces/pokemon.interface'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  pokemon: PokemonDetails | null = null

  constructor(
    private snackBar: MatSnackBar,
    private pokemonService: ApiService,
    private dialogRef: MatDialogRef<PokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonDetails
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.pokemon = this.data
    }

    if (this.pokemon !== null && this.pokemon.name !== undefined) {
      this.fetchPokemonDetails(this.pokemon?.name)
    } else {
      this.openSnackbar('Error: Pokémon no encontrado o datos inválidos.', 'Cerrar')
      this.dialogRef.close()
    }
  }

  fetchPokemonDetails(id: string): void {
    this.pokemonService.fetchPokemonDetails(id).subscribe({
      next: (response: PokemonDetails) => {
        this.pokemon = response
      },
      error: (err: Error) => {
        console.error('Error al obtener los detalles del Pokémon:', err)
      }
    })
  }

  openSnackbar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
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
}