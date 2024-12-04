import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private favoritosSubject = new BehaviorSubject<string[]>(this.obtenerFavoritosDelLocalStorage())
  favoritos$ = this.favoritosSubject.asObservable()

  constructor(private snackBar: MatSnackBar) {}

  private obtenerFavoritosDelLocalStorage(): string[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem('favoritos') || '[]')
    } else {
      return []
    }
  }

  actualizarFavoritos(pokemonNombre: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const favoritos = this.obtenerFavoritosDelLocalStorage()
      const index = favoritos.indexOf(pokemonNombre)

      if (index > -1) {
        favoritos.splice(index, 1)
        this.snackBar.open(`${pokemonNombre} eliminado de favoritos`, 'Cerrar', { 
          duration: 2000, 
          horizontalPosition: 'right', 
          verticalPosition: 'top' 
        })
      } else {
        favoritos.push(pokemonNombre)
        this.snackBar.open(`${pokemonNombre} agregado a favoritos`, 'Cerrar', { 
          duration: 2000, 
          horizontalPosition: 'right', 
          verticalPosition: 'top' 
        })
      }

      localStorage.setItem('favoritos', JSON.stringify(favoritos))

      this.favoritosSubject.next(favoritos)
    }
  }
}
