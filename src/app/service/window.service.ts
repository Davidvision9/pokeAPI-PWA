import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class WindowService {
    isBrowser(): boolean {
        return typeof window !== 'undefined'
    }

    addEventListener(event: string, handler: EventListenerOrEventListenerObject) {
        if (this.isBrowser()) {
            window.addEventListener(event, handler)
        }
    }
}
