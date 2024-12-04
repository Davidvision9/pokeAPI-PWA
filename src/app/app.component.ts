import { Component, OnInit, WritableSignal, signal } from '@angular/core'
import { LoaderService } from './service/loader.service'
import { WindowService } from './service/window.service'
import { FavoritosService } from './service/favoritos.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public isOnline: WritableSignal<boolean> = signal(false)
  public cargando: WritableSignal<boolean> = signal(true)

  favoritos: string[] = []
  
  constructor(
    private loaderService: LoaderService,
    private windowService: WindowService,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit() {
    this.windowService.addEventListener('online', this.updateOnlineStatus.bind(this))
    this.windowService.addEventListener('offline', this.updateOnlineStatus.bind(this))
    if (this.windowService.isBrowser()) {
      this.updateOnlineStatus()
    }

    this.favoritosService.favoritos$.subscribe(favoritos => {
      this.favoritos = favoritos
    })

    this.loaderService.loading$.subscribe(isLoading => {
      this.cargando.set(isLoading)
    })
  }

  updateOnlineStatus() {
    this.isOnline.set(window.navigator.onLine)
  }
}
