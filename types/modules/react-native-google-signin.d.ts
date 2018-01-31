type IGoogleScopes = ('openid' | 'email' | 'profile')[]

interface IHasPlayServicesConfig {
  autoResolve: boolean
}

interface IGoogleSigninConfig {
  iosClientId: string
  webClientId: string
  scopes: IGoogleScopes
  offlineAccess: boolean
}

interface IGoogleUserData {
  id: string
  name: string
  email: string
  photo: string
  idToken: string
  serverAuthCode: string
  scopes: IGoogleScopes
  accessToken: string
}

declare module 'react-native-google-signin' {
  export const GoogleSignin = {
    hasPlayServices(config: IHasPlayServicesConfig): Promise<void> {},
    configure(config: IGoogleSigninConfig): Promise<void> {},
    signIn(): Promise<IGoogleUserData> {},
  }
}
