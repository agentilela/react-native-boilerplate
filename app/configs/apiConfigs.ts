import { GOOGLE_API_KEY, IOS_CLIENT_ID, WEB_CLIENT_ID } from 'react-native-dotenv'

export const googleAPIKey = GOOGLE_API_KEY

const iosClientId = IOS_CLIENT_ID
const webClientId = WEB_CLIENT_ID

export const googleSignInConfig: IGoogleSigninConfig = {
  iosClientId,
  webClientId,
  scopes: ['openid', 'profile'],
  offlineAccess: true
}

