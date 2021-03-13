import { Injectable } from '@angular/core'
import { Query } from '@datorama/akita'

import { UiState, UiStore } from './ui.store'

@Injectable({ providedIn: 'root' })
export class UiStoreQuery extends Query<UiState> {
  loginModal$ = this.select((state) => state.modals.loginModal)

  constructor(protected store: UiStore) {
    super(store)
  }
}
