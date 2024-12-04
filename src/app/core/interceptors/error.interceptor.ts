import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, catchError, throwError } from 'rxjs'

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.getErrorMessage(error)
        this.openSnackbar(errorMessage, 'Cerrar')
        return throwError(() => error)
      })
    )
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Error de conexión con el servidor. Verifica tu red.'
    } else if (error.status === 404) {
      return 'Recurso no encontrado.'
    } else if (error.status === 500) {
      return 'Error interno del servidor.'
    } else {
      return `Error inesperado: ${error.status} - ${error.message}`
    }
  }

  private openSnackbar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    })
  }
}
