import { Provider } from 'mobx-react'

// Screens
import { Navigation } from 'react-native-navigation'
import getLoginScreens from './loginScreens'

export const registerScreens = (rootStore: {}) => {
  const registerScreen = (screenID: string, generator: () => {}) =>
    Navigation.registerComponent(screenID, generator, rootStore, Provider)

  // Screens
  getLoginScreens(registerScreen)
}
