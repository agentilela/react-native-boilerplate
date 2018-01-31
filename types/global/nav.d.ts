// Init Screen
import { IBaseProps as InitProps } from 'containers/Init'

// Login Screens
import { IBaseProps as LoginSelectMethod } from 'containers/LoginFlow/LoginSelectMethod'

import { Navigator } from 'react-native-navigation'

declare global {
  type INavigator = Navigator

  interface INavScreens {
    // Init Screen
    // ADD PROJECT NAME
    // '{PROJECT NAME}.Init': InitProps

    // Login Screens
    // ADD PROJECT NAME
    // '{PROJECT NAME}.LoginSelectMethod': LoginSelectMethodProps

  }

  interface INavScreen<T extends keyof INavScreens> {
    screen: T
    passProps: INavScreens[T]
  }
}
