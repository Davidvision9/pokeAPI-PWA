import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false)
  public loading$ = this.loadingSubject.asObservable()

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading)
  }
}
