import { computed, useStrict } from 'mobx'
import { NODE_ENV } from 'react-native-dotenv'
import AuthStore from 'stores/auth'
import IconStore from 'stores/icon'
import NavStore from 'stores/nav'

useStrict(true)

class RootStore {
  @computed
  get session() {
    return this.authStore.authUser
  }

  authStore: AuthStore
  iconStore: IconStore
  navStore: NavStore

  constructor() {
    this.authStore = new AuthStore({ rootStore: this })
    this.iconStore = new IconStore()
    this.navStore = new NavStore({
      rootStore: this
    })
  }

  handleAuthStateChanged = async (authenticated: boolean) => {
    this.navStore.handleAuthStateChanged(authenticated)
  }
}

declare global {
  type IRootStore = RootStore
}

let rootStore: IRootStore

const initRootStore = () => {
  if (NODE_ENV === 'development') {
    if (rootStore) {
      return rootStore
    }

    rootStore = new RootStore()
    return rootStore
  }

  return new RootStore()
}

export default initRootStore
