import { action, observable, useStrict } from 'mobx'
import { Sentry } from 'react-native-sentry'

useStrict(true)

interface IUserSession {
  _id: string
  email: string
}

export default class AuthStore {
  @observable authUser?: IUserSession
  @observable authenticating: boolean = false
  @observable authError?: string
  rootStore: IRootStore

  constructor({ rootStore }: { rootStore: IRootStore }) {
    this.rootStore = rootStore
  }

  // Internal Actions
  @action
  setAuthUser = async (u?: IUserSession) => {
    if (u) {
      Sentry.setUserContext({
        email: u.email
      })
    }

    try {
      // Need to copy the session or else it will be mutated
      this.authUser = u ? JSON.parse(JSON.stringify(u)) : undefined
    } catch (error) {
      this.authUser = undefined
    }
    return this.rootStore.handleAuthStateChanged(!!u)
  }

  @action setAuthenticating = (a: boolean) => (this.authenticating = a)

  checkAuth = async () => {
    // Implement Later
    return this.setAuthUser(undefined)
  }

  // Email Auth Actions
  @action
  checkEmail = async ({ email }: { email: string }) => {
    // Implement Later
  }

  @action
  createUser = async ({ email, password }: { email: string; password: string }) => {
    return this.setAuthUser({ _id: 'testUser', email: 'test@test.com' })
  }

  @action
  sendPasswordResetEmail = async ({ email }: { email: string }) => {
    // Implement Later
  }

  @action
  loginEmail = async ({ email, password }: { email: string; password: string }) => {
    return this.setAuthUser({ _id: 'testUser', email: 'test@test.com' })
  }

  @action
  loginGoogle = async () => {
    return this.setAuthUser({ _id: 'testUser', email: 'test@test.com' })
  }

  // Signout
  logout = async () => {
    return this.setAuthUser(undefined)
  }
}

declare global {
  type IAuthStore = AuthStore
}
